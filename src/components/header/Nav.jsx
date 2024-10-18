/* eslint-disable react/prop-types */
import { useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import { MdMenu, MdOutlineCancel } from "react-icons/md";

const NAV_ITEMS = [
  { title: "Trang Chủ", path: "/" },
  { title: "Món ăn", path: "/food" },
  { title: "Ưu đãi", path: "/discount" },
  { title: "Giới thiệu", path: "/about" },
];

const USER_MENU_ITEMS = [
  { icon: <FaCartShopping />, text: "Giỏ hàng", badge: "8", path: "/carts" },
  { icon: <FaHistory />, text: "Lịch sử đơn hàng", path: "/history" },
  {
    icon: <IoIosSettings />,
    text: "Cập nhật tài khoản",
    path: "/account",
  },
  { icon: <IoMdLogOut />, text: "Đăng xuất", action: "logout" },
];

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`transition duration-300 ${
        isActive
          ? "text-blue-500 font-semibold"
          : "text-gray-600 hover:text-blue-500"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const UserMenuItem = ({ icon, text, badge, onClick }) => (
  <li
    onClick={onClick}
    className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-300 flex items-center justify-between"
  >
    <div className="flex items-center space-x-3">
      {icon}
      <span>{text}</span>
    </div>
    {badge && (
      <span className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded-full">
        {badge}
      </span>
    )}
  </li>
);

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, isAuthenticated, loginWithPopup, user } = useAuth0();
  console.log(user);

  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    try {
      await loginWithPopup({ authorizationParams: { prompt: "login" } });
    } catch (error) {
      console.error("Login failed:", error.message, error);
    }
  }, [loginWithPopup]);

  const toggleDropdown = useCallback(
    () => setDropdownOpen((prev) => !prev),
    []
  );
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  const handleItemClick = useCallback(
    (path, action) => {
      if (action === "logout") {
        logout();
      } else if (path) {
        navigate(path);
      }
      setDropdownOpen(false);
      setIsMenuOpen(false);
    },
    [logout, navigate]
  );

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 ">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex w-11/12 m-auto items-center justify-between max-lg:w-full">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.15752-9/462261668_1232249157921421_6311346298250790419_n.jpg?stp=dst-jpg_tt7&_nc_cat=104&cb=99be929b-defccdb7&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHpQUkmEcb0ntJzoDaeqPBKrppjbjalRY-ummNuNqVFjwH6RyNHpRejnl9OX3G4NY3idtfM0dEpbjMBxaJE7r47&_nc_ohc=DmTZ64JrZ3gQ7kNvgFZsEuK&_nc_zt=23&_nc_ht=scontent.fhan17-1.fna&_nc_gid=Ab65FSsoHbLyRpQRSqMsN3S&oh=03_Q7cD1QF-r8BL7k5X4Fo1vGzzsJlkwHgdOo0qK_PwswDzOvediA&oe=673772D5"
                alt="logo"
              />
            </div>
            <span className="text-2xl font-bold text-gray-800">FastFood</span>
          </Link>

          <div className="hidden md:flex space-x-6">
            {NAV_ITEMS.map(({ title, path }) => (
              <NavLink key={path} to={path}>
                {title}
              </NavLink>
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
                    {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                  </span>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100">
                    <ul className="py-1">
                      {USER_MENU_ITEMS.map((item, index) => (
                        <UserMenuItem
                          key={index}
                          {...item}
                          onClick={() =>
                            handleItemClick(item.path, item.action)
                          }
                        />
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

        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <ul className="space-y-2">
              {NAV_ITEMS.map(({ title, path }) => (
                <li key={path}>
                  <NavLink to={path} onClick={() => setIsMenuOpen(false)}>
                    {title}
                  </NavLink>
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
                      {user.nickname.charAt(0).toUpperCase() +
                        user.nickname.slice(1)}
                    </span>
                  </div>
                  {dropdownOpen && (
                    <ul className="mt-2 bg-gray-50 rounded-lg">
                      {USER_MENU_ITEMS.map((item, index) => (
                        <UserMenuItem
                          key={index}
                          {...item}
                          onClick={() =>
                            handleItemClick(item.path, item.action)
                          }
                        />
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
  );
}
