import { FiDollarSign, FiShoppingBag, FiUsers, FiBell } from "react-icons/fi";

import StatCard from "../dashboard/StatCard";
import RevenueChart from "../dashboard/RevenueChart";
import OrdersChart from "../dashboard/OrdersChart";
import TopProducts from "../dashboard/TopProducts";
import { useEffect, useState } from "react";
import { getDashboard } from "../../../service/dashboard";
import DiscountUsed from "../dashboard/DiscountUsed";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    const getDashboardData = async () => {
      const { data } = await getDashboard();
      setDashboardData(data);
    };
    getDashboardData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">
        <div className="w-[80%] mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Tổng quan hệ thống
                </h1>
                <p className="text-gray-500 mt-1">
                  Xem thống kê và phân tích dữ liệu
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <StatCard
              icon={<FiDollarSign className="text-2xl" />}
              label="Tổng Doanh Thu"
              value={`${dashboardData?.total_revenue.toLocaleString("vi-VN")}${
                dashboardData?.currency
              }`}
              color="bg-gradient-to-r from-blue-500 to-blue-600"
              trend={dashboardData?.growth_rate_revenue}
            />
            <StatCard
              icon={<FiShoppingBag className="text-2xl" />}
              label="Tổng Đơn Hàng"
              value={dashboardData?.total_orders}
              color="bg-gradient-to-r from-green-400 to-green-500"
              trend={dashboardData?.growth_rate_orders}
            />
            <StatCard
              icon={<FiUsers className="text-2xl" />}
              label="Người Dùng Mới Trên Ngày"
              value={dashboardData?.new_users}
              color="bg-gradient-to-r from-purple-400 to-purple-500"
              trend={dashboardData?.growth_rate_users}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition duration-200">
              <RevenueChart />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition duration-200">
              <OrdersChart />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition duration-200">
              <DiscountUsed />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition duration-200">
              <TopProducts />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
