import React, { useEffect, useState, useCallback } from "react";
import { FaCopy, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { SePay } from "../../service/sePay";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Loading from "../util/Loading";
import { addCartPay } from "../../service/cart_client";

const PaySePay = () => {
    const  dataPay  = useSelector((state) => state.payqr.data);

    // Utility function to generate unique payment content
    const generateRandomContent = useCallback(() => {
        const prefix = "HD";
        const timestamp = new Date().getTime().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}${timestamp}${random}`;
    }, []);
   
    // Initialize payment data with persistent storage
    const [paymentData, setPaymentData] = useState(() => {
        

        const initialData = {
            SO_TAI_KHOAN: "9018092003",
            NGAN_HANG: "MB",
            SO_TIEN: dataPay.total_price,
            NOI_DUNG:  generateRandomContent(),
        };

      
        sessionStorage.setItem('paymentData', JSON.stringify(initialData));
        return initialData;
    });

    // State for tracking payment status and SePayData
    const [paymentStatus, setPaymentStatus] = useState({
        status: 'pending', 
        message: 'Đang chờ thanh toán'
    });
    const [sePaysData, setSePaysData] = useState(null);
    const [remainingTime, setRemainingTime] = useState(
        Cookies.get("timeSePay") || "15:00"
    );
    const [isTimerActive, setIsTimerActive] = useState(true);

    // Copy to clipboard function with toast notification
    const handleCopyToClipboard = useCallback((text, label) => {
        toast.dismiss();
        navigator.clipboard.writeText(text);
        toast.success(`Đã sao chép ${label}`);
    }, []);


  

    // Check payment status against received transactions
    const checkPaymentStatus = useCallback(async () => {
        toast.dismiss();
        if (!sePaysData || !paymentData) return false;
        
        const matchingPayment = sePaysData.find(payment => 
            payment.transferAmount === paymentData.SO_TIEN &&
            payment.transferType.includes(paymentData.NOI_DUNG)
        );

        if (matchingPayment) {
            setPaymentStatus({
                status: 'success',
                message: 'Thanh toán thành công'
            });

            const result = await addCartPay(dataPay);
            if(result.ok){
                toast.success("Thanh toán thành công");
            }else{
                toast.error("đã có lỗi xảy ra, liên hệ ngay với chúng tôi");
            }
            // Dừng timer khi thanh toán thành công
            setIsTimerActive(false);
            return true;
        }
        return false;
    }, [sePaysData, paymentData]);

    // Fetch SeePay data
    const fetchSePaysData = useCallback(async () => {
        try {
            const data = await SePay();
            setSePaysData(data);
            checkPaymentStatus();
        } catch (error) {
            console.error("Error fetching SePay data:", error);
            setPaymentStatus({
                status: 'failed',
                message: 'Lỗi tra cứu giao dịch'
            });
        }
    }, [checkPaymentStatus]);

    // Timer and periodic checks
    useEffect(() => {

        // Nếu timer không còn active thì không chạy
        if (!isTimerActive) return;

        const interval = setInterval(() => {
            setRemainingTime(prevTime => {
                const [minutes, seconds] = prevTime.split(':').map(Number);
                const totalSeconds = minutes * 60 + seconds - 1;

                if (totalSeconds <= 0 || !isTimerActive) {
                    clearInterval(interval);
                    sessionStorage.removeItem('paymentData');
                    setPaymentStatus({
                        status: 'failed',
                        message: 'Hết thời gian thanh toán'
                    });
                    setIsTimerActive(false);
                    return "00:00";
                }

                const newMinutes = Math.floor(totalSeconds / 60);
                const newSeconds = totalSeconds % 60;
                const newTime = `${newMinutes}:${newSeconds < 10 ? '0' : ''}${newSeconds}`;
                
                Cookies.set("timeSePay", newTime);
                console.log(dataPay);
                return newTime;
            });

            fetchSePaysData();
        }, 1000);

        return () => clearInterval(interval);
    }, [fetchSePaysData, isTimerActive]);

    // Render payment status badge
    const renderPaymentStatusBadge = () => {
        const statusColors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'success': 'bg-green-100 text-green-800',
            'failed': 'bg-red-100 text-red-800'
        };

        const statusIcons = {
            'pending': <span className="animate-spin inline-block">⌛</span>,
            'success': <FaCheckCircle className="text-green-500" />,
            'failed': <FaExclamationCircle className="text-red-500" />
        };

        return (
            <div className={`flex items-center justify-center p-2 rounded ${statusColors[paymentStatus.status]}`}>
                {statusIcons[paymentStatus.status]}
                <span className="ml-2 font-semibold">{paymentStatus.message}</span>
            </div>
        );
    };
    if(!dataPay) return <Loading />
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
                {/* Payment Status Banner */}
                <div className="p-4 bg-gray-100 text-center">
                    {renderPaymentStatusBadge()}
                </div>

                {/* Main Content */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
                        Thanh Toán Điện Tử
                    </h1>
                    
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                        {/* QR Code Section */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
                                Cách 1: Quét Mã QR
                            </h2>
                            <div className="flex justify-center">
                                <div className="w-full max-w-xs">
                                    <img 
                                        src={`https://qr.sepay.vn/img?acc=${paymentData.SO_TAI_KHOAN}&bank=${paymentData.NGAN_HANG}&amount=${paymentData.SO_TIEN}&des=${paymentData.NOI_DUNG}`} 
                                        alt="Mã QR Thanh Toán"
                                        className="w-full h-auto rounded-lg shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Manual Transfer Section */}
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
                                Cách 2: Chuyển Khoản Thủ Công
                            </h2>
                            <table className="w-full mb-4">
                                <tbody>
                                    {Object.entries({
                                        "Số Tài Khoản": "SO_TAI_KHOAN",
                                        "Ngân Hàng": "NGAN_HANG",
                                        "Số Tiền": "SO_TIEN",
                                        "Nội Dung": "NOI_DUNG"
                                    }).map(([label, key]) => (
                                        <tr key={key} className="border-b last:border-b-0">
                                            <td className="py-3 font-medium">{label}</td>
                                            <td className="py-3 flex items-center justify-between">
                                                {paymentData[key].toLocaleString('vi-VN')}
                                                <button 
                                                    onClick={() => handleCopyToClipboard(paymentData[key], label.toLowerCase())}
                                                    className="ml-2 text-blue-500 hover:text-blue-700 transition"
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
                                <p className="text-yellow-600 text-sm mb-4">
                                    Lưu ý: Nội dung chuyển khoản phải đúng như nội dung đã nhập, thoát trang , load lại sẽ hủy thanh toán
                                </p>
                                
                                {paymentStatus.status !== 'success' && (
                                    <div className="flex justify-between items-center bg-gray-200 p-3 rounded-lg mb-4">
                                        <span className="font-semibold">Thời Gian Còn Lại:</span>
                                        <span className="text-red-600 font-bold">{remainingTime}</span>
                                    </div>
                                )}
                                
                                <button 
                                    className={`w-full ${paymentStatus.status === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md hover:bg-${paymentStatus.status === 'success' ? 'green-700' : 'red-700'} transition`} 
                                    onClick={() => {
                                        setPaymentStatus({
                                            status: 'failed', 
                                            message: 'Đã hủy thanh toán'
                                        });
                                        setIsTimerActive(false);
                                    }}
                                >
                                    {paymentStatus.status === 'success' ? 'Quay Lại' : 'Hủy Thanh Toán'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaySePay;