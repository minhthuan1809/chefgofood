/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import {
  FaClock,
  FaDollarSign,
  FaRedoAlt,
  FaHistory,
  FaStar,
} from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
//  thêm thư viên file
import Nav from "../header/Nav";

const orders = [
  {
    id: 0,
    title: "Đơn hàng phở Hà Nội",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    status: "Hủy",
    description:
      "Cảm ơn bạn đã sử dụng dịch vụ của FastFoot. Bạn đang gặp sự cố về đơn hàng này hãy liên hệ ngay với chúng tôi để được giúp đỡ",
    time: "11/17/2025 11:33",
    price: "60.000Đ",
    isActive: false,
  },
  {
    id: 1,
    title: "Đơn hàng phở Hà Nội",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    status: "Đang được giao",
    description:
      "Cảm ơn bạn đã sử dụng dịch vụ của FastFoot. Đừng lo lắng đơn hàng sẽ sớm đến với bạn thôi, chúc bạn có 1 bữa ăn thật ngon miệng",
    time: "11/17/2025 11:33",
    price: "60.000Đ",
    isActive: true,
  },
  {
    id: 2,
    title: "Đơn hàng phở Hà Nội",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    status: "Đã hoàn tất",
    description:
      "Cảm ơn quý khách đã sử dụng dịch vụ của FastFoot. Hãy để lại cảm nhận của bạn và đánh giá tốt cho chúng tôi. Đừng vội đánh giá 1 sao, hãy chat cho chúng tôi biết nếu bạn gặp phải vấn đề gì.",
    time: "11/17/2025 11:33",
    price: "60.000Đ",
    isActive: false,
  },
  {
    id: 3,
    title: "Đơn hàng phở Hà Nội",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    status: "Đã hoàn tất",
    description:
      "Cảm ơn quý khách đã sử dụng dịch vụ của FastFoot. Hãy để lại cảm nhận của bạn và đánh giá tốt cho chúng tôi. Đừng vội đánh giá 1 sao, hãy chat cho chúng tôi biết nếu bạn gặp phải vấn đề gì.",
    time: "11/17/2025 11:33",
    price: "60.000Đ",
    isActive: false,
  },
  {
    id: 3,
    title: "Đơn hàng phở Hà Nội",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    status: "Đã hoàn tất",
    description:
      "Cảm ơn quý khách đã sử dụng dịch vụ của FastFoot. Hãy để lại cảm nhận của bạn và đánh giá tốt cho chúng tôi. Đừng vội đánh giá 1 sao, hãy chat cho chúng tôi biết nếu bạn gặp phải vấn đề gì.",
    time: "11/17/2025 11:33",
    price: "60.000Đ",
    isActive: false,
  },
  {
    id: 3,
    title: "Đơn hàng phở Hà Nội",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    status: "Đã hoàn tất",
    description:
      "Cảm ơn quý khách đã sử dụng dịch vụ của FastFoot. Hãy để lại cảm nhận của bạn và đánh giá tốt cho chúng tôi. Đừng vội đánh giá 1 sao, hãy chat cho chúng tôi biết nếu bạn gặp phải vấn đề gì.",
    time: "11/17/2025 11:33",
    price: "60.000Đ",
    isActive: false,
  },
];

const OrderCard = ({ order }) => (
  <div className="bg-white rounded-lg shadow-lg  overflow-hidden my-8 ">
    <div className="md:flex">
      <div className="md:w-1/3">
        <img
          src={order.image}
          alt={order.title}
          className="w-full h-48 object-cover md:h-full"
        />
      </div>
      <div className="p-6 md:w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{order.title}</h3>
          <span
            className={`${order.isActive === true ? "animate-bounce " : ""}bg-${
              order.isActive === true
                ? "yellow"
                : order.status.toLowerCase() === "hủy"
                ? "red"
                : "blue"
            }-500 text-white px-3 py-1 rounded-full text-sm font-medium`}
          >
            {order.status}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{order.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center">
            <FaClock
              className={`w-4 h-4 mr-2 text-${
                order.isActive ? "yellow" : "blue"
              }-500`}
            />
            <span>{order.time}</span>
          </div>
          <div className="flex items-center">
            <FaDollarSign className="w-4 h-4 mr-2 text-green-500" />
            <span className="font-semibold">{order.price}</span>
          </div>
        </div>

        {!order.isActive && (
          <div className="mt-4 flex gap-4">
            <button className="bg-blue-500 mt-12 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out flex items-center">
              <FaRedoAlt className="mr-2" />
              Đặt lại
            </button>
            {order.status.toLowerCase() === "đã hoàn tất" && (
              <button className="bg-yellow-500 mt-12 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out flex items-center">
                <FaStar className="mr-2" />
                Đánh Giá
              </button>
            )}
          </div>
        )}
        {order.isActive && (
          <div className="mt-4">
            <button
              disabled={
                order.status.toLowerCase() === "đang làm đồ" || "đang được giao"
              }
              className={`mt-12 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out flex items-center ${
                order.status.toLowerCase() === "đang làm đồ" || "đang được giao"
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

export default function History() {
  const activeOrders = orders.filter((order) => order.isActive);
  const completedOrders = orders.filter((order) => !order.isActive);

  return (
    <>
      <header>
        <Nav />
      </header>
      <div className="bg-gray-100 min-h-screen  py-[6rem]">
        <div className="container mx-auto xl:w-[85%]  px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center mb-4">
              <FaHistory className=" text-4xl text-indigo-600 mr-4" />
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
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-indigo-700 border-b-2 border-indigo-200 pb-2">
              Đơn Hàng Đã Đặt
            </h2>
            {completedOrders.map((order) => {
              return <OrderCard key={order.id} order={order} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
