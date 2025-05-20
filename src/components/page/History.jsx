/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaHistory,
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

import Nav from "../header/Nav";
import { getHistory } from "../../service/HistoryOder";
import OrderCard from "../history/Oder_cart";
import SupportChat from "../messger/SupportChat";
import PageFooter from "../footer/PageFooter";

export default function History() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
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

    const interval = setInterval(fetchOrders, 500); // Call API every 0.5 seconds

    fetchOrders(); // Initial call

    return () => clearInterval(interval); // Cleanup on unmount
  }, [apiKey]); // Add apiKey as dependency

  const activeOrders = orders.filter((order) =>
    ["pending", "preparing", "delivery"].includes(order.status.toLowerCase())
  );

  const completedOrders = orders.filter(
    (order) =>
      !["pending", "preparing", "delivery"].includes(order.status.toLowerCase())
  );

  const renderStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <MdPendingActions className="text-yellow-500" />;
      case "preparing":
        return <FaBoxOpen className="text-blue-500" />;
      case "delivery":
        return <FaShippingFast className="text-green-500" />;
      default:
        return <FaCheckCircle className="text-gray-500" />;
    }
  };

  return (
    <div className=" flex flex-col bg-gray-50">
      <header>
        <Nav />
        <SupportChat />
      </header>

      <main className="flex-grow pt-24 pb-16 px-4 md:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-amber-50 rounded-full mb-4">
              <FaHistory className="text-3xl text-amber-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Lịch Sử Đơn Hàng
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Theo dõi và quản lý các đơn hàng của bạn một cách dễ dàng
            </p>
          </div>

          {/* Tab navigation */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 px-6 font-medium text-center transition-colors ${
                  activeTab === "active"
                    ? "text-amber-700 border-b-2 border-amber-600 bg-amber-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("active")}
              >
                Đơn Hàng Đang Giao ({activeOrders.length})
              </button>
              <button
                className={`flex-1 py-4 px-6 font-medium text-center transition-colors ${
                  activeTab === "completed"
                    ? "text-amber-700 border-b-2 border-amber-600 bg-amber-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Đơn Hàng Đã Hoàn Thành ({completedOrders.length})
              </button>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-4">
                <FaBoxOpen className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Chưa có đơn hàng nào
              </h3>
              <p className="text-gray-600 mb-6">
                Bạn chưa thực hiện đơn hàng nào trong thời gian gần đây
              </p>
              <a
                href="/menu"
                className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Khám phá thực đơn
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {activeTab === "active" ? (
                activeOrders.length > 0 ? (
                  activeOrders.map((order) => (
                    <div
                      key={order.order_id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center border-l-4 border-amber-500">
                        <div className="p-5 flex-1">
                          <OrderCard
                            order={order}
                            renderStatusIcon={renderStatusIcon}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <p className="text-gray-600">Không có đơn hàng đang đặt</p>
                  </div>
                )
              ) : completedOrders.length > 0 ? (
                completedOrders.map((order) => (
                  <div
                    key={order.order_id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center border-l-4 border-gray-300">
                      <div className="p-5 flex-1">
                        <OrderCard
                          order={order}
                          renderStatusIcon={renderStatusIcon}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <p className="text-gray-600">
                    Không có đơn hàng đã hoàn thành
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
