import React from "react";
import { BiSolidLayout } from "react-icons/bi";
import {
  HiHome,
  HiQueueList,
  HiArchiveBox,
  HiChartBar,
  HiEnvelope,
  HiUsers,
  HiTag,
  HiCog6Tooth,
} from "react-icons/hi2";
import { PiVectorThreeFill } from "react-icons/pi";
import { useNavigate } from "react-router";
export default function AdminSidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = React.useState("dashboard");
  const menuItems = [
    {
      icon: <HiHome size={20} />,
      label: "Trang Chủ",
      id: "dashboard",
      path: "/dashboard",
    },
    {
      icon: <HiQueueList size={20} />,
      label: "Đơn Hàng",
      id: "orders",
      path: "/orders",
    },
    {
      icon: <HiEnvelope size={20} />,
      label: "Tin Nhắn",
      id: "messages",
      path: "/messages",
    },
    {
      icon: <HiChartBar size={20} />,
      label: "Thống Kê",
      id: "stats",
      path: "/stats",
    },
    {
      icon: <HiUsers size={20} />,
      label: "Người Dùng",
      id: "users",
      path: "/users",
    },
    {
      icon: <HiArchiveBox size={20} />,
      label: "Sản Phẩm",
      id: "products",
      path: "/products",
    },
    {
      icon: <HiTag size={20} />,
      label: "Mã Giảm Giá",
      id: "discounts",
      path: "/discounts",
    },
    {
      icon: <BiSolidLayout size={20} />,
      label: "Giao diện",
      id: "Layout",
      path: "/Layout",
    },
    {
      icon: <PiVectorThreeFill size={20} />,
      label: "Phân quyền",
      id: "decentralization",
      path: "/decentralization",
    },
    {
      icon: <HiCog6Tooth size={20} />,
      label: "Cài Đặt",
      id: "settings",
      path: "/settings",
    },
  ];

  const handleMenuItemClick = (id, path) => {
    setActiveItem(id);
    navigate(`/admin${path}`);
  };
  return (
    <div>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer ${
            activeItem === item.id
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }`}
          onClick={() => handleMenuItemClick(item.id, item.path)}
        >
          <span className="text-xl">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
