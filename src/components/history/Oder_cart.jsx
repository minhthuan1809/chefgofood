/* eslint-disable react/prop-types */
import { useState } from "react";
import { detailOrder } from "../../service/server/oder";
import { FaClock, FaDollarSign, FaRedoAlt, FaStar } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import OrderDetailModal from "./Modal_history";
import Model_Cancel from "./Model_Cancel";
import ReviewModal from "./Review";
import { addCart } from "../../service/cart_client";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "yellow";
    case "cancel":
      return "red";
    case "completed":
      return "green";
    case "delivery":
      return "blue";
    case "preparing":
      return "purple";
    default:
      return "gray";
  }
};

export default function OrderCard({ order }) {
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const thumbnailImage = order.products[0]?.image_url || "";
  const isActive = ["pending", "preparing", "delivery"].includes(
    order.status.toLowerCase()
  );
  const [orderData, setOrderData] = useState(null);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const handleGetOrderDetail = async (order_id) => {
    const result = await detailOrder(order_id);
    setOrderData(result.data);
  };
  const [Id, orderId] = useState("");
  const apiKey = useSelector((state) => state.login.apikey);

  //đặt lại giỏ hàng
  const hanleAddcart = async (oder) => {
    toast.dismiss();
    setIsLoading(true);
    let result = {};
    for (let i = 0; i < oder.length; i++) {
      result = await addCart(oder[i].product_id, apiKey);
    }
    setIsLoading(false);
    if (result.ok) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden my-8">
        <div className="md:flex">
          <div className="w-[25rem] h-[20rem] overflow-hidden">
            <img
              src={thumbnailImage}
              alt="Order thumbnail"
              className="w-full h-full object-cover md:h-full rounded-lg "
            />
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-center mb-4">
              <b
                className="text-xl font-bold text-gray-800 cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                  handleGetOrderDetail(order.order_id);
                }}
              >
                Đơn hàng #{order.order_id}
              </b>
              <span
                className={`${
                  isActive ? "animate-bounce " : ""
                }bg-${getStatusColor(
                  order.status
                )}-500 text-white px-3 py-1 rounded-full text-sm font-medium`}
              >
                {order.status
                  .toLocaleLowerCase()
                  .replace("completed", "Hoàn thành")
                  .replace("pending", "Chờ xác nhận")
                  .replace("preparing", "Đang chuẩn bị")
                  .replace("delivery", "Đang giao")
                  .replace("cancel", "Đã hủy")}
              </span>
            </div>
            <div className="text-gray-600 mb-4">
              {order.status.toLocaleLowerCase() !== "cancel" ? (
                <p>
                  Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của
                  CHEFGOFOOD. Chúng tôi rất vinh dự được phục vụ quý khách và
                  cam kết mang đến những trải nghiệm ẩm thực tuyệt vời nhất.
                </p>
              ) : (
                <p className="text-gray-600">
                  Chúng tôi thành thật xin lỗi vì sự bất tiện này. CHEFGOFOOD
                  rất tiếc phải thông báo đơn hàng của quý khách đã bị hủy.
                  Chúng tôi luôn cố gắng cải thiện dịch vụ và mong rằng quý
                  khách sẽ tiếp tục ủng hộ CHEFGOFOOD trong những lần tiếp theo.
                  Xin chân thành cảm ơn sự thông cảm của quý khách.
                </p>
              )}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div className="flex items-center">
                <FaClock
                  className={`w-4 h-4 mr-2 text-${getStatusColor(
                    order.status
                  )}-500`}
                />
                <span>{order.created_at}</span>
              </div>
              {/* tiền */}
              <div className="flex items-center">
                <FaDollarSign className="w-4 h-4 mr-2 text-green-500" />
                <span className="font-semibold">
                  {parseInt(order.total_price).toLocaleString()}đ
                </span>
              </div>
            </div>

            {!isActive && (
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => hanleAddcart(order.products)}
                  className="bg-[#b17741] mt-12 text-white px-4 py-2 rounded-full hover:bg-[#b17741] transition duration-300 ease-in-out flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <FaRedoAlt className="mr-2" />
                  )}
                  Đặt lại
                </button>
                {order.review && (
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="bg-yellow-500 mt-12 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out flex items-center"
                  >
                    <FaStar className="mr-2" />
                    Đánh Giá
                  </button>
                )}
              </div>
            )}
            {isActive && (
              <div className="mt-4">
                <button
                  disabled={["preparing", "delivery"].includes(
                    order.status.toLowerCase()
                  )}
                  className={`mt-12 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center ${
                    ["preparing", "delivery"].includes(
                      order.status.toLowerCase()
                    )
                      ? "bg-gray-800"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  onClick={() => {
                    setShowModalCancel(true);
                    orderId(order.order_id);
                  }}
                >
                  <ImCancelCircle className="mr-2" />
                  Hủy đơn hàng
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <OrderDetailModal
          order={orderData}
          onClose={() => setShowModal(false)}
        />
      )}
      <Model_Cancel
        isOpen={showModalCancel}
        onClose={() => setShowModalCancel(false)}
        order_id={Id}
      />
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        order={order}
      />
    </>
  );
}
