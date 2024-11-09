import { useState, useEffect } from "react";
import {
  FaClock,
  FaDollarSign,
  FaRedoAlt,
  FaHistory,
  FaStar,
} from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import Nav from "../header/Nav";
import { getHistory } from "../../service/HistoryOder";
import { useSelector } from "react-redux";

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

const OrderCard = ({ order }) => {
  // Get the first product image as the order thumbnail
  const thumbnailImage = order.products[0]?.image_url || "";
  const isActive = ["pending", "preparing", "delivery"].includes(
    order.status.toLowerCase()
  );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden my-8">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={thumbnailImage}
            alt="Order thumbnail"
            className="w-full h-48 object-cover md:h-full"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              Đơn hàng #{order.order_id}
            </h3>
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
            <div className="flex items-center">
              <FaDollarSign className="w-4 h-4 mr-2 text-green-500" />
              <span className="font-semibold">
                {parseInt(order.total_price).toLocaleString()}đ
              </span>
            </div>
          </div>

          {!isActive && (
            <div className="mt-4 flex gap-4">
              <button className="bg-blue-500 mt-12 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out flex items-center">
                <FaRedoAlt className="mr-2" />
                Đặt lại
              </button>
              {order.status.toLowerCase() === "completed" && (
                <button className="bg-yellow-500 mt-12 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out flex items-center">
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
                  ["preparing", "delivery"].includes(order.status.toLowerCase())
                    ? "bg-gray-800"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                <ImCancelCircle className="mr-2" />
                Hủy đơn hàng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function History() {
  const [orders, setOrders] = useState([]);
  const apiKey = useSelector((state) => state.login.apikey);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getHistory(apiKey);
        if (result.success) {
          setOrders(result.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [apiKey]);

  const activeOrders = orders.filter((order) =>
    ["pending", "preparing", "delivery"].includes(order.status.toLowerCase())
  );

  const completedOrders = orders.filter(
    (order) =>
      !["pending", "preparing", "delivery"].includes(order.status.toLowerCase())
  );

  return (
    <>
      <header>
        <Nav />
      </header>
      <div className="bg-gray-100 min-h-screen py-[6rem]">
        <div className="container mx-auto xl:w-[85%] px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center mb-4">
              <FaHistory className="text-4xl text-indigo-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-800 relative">
                Lịch Sử Đơn Hàng
              </h1>
            </div>
            <p className="text-center text-gray-600 text-lg">
              Theo dõi và quản lý các đơn hàng của bạn
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700 border-b-2 border-indigo-200 pb-2">
              Đơn Hàng Đang Đặt
            </h2>
            {activeOrders.map((order) => (
              <OrderCard key={order.order_id} order={order} />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700 border-b-2 border-indigo-200 pb-2">
              Đơn Hàng Đã Đặt
            </h2>
            {completedOrders.map((order) => (
              <OrderCard key={order.order_id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
