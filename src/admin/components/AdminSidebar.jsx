import React from "react";
import { BiSolidLayout } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { LoginAdminAction } from "../../redux/action/admin/loginAdmin";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { DecentralizationAction } from "../../redux/action/admin/decentralization";
export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const [activeItem, setActiveItem] = React.useState(
    currentPath || "dashboard"
  );
  const dataDecentralization = useSelector(
    (state) => state.decentralization.DecentralizationReducer_dashboard
  );
  const dispatch = useDispatch();
  const menuItems = [
    {
      icon: <HiHome size={20} />,
      label: "Trang Chủ",
      id: "dashboard",
      path: "/dashboard",
      dataDecentralization: true,
    },
    {
      icon: <HiQueueList size={20} />,
      label: "Đơn Hàng",
      id: "orders",
      path: "/orders",
      dataDecentralization: dataDecentralization?.order,
    },
    {
      icon: <HiEnvelope size={20} />,
      label: "Tin Nhắn",
      id: "messages",
      path: "/messages",
      dataDecentralization: dataDecentralization?.mess,
    },
    {
      icon: <HiChartBar size={20} />,
      label: "Thống Kê",
      id: "stats",
      path: "/stats",
      dataDecentralization: dataDecentralization?.statistics,
    },
    {
      icon: <HiUsers size={20} />,
      label: "Người Dùng",
      id: "users",
      path: "/users",
      dataDecentralization: dataDecentralization?.user,
    },
    {
      icon: <HiArchiveBox size={20} />,
      label: "Sản Phẩm",
      id: "products",
      path: "/products",
      dataDecentralization: dataDecentralization?.order,
    },
    {
      icon: <HiTag size={20} />,
      label: "Mã Giảm Giá",
      id: "discounts",
      path: "/discounts",
      dataDecentralization: dataDecentralization?.order,
    },
    {
      icon: <BiSolidLayout size={20} />,
      label: "Giao diện",
      id: "Layout",
      path: "/Layout",
      dataDecentralization: dataDecentralization?.layout,
    },
    {
      icon: <PiVectorThreeFill size={20} />,
      label: "Phân quyền",
      id: "decentralization",
      path: "/decentralization",
      dataDecentralization: dataDecentralization?.decentralization,
    },
    {
      icon: <HiCog6Tooth size={20} />,
      label: "Cài Đặt",
      id: "settings",
      path: "/settings",
      dataDecentralization: true,
    },
  ];

  const handleMenuItemClick = (id, path) => {
    setActiveItem(id);
    navigate(`/admin${path}`);
  };
  const handleLogout = () => {
    Cookies.remove("admin_apikey");
    dispatch(LoginAdminAction(null));
    dispatch(DecentralizationAction(null));
    toast.success("Đăng xuất thành công !");
    navigate("/admin/dashboard/login");
  };
  return (
    <div>
      {menuItems.map((item) => {
        if (!item.dataDecentralization) return;
        return (
          <div
            key={item.id}
            className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer ${
              currentPath === item.id.toLowerCase()
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700"
            }`}
            onClick={() => handleMenuItemClick(item.id, item.path)}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        );
      })}
      <button
        className="flex w-full items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
        onClick={handleLogout}
      >
        <CiLogout size={20} /> <span>Đăng xuất</span>
      </button>
    </div>
  );
}
