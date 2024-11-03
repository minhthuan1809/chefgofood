import React, { useState } from "react";
import {
  FiHome,
  FiBox,
  FiList,
  FiBarChart2,
  FiMail,
  FiSettings,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiTag,
  FiBell,
  FiSearch,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { icon: <FiHome />, label: "Trang Chủ", id: "dashboard" },
    { icon: <FiList />, label: "Đơn Hàng", id: "orders" },
    { icon: <FiBox />, label: "Sản Phẩm", id: "products" },
    { icon: <FiBarChart2 />, label: "Thống Kê", id: "stats" },
    { icon: <FiMail />, label: "Tin Nhắn", id: "messages" },
    { icon: <FiUsers />, label: "Người Dùng", id: "users" },
    { icon: <FiTag />, label: "Mã Giảm Giá", id: "coupons" },
    { icon: <FiSettings />, label: "Cài Đặt", id: "settings" },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col fixed">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Admin Dashboard
        </h2>
        <div className="flex items-center space-x-4">
          <img
            src="/api/placeholder/40/40"
            alt="Ảnh đại diện"
            className="w-10 h-10 rounded-full ring-2 ring-blue-500"
          />
          <div>
            <h3 className="font-medium">Bernard V Martin</h3>
            <p className="text-sm text-gray-500">Quản lý bán hàng</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <nav className="p-4 flex-1">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors ${
              activeItem === item.id
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700"
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

const StatCard = ({ icon, label, value, color, trend }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}
        >
          {icon}
        </div>
        {trend && (
          <span
            className={`flex items-center ${
              trend > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend > 0 ? (
              <FiTrendingUp className="mr-1" />
            ) : (
              <FiTrendingDown className="mr-1" />
            )}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <h3 className="text-3xl font-bold mb-2">{value}</h3>
      <p className="text-gray-500">{label}</p>
    </div>
  );
};

const RevenueChart = () => {
  const data = [
    { name: "T1", revenue: 4000 },
    { name: "T2", revenue: 3000 },
    { name: "T3", revenue: 5000 },
    { name: "T4", revenue: 2780 },
    { name: "T5", revenue: 1890 },
    { name: "T6", revenue: 2390 },
    { name: "T7", revenue: 3490 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Biểu Đồ Doanh Thu</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const WeatherChart = () => {
  const data = [
    { day: "Sun", temp: 22, weather: "sunny" },
    { day: "Mon", temp: 21, weather: "partly-cloudy" },
    { day: "Tue", temp: 20, weather: "cloudy" },
    { day: "Wed", temp: 23, weather: "partly-cloudy" },
    { day: "Thu", temp: 22, weather: "sunny" },
    { day: "Fri", temp: 21, weather: "cloudy" },
    { day: "Sat", temp: 20, weather: "partly-cloudy" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Monday</h3>
        <p className="text-gray-500">25 October, 2024</p>
        <div className="mt-2 flex items-baseline">
          <span className="text-4xl font-bold text-gray-800">21°C</span>
          <span className="ml-2 text-gray-500">Mostly Cloudy</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" axisLine={false} tickLine={false} dy={10} />
            <YAxis hide={true} domain={["dataMin - 2", "dataMax + 2"]} />
            <Tooltip
              contentStyle={{
                background: "rgba(255, 255, 255, 0.9)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ color: "#666" }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorTemp)"
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ stroke: "#8884d8", strokeWidth: 2, r: 4, fill: "white" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-7 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-gray-500 text-sm mb-1">{item.day}</div>
            <div className="text-gray-800 font-medium">{item.temp}°</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OrdersChart = () => {
  const data = [
    { name: "T1", orders: 40 },
    { name: "T2", orders: 30 },
    { name: "T3", orders: 20 },
    { name: "T4", orders: 27 },
    { name: "T5", orders: 18 },
    { name: "T6", orders: 23 },
    { name: "T7", orders: 34 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Thống Kê Đơn Hàng</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AppAdmin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                <FiBell className="text-xl" />
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Tạo Báo Cáo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatCard
              icon={<FiDollarSign className="text-white text-2xl" />}
              label="Tổng Doanh Thu"
              value="54.375.000₫"
              color="bg-blue-500"
              trend={12.5}
            />
            <StatCard
              icon={<FiShoppingBag className="text-white text-2xl" />}
              label="Tổng Đơn Hàng"
              value="2.340"
              color="bg-green-500"
              trend={-5.2}
            />
            <StatCard
              icon={<FiUsers className="text-white text-2xl" />}
              label="Tổng User"
              value="12.580"
              color="bg-purple-500"
              trend={8.1}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RevenueChart />
            <OrdersChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeatherChart />
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Top Sản Phẩm</h3>
              <div className="space-y-4">
                {[
                  { name: "Áo thun nam", sales: 245, revenue: "12.250.000₫" },
                  { name: "Quần jean nữ", sales: 189, revenue: "9.450.000₫" },
                  { name: "Giày thể thao", sales: 156, revenue: "7.800.000₫" },
                ].map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.sales} đã bán
                      </p>
                    </div>
                    <span className="text-green-500 font-medium">
                      {product.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppAdmin;
