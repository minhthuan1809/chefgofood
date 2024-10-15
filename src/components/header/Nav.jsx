import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import { MdMenu, MdOutlineCancel } from "react-icons/md";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const dataNav = [
    { title: "Trang Chủ", path: "/" },
    { title: "Đồ ăn", path: "/food" },
    { title: "Contact", path: "/contact" },
    { title: "Giới thiệu", path: "/about" },
  ];

  const { logout, isAuthenticated, loginWithPopup, isLoading, user } =
    useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await loginWithPopup({
        authorizationParams: { prompt: "login" },
      });
    } catch (error) {
      console.error("Login failed:", error.message, error);
    }
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex w-4/5 m-auto items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyz25NiuDVqJXnmSDyzoUHFtZLhm6r1zUAxS7Ot4LpooSJx0L-Eb66mcCHjA9RNNTqUTg&usqp=CAU"
                  alt="logo"
                />
              </div>
              <span className="text-2xl font-bold text-gray-800">FastFood</span>
            </Link>

            <div className="hidden md:flex space-x-6">
              {dataNav.map(({ title, path }, index) => (
                <Link
                  key={index}
                  to={path}
                  className={`transition duration-300 ${
                    location.pathname === path
                      ? "text-blue-500 font-semibold"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                >
                  {title}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              {isAuthenticated ? (
                <div className="relative">
                  <div
                    onClick={toggleDropdown}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                      <img
                        src={user.picture}
                        alt={user.nickname}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-700">
                      {user.nickname.charAt(0).toLocaleUpperCase() +
                        user.nickname.slice(1)}
                    </span>
                  </div>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100">
                      <ul className="py-1">
                        {[
                          {
                            icon: <FaCartShopping />,
                            text: "Giỏ hàng",
                            badge: "8",
                          },
                          { icon: <FaHistory />, text: "Lịch sử đơn hàng" },
                          {
                            icon: <IoIosSettings />,
                            text: "Cập nhật tài khoản",
                          },
                          {
                            icon: <IoMdLogOut />,
                            text: "Đăng xuất",
                            onClick: logout,
                          },
                        ].map((item, index) => (
                          <li
                            key={index}
                            onClick={item.onClick}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition duration-300 flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              {item.icon}
                              <span>{item.text}</span>
                            </div>
                            {item.badge && (
                              <span className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                >
                  Đăng nhập
                </button>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-3xl text-gray-600">
                {isMenuOpen ? <MdOutlineCancel /> : <MdMenu />}
              </button>
            </div>
          </div>
          {/* menu mobile */}
          {isMenuOpen && (
            <div className="mt-4 md:hidden">
              <ul className="space-y-2">
                {dataNav.map(({ title, path }, index) => (
                  <li key={index}>
                    <Link
                      to={path}
                      className={`block py-2 transition duration-300 ${
                        location.pathname === path
                          ? "text-blue-500 font-semibold"
                          : "text-gray-600 hover:text-blue-500"
                      }`}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
                {isAuthenticated ? (
                  <li>
                    <div
                      onClick={toggleDropdown}
                      className="flex items-center space-x-3 py-2 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                        <img
                          src={user.picture}
                          alt={user.nickname}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-gray-700">
                        {user.nickname.charAt(0).toLocaleUpperCase() +
                          user.nickname.slice(1)}
                      </span>
                    </div>
                    {dropdownOpen && (
                      <ul className="mt-2 bg-gray-50 rounded-lg">
                        {[
                          {
                            icon: <FaCartShopping />,
                            text: "Giỏ hàng",
                            badge: "8",
                          },
                          { icon: <FaHistory />, text: "Lịch sử đơn hàng" },
                          {
                            icon: <IoIosSettings />,
                            text: "Cập nhật tài khoản",
                          },
                          {
                            icon: <IoMdLogOut />,
                            text: "Đăng xuất",
                            onClick: logout,
                          },
                        ].map((item, index) => (
                          <li
                            key={index}
                            onClick={item.onClick}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-300 flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-3">
                              {item.icon}
                              <span>{item.text}</span>
                            </div>
                            {item.badge && (
                              <span className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li>
                    <button
                      onClick={handleLogin}
                      className="w-full bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                    >
                      Đăng nhập
                    </button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
