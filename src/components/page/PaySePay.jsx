import React, { useEffect, useState, useCallback } from "react";
import {
  FaCopy,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowRight,
  FaUndo,
  FaHistory,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { SePay } from "../../service/sePay";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Loading from "../util/Loading";
import { addCartPay } from "../../service/cart_client";
import { Link } from "react-router-dom";

const PaySePay = () => {
  const dataPay = useSelector((state) => state.payqr.data);
  const [processedTransactions] = useState(new Set());

  // Utility function to generate unique payment content
  const generateRandomContent = useCallback(() => {
    const prefix = "HD";
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    return `${prefix}${timestamp}${random}`;
  }, []);

  // Initialize payment data with persistent storage
  const [paymentData, setPaymentData] = useState(() => {
    const initialData = {
      SO_TAI_KHOAN: "0862189003",
      NGAN_HANG: "MB",
      SO_TIEN: dataPay?.total_price || 0,
      NOI_DUNG: generateRandomContent(),
    };

    sessionStorage.setItem("paymentData", JSON.stringify(initialData));
    return initialData;
  });

  // State for tracking payment status and SePayData
  const [paymentStatus, setPaymentStatus] = useState({
    status: "pending",
    message: "Đang chờ thanh toán",
  });
  const [sePaysData, setSePaysData] = useState(null);
  const [remainingTime, setRemainingTime] = useState(
    Cookies.get("timeSePay") || "15:00"
  );
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isOrderCreated, setIsOrderCreated] = useState(false);

  // Copy to clipboard function with toast notification
  const handleCopyToClipboard = useCallback((text, label) => {
    toast.dismiss();
    navigator.clipboard.writeText(text);
    toast.success(`Đã sao chép ${label}`);
  }, []);

  // Check payment status against received transactions
  const checkPaymentStatus = useCallback(async () => {
    toast.dismiss();
    if (!sePaysData || !paymentData || isOrderCreated) return false;

    const matchingPayment = sePaysData.find(
      (payment) =>
        payment.transferAmount === paymentData.SO_TIEN &&
        payment.transferType.includes(paymentData.NOI_DUNG) &&
        !processedTransactions.has(payment.referenceCode)
    );

    if (matchingPayment) {
      try {
        // Đánh dấu giao dịch đang được xử lý
        processedTransactions.add(matchingPayment.referenceCode);

        // Kiểm tra xem đơn hàng đã được tạo chưa
        if (!isOrderCreated) {
          const result = await addCartPay(dataPay);
          if (result.ok) {
            setPaymentStatus({
              status: "success",
              message: "Thanh toán thành công",
            });
            toast.success("Thanh toán thành công");
            setIsOrderCreated(true);
            setIsTimerActive(false);

            // Lưu trạng thái thanh toán vào sessionStorage
            sessionStorage.setItem("paymentCompleted", "true");
            sessionStorage.setItem(
              "processedTransaction",
              matchingPayment.referenceCode
            );

            return true;
          } else {
            // Xóa khỏi danh sách đã xử lý nếu thất bại
            processedTransactions.delete(matchingPayment.referenceCode);
            toast.error("Đã có lỗi xảy ra, liên hệ ngay với chúng tôi");
            return false;
          }
        }
      } catch (error) {
        // Xóa khỏi danh sách đã xử lý nếu có lỗi
        processedTransactions.delete(matchingPayment.referenceCode);
        console.error("Error creating order:", error);
        toast.error("Đã có lỗi xảy ra, liên hệ ngay với chúng tôi");
        return false;
      }
    }
    return false;
  }, [sePaysData, paymentData, isOrderCreated, dataPay, processedTransactions]);

  // Thêm useEffect để kiểm tra trạng thái thanh toán khi component mount
  useEffect(() => {
    const paymentCompleted = sessionStorage.getItem("paymentCompleted");
    const processedTransaction = sessionStorage.getItem("processedTransaction");

    if (paymentCompleted === "true" && processedTransaction) {
      setIsOrderCreated(true);
      setPaymentStatus({
        status: "success",
        message: "Thanh toán thành công",
      });
      setIsTimerActive(false);
      processedTransactions.add(processedTransaction);
    }
  }, []);

  // Sửa lại fetchSePaysData để thêm xử lý lỗi tốt hơn
  const fetchSePaysData = useCallback(async () => {
    if (isOrderCreated) return; // Không fetch nếu đã tạo đơn hàng

    try {
      const data = await SePay();
      setSePaysData(data);
      await checkPaymentStatus();
    } catch (error) {
      console.error("Error fetching SePay data:", error);
      setPaymentStatus({
        status: "failed",
        message: "Lỗi tra cứu giao dịch",
      });
    }
  }, [checkPaymentStatus, isOrderCreated]);

  // Timer and periodic checks
  useEffect(() => {
    // Nếu timer không còn active thì không chạy
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        const [minutes, seconds] = prevTime.split(":").map(Number);
        const totalSeconds = minutes * 60 + seconds - 1;

        if (totalSeconds <= 0 || !isTimerActive) {
          clearInterval(interval);
          sessionStorage.removeItem("paymentData");
          setPaymentStatus({
            status: "failed",
            message: "Hết thời gian thanh toán",
          });
          setIsTimerActive(false);
          return "00:00";
        }

        const newMinutes = Math.floor(totalSeconds / 60);
        const newSeconds = totalSeconds % 60;
        const newTime = `${newMinutes}:${
          newSeconds < 10 ? "0" : ""
        }${newSeconds}`;

        Cookies.set("timeSePay", newTime);
        return newTime;
      });

      fetchSePaysData();
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchSePaysData, isTimerActive]);

  // Render payment status badge
  const renderPaymentStatusBadge = () => {
    const statusColors = {
      pending: "bg-amber-50 border-amber-200 text-amber-700",
      success: "bg-emerald-50 border-emerald-200 text-emerald-700",
      failed: "bg-rose-50 border-rose-200 text-rose-700",
    };

    const statusIcons = {
      pending: (
        <span className="inline-block animate-pulse text-amber-500 text-xl">
          ⌛
        </span>
      ),
      success: <FaCheckCircle className="text-emerald-500 text-xl" />,
      failed: <FaExclamationCircle className="text-rose-500 text-xl" />,
    };

    return (
      <div
        className={`flex items-center justify-center p-3 border rounded-lg ${
          statusColors[paymentStatus.status]
        }`}
      >
        <div className="mr-3">{statusIcons[paymentStatus.status]}</div>
        <span className="text-lg font-medium">{paymentStatus.message}</span>
      </div>
    );
  };

  // Sửa lại cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (paymentStatus.status !== "success") {
        sessionStorage.removeItem("paymentCompleted");
        sessionStorage.removeItem("processedTransaction");
      }
    };
  }, [paymentStatus.status]);

  if (!dataPay) return <Loading />;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_5px_30px_rgba(0,0,0,0.15)]">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#b17741] to-[#d49a6a] p-6 text-white">
          <h1 className="text-3xl font-bold text-center">Thanh Toán Điện Tử</h1>
          <p className="text-center mt-2 opacity-90">
            Vui lòng hoàn tất thanh toán để tiếp tục
          </p>
        </div>

        {/* Payment Status Banner */}
        <div className="p-6 bg-white border-b">
          {renderPaymentStatusBadge()}
        </div>

        {/* Timer Section */}
        {paymentStatus.status !== "success" && isTimerActive && (
          <div className="px-6 py-3 bg-gray-50 flex justify-between items-center">
            <span className="font-medium text-gray-700 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Thời gian còn lại:
            </span>
            <span className="text-lg font-bold text-red-600 bg-red-50 px-3 py-1 rounded-md">
              {remainingTime}
            </span>
          </div>
        )}

        {/* Main Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* QR Code Section */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md">
              <div className="bg-[#b17741] bg-opacity-10 py-4 px-6 border-b border-[#b17741] border-opacity-20">
                <h2 className="text-lg font-semibold text-[#b17741] flex items-center">
                  <span className="flex items-center justify-center w-7 h-7 bg-[#b17741] text-white rounded-full mr-2 text-sm">
                    1
                  </span>
                  Quét Mã QR
                </h2>
              </div>

              <div className="p-6">
                <div className="bg-white p-4 border border-dashed border-gray-300 rounded-lg flex justify-center max-w-xs mx-auto mb-4">
                  <img
                    src={`https://qr.sepay.vn/img?acc=${paymentData.SO_TAI_KHOAN}&bank=${paymentData.NGAN_HANG}&amount=${paymentData.SO_TIEN}&des=${paymentData.NOI_DUNG}`}
                    alt="Mã QR Thanh Toán"
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <p className="text-sm text-center text-gray-600">
                  Sử dụng ứng dụng ngân hàng để quét mã QR
                </p>
              </div>
            </div>

            {/* Manual Transfer Section */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md">
              <div className="bg-[#b17741] bg-opacity-10 py-4 px-6 border-b border-[#b17741] border-opacity-20">
                <h2 className="text-lg font-semibold text-[#b17741] flex items-center">
                  <span className="flex items-center justify-center w-7 h-7 bg-[#b17741] text-white rounded-full mr-2 text-sm">
                    2
                  </span>
                  Chuyển Khoản Thủ Công
                </h2>
              </div>

              <div className="p-6">
                <table className="w-full mb-6">
                  <tbody>
                    {Object.entries({
                      "Số Tài Khoản": { key: "SO_TAI_KHOAN", icon: "💳" },
                      "Ngân Hàng": { key: "NGAN_HANG", icon: "🏦" },
                      "Số Tiền": { key: "SO_TIEN", icon: "💰" },
                      "Nội Dung": { key: "NOI_DUNG", icon: "📝" },
                    }).map(([label, { key, icon }]) => (
                      <tr key={key} className="border-b last:border-b-0">
                        <td className="py-3 flex items-center">
                          <span className="mr-2 text-lg">{icon}</span>
                          <span className="font-medium text-gray-700">
                            {label}
                          </span>
                        </td>
                        <td className="py-3 flex items-center justify-between">
                          <span className="font-mono bg-gray-50 py-1 px-2 rounded text-gray-800 block truncate max-w-[150px]">
                            {key === "SO_TIEN"
                              ? paymentData[key].toLocaleString("vi-VN") +
                                " VNĐ"
                              : paymentData[key]}
                          </span>
                          <button
                            onClick={() =>
                              handleCopyToClipboard(
                                paymentData[key],
                                label.toLowerCase()
                              )
                            }
                            className="ml-2 text-[#b17741] hover:bg-[#b17741] hover:bg-opacity-10 p-2 rounded-full transition-all"
                            aria-label={`Sao chép ${label}`}
                          >
                            <FaCopy />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-center">
                  <div className="bg-amber-50 p-4 rounded-lg mb-6 border border-amber-200">
                    <p className="text-amber-700 flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <span>
                        Vui lòng ghi đúng nội dung chuyển khoản. Thoát trang
                        hoặc làm mới sẽ hủy giao dịch hiện tại.
                      </span>
                    </p>
                  </div>

                  {paymentStatus.status === "success" ? (
                    <div className="space-y-4">
                      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                        <p className="text-emerald-700 flex items-center justify-center">
                          <FaCheckCircle className="mr-2" />
                          Thanh toán đã hoàn tất. Cảm ơn bạn!
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Link
                          to="/"
                          className="bg-white text-[#b17741] border border-[#b17741] px-4 py-3 rounded-lg hover:bg-[#b17741] hover:bg-opacity-5 transition-all flex items-center justify-center font-medium"
                        >
                          <FaArrowRight className="mr-2" /> Quay Lại
                        </Link>

                        <Link
                          to="/history"
                          className="bg-[#b17741] text-white px-4 py-3 rounded-lg hover:bg-[#9a6535] transition-colors flex items-center justify-center font-medium"
                        >
                          <FaHistory className="mr-2" /> Theo Dõi Đơn Hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center font-medium"
                      onClick={() => {
                        setPaymentStatus({
                          status: "failed",
                          message: "Đã hủy thanh toán",
                        });
                        setIsTimerActive(false);
                      }}
                    >
                      <FaUndo className="mr-2" /> Hủy Thanh Toán
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 text-center text-sm text-gray-500 border-t">
          <p>
            Nếu bạn cần hỗ trợ, vui lòng liên hệ{" "}
            <a href="tel:+84123456789" className="text-[#b17741]">
              Hotline: 0123 456 789
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaySePay;
