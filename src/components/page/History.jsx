/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import Nav from "../header/Nav";
import { getHistory } from "../../service/HistoryOder";
import { useSelector } from "react-redux";

import OrderCard from "../history/Oder_cart";
import { FaHistory } from "react-icons/fa";
import SupportChat from "../messger/SupportChat";
import PageFooter from "../footer/PageFooter";
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
  });

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
        <SupportChat />
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

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600 text-xl">
                Bạn chưa có đơn hàng nào gần đây
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-indigo-700 border-b-2 border-indigo-200 pb-2">
                  Đơn Hàng Đang Đặt
                </h2>
                {activeOrders.length > 0 ? (
                  activeOrders.map((order) => (
                    <OrderCard key={order.order_id} order={order} />
                  ))
                ) : (
                  <p className="text-center text-gray-600">
                    Không có đơn hàng đang đặt
                  </p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold mb-6 text-indigo-700 border-b-2 border-indigo-200 pb-2">
                  Đơn Hàng Đã Đặt
                </h2>
                {completedOrders.length > 0 ? (
                  completedOrders.map((order) => (
                    <OrderCard key={order.order_id} order={order} />
                  ))
                ) : (
                  <p className="text-center text-gray-600">
                    Không có đơn hàng đã đặt
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <PageFooter />
    </>
  );
}
