import { FiDollarSign, FiShoppingBag, FiUsers, FiBell } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import StatCard from "../dashboard/StatCard";
import RevenueChart from "../dashboard/RevenueChart";
import WeatherChart from "../dashboard/WeatherChart";
import OrdersChart from "../dashboard/OrdersChart";
import TopProducts from "../dashboard/TopProducts";
import { useEffect, useState } from "react";
import { getDashboard } from "../../../service/dashboard";

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
    <div>
      <main>
        <div className="max-w-7xl mx-auto ">
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
              value={`${dashboardData?.total_revenue.toLocaleString("vi-VN")}${
                dashboardData?.currency
              }`}
              color="bg-blue-500"
              trend={dashboardData?.growth_rate_revenue}
            />
            <StatCard
              icon={<FiShoppingBag />}
              label="Tổng Đơn Hàng"
              value={dashboardData?.total_orders}
              color="bg-green-500"
              trend={dashboardData?.growth_rate_orders}
            />
            <StatCard
              icon={<FiUsers />}
              label="Người Dùng Mới Trên Ngày"
              value={dashboardData?.new_users}
              color="bg-purple-500"
              trend={dashboardData?.growth_rate_users}
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
