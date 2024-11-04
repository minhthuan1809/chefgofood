import { useState } from "react";
import {
  HiHome,
  HiQueueList,
  HiArchiveBox,
  HiChartBar,
  HiEnvelope,
  HiUsers,
  HiTag,
  HiCog6Tooth,
  HiMagnifyingGlass,
} from "react-icons/hi2";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { icon: <HiHome size={20} />, label: "Trang Chủ", id: "dashboard" },
    { icon: <HiQueueList size={20} />, label: "Đơn Hàng", id: "orders" },
    { icon: <HiArchiveBox size={20} />, label: "Sản Phẩm", id: "products" },
    { icon: <HiChartBar size={20} />, label: "Thống Kê", id: "stats" },
    { icon: <HiEnvelope size={20} />, label: "Tin Nhắn", id: "messages" },
    { icon: <HiUsers size={20} />, label: "Người Dùng", id: "users" },
    { icon: <HiTag size={20} />, label: "Mã Giảm Giá", id: "coupons" },
    { icon: <HiCog6Tooth size={20} />, label: "Cài Đặt", id: "settings" },
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
          <HiMagnifyingGlass
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
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
            onClick={(e) => {
              e.preventDefault();
              setActiveItem(item.id);
            }}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
