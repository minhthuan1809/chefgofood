import React from "react";

import { FiDollarSign, FiShoppingBag, FiUsers, FiBell } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import StatCard from "../dashboard/StatCard";
import RevenueChart from "../dashboard/RevenueChart";
import WeatherChart from "../dashboard/WeatherChart";
import OrdersChart from "../dashboard/OrdersChart";
import TopProducts from "../dashboard/TopProducts";

const Dashboard = () => {
  return (
    <div className="flex">
      <main className="flex-1 p-6 bg-gray-50 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                <FiBell className="text-xl" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Web client <FaEye />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatCard
              icon={<FiDollarSign />}
              label="Tổng Doanh Thu"
              value="54.375.000₫"
              color="bg-blue-500"
              trend={12.5}
            />
            <StatCard
              icon={<FiShoppingBag />}
              label="Tổng Đơn Hàng"
              value="2.340"
              color="bg-green-500"
              trend={8.2}
            />
            <StatCard
              icon={<FiUsers />}
              label="Người Dùng Mới"
              value="732"
              color="bg-purple-500"
              trend={3.9}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <RevenueChart />
            <OrdersChart />
            <WeatherChart />
            <TopProducts />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
