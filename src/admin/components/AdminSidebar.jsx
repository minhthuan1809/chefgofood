import React, { useState, useEffect } from "react";
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

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const [openMenus, setOpenMenus] = useState({});

  const dataDecentralization = useSelector(
    (state) => state.decentralization.DecentralizationReducer_dashboard
  );
  const dispatch = useDispatch();

  // Auto expand menu based on current path
  useEffect(() => {
    const findParentMenu = () => {
      for (const item of menuItems) {
        if (item.hasSubmenu && item.submenu) {
          for (const subItem of item.submenu) {
            if (subItem.id.toLowerCase() === currentPath) {
              return item.id;
            }
          }
        }
      }
      return null;
    };

    const parentMenu = findParentMenu();
    if (parentMenu) {
      setOpenMenus((prev) => ({
        ...prev,
        [parentMenu]: true,
      }));
    }
  }, [currentPath]);

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

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative h-full flex flex-col bg-white">
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          {!isCollapsed && (
            <>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                A
              </div>
              <h2 className="font-bold text-xl text-gray-800">Admin</h2>
            </>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((item) => {
          if (!item.dataDecentralization) return null;

          return (
            <div key={item.id} className="mb-2">
              <div
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
                  ${
                    currentPath === item.id.toLowerCase()
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() =>
                  handleMenuItemClick(item.id, item.path, item.hasSubmenu)
                }
              >
                <div className="flex items-center space-x-3">
                  <span className={`text-xl ${isCollapsed ? "mx-auto" : ""}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </div>
                {!isCollapsed && item.hasSubmenu && (
                  <span
                    className={`transition-transform duration-200 ${
                      openMenus[item.id] ? "transform rotate-180" : ""
                    }`}
                  >
                    <HiChevronDown size={16} />
                  </span>
                )}
              </div>

              {item.hasSubmenu && openMenus[item.id] && !isCollapsed && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.submenu.map((subItem) => (
                    <div
                      key={subItem.id}
                      className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors cursor-pointer
                        ${
                          currentPath === subItem.id.toLowerCase()
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      onClick={() =>
                        handleMenuItemClick(subItem.id, subItem.path)
                      }
                    >
                      <span className="text-lg">{subItem.icon}</span>
                      <span className="text-sm whitespace-nowrap">
                        {subItem.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          className="flex w-full items-center justify-center space-x-2 px-4 py-3 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-sm"
          onClick={handleLogout}
        >
          <CiLogout size={20} className={isCollapsed ? "mx-auto" : ""} />
          {!isCollapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
