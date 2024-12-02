import React, { useState } from "react";
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
  HiChevronDown,
  HiStar,
} from "react-icons/hi2";
import { PiVectorThreeFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { ImQrcode } from "react-icons/im";
import { useNavigate, useLocation } from "react-router";
import { LoginAdminAction } from "../../redux/action/admin/loginAdmin";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { DecentralizationAction } from "../../redux/action/admin/decentralization";
import { FaHistory, FaHome, FaInfoCircle } from "react-icons/fa";
import { FaList, FaTrademark } from "react-icons/fa6";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const [openMenus, setOpenMenus] = useState({});

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

      hasSubmenu: true,

      dataDecentralization: dataDecentralization?.order,
      submenu: [
        {
          icon: <HiUsers size={20} />,
          label: "Đơn hàng chờ xử lý",
          id: "orders-pending",
          path: "/orders-pending",
        },
        {
          icon: <ImQrcode size={20} />,
          label: "Lịch sử SePay",
          id: "orders-sepay",
          path: "/orders-sepay",
        },

        {
          icon: <FaHistory size={20} />,
          label: "Lịch sử mua hàng",
          id: "orders-history",
          path: "/orders-history",
        },
      ],
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
      dataDecentralization: dataDecentralization?.product,
    },
    {
      icon: <HiTag size={20} />,
      label: "Mã Giảm Giá",
      id: "discounts",
      hasSubmenu: true,
      dataDecentralization: dataDecentralization?.discount,
      submenu: [
        {
          icon: <HiUsers size={20} />,
          label: "Mã Giảm giá user",
          id: "discounts-user",
          path: "/discounts-user",
        },
        {
          icon: <HiTag size={20} />,
          label: "Mã Giảm giá chính",
          id: "discounts-main",
          path: "/discounts-main",
        },
        {
          icon: <FaHistory size={20} />,
          label: "Lịch sử sử dụng",
          id: "history-discounts",
          path: "/history-discounts",
        },
      ],
    },
    {
      icon: <HiStar size={20} />,
      label: "Đánh giá",
      id: "review",
      path: "/review",
      dataDecentralization: dataDecentralization?.review,
    },
    {
      icon: <BiSolidLayout size={20} />,
      label: "Giao diện",
      id: "layout",
      dataDecentralization: dataDecentralization?.layout,
      hasSubmenu: true,
      submenu: [
        {
          icon: <FaTrademark size={20} />,
          label: "Thương hiệu",
          id: "title",
          path: "/title",
          hasSubmenu: true,
        },
        {
          icon: <FaHome size={20} />,
          label: "Trang chủ",
          id: "home",
          path: "/home",
        },
        {
          icon: <FaInfoCircle size={20} />,
          label: "Giới thiệu",
          id: "about",
          path: "/about",
        },
        {
          icon: <FaList size={20} />,
          label: "Chân trang",
          id: "footer",
          path: "/footer",
        },
      ],
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

  const handleMenuItemClick = (id, path, hasSubmenu) => {
    if (hasSubmenu) {
      setOpenMenus((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    } else {
      navigate(`/admin${path}`);
    }
  };

  const handleLogout = () => {
    Cookies.remove("admin_apikey");
    dispatch(LoginAdminAction(null));
    dispatch(DecentralizationAction(null));
    toast.success("Đăng xuất thành công !");
    navigate("/admin/dashboard/login");
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1">
        {menuItems.map((item) => {
          if (!item.dataDecentralization) return null;

          return (
            <div key={item.id} className="menu-item">
              <div
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer ${
                  currentPath === item.id.toLowerCase()
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700"
                }`}
                onClick={() =>
                  handleMenuItemClick(item.id, item.path, item.hasSubmenu)
                }
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-xl transition-transform duration-300 ${
                      openMenus[item.id] ? "transform rotate-12" : ""
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.hasSubmenu && (
                  <span
                    className={`text-gray-500 transition-transform duration-300 ${
                      openMenus[item.id] ? "transform rotate-180" : ""
                    }`}
                  >
                    <HiChevronDown size={16} />
                  </span>
                )}
              </div>
              {item.hasSubmenu && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMenus[item.id]
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="ml-6 mt-1  transform">
                    {item.submenu.map((subItem) => (
                      <div
                        key={subItem.id}
                        className={`flex items-center space-x-3 p-2 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer transform hover:translate-x-2 ${
                          currentPath === subItem.id.toLowerCase()
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          handleMenuItemClick(subItem.id, subItem.path)
                        }
                      >
                        {subItem.icon}
                        <span>{subItem.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button
        className="flex w-full items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-300 cursor-pointer hover:translate-x-2"
        onClick={handleLogout}
      >
        <CiLogout size={20} /> <span>Đăng xuất</span>
      </button>
    </div>
  );
};

export default AdminSidebar;
