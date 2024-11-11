/* eslint-disable react/prop-types */
import { useState } from "react";
import { detailOrder } from "../../service/server/oder";
import { FaClock, FaDollarSign, FaRedoAlt, FaStar } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import OrderDetailModal from "./Modal_history";
import Model_Cancel from "./Model_Cancel";
import ReviewModal from "./Review";

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

  const hanleAddcart = (order_id) => {
    console.log(order_id);
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
              <p>Địa chỉ: {order.address}</p>
              <p>Số điện thoại: {order.phone}</p>
              <p>Phương thức thanh toán: {order.payment_method}</p>
              <p>Trạng thái thanh toán: {order.payment_status}</p>
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
                  onClick={() => hanleAddcart(order.order_id)}
                  className="bg-blue-500 mt-12 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out flex items-center"
                >
                  <FaRedoAlt className="mr-2" />
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
