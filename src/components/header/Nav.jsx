/* eslint-disable react/prop-types */
import { useState, useCallback, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import { MdMenu, MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Modal_login from "./Modal_login";
import { getProfile } from "../../redux/middlewares/addProfile";
import Modal_Register from "./Modal_Register";

let dataLoca = localStorage.getItem("apikey");

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

const UserMenuItem = ({ icon, text, badge, onClick, path }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  }, [onClick, path, navigate]);

  return (
    <li
      onClick={handleClick}
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
};

const UserDropdown = ({ isOpen, onItemClick }) => {
  if (!isOpen) return null;

  const USER_MENU_ITEMS = [
    { icon: <FaCartShopping />, text: "Giỏ hàng", badge: "8", path: "/carts" },
    { icon: <FaCartShopping />, text: "Lịch sử đơn hàng", path: "/history" },
    { icon: <IoIosSettings />, text: "Cập nhật tài khoản", path: "/account" },
    { icon: <IoMdLogOut />, text: "Đăng xuất", action: "logout" },
  ];

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100">
      <ul className="py-1">
        {USER_MENU_ITEMS.map((item, index) => (
          <UserMenuItem
            key={index}
            {...item}
            onClick={() => onItemClick(item.path, item.action)}
          />
        ))}
      </ul>
    </div>
  );
};

const UserProfile = ({ user, dropdownOpen, toggleDropdown, onItemClick }) => (
  <div className="relative">
    <div
      onClick={toggleDropdown}
      className="flex items-center space-x-3 cursor-pointer"
    >
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
        <img
          src={user?.avata || "/default-avatar.png"}
          alt={user?.username || "User avatar"}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="font-medium text-gray-700">
        {user?.username || "User"}
      </span>
    </div>
    <UserDropdown isOpen={dropdownOpen} onItemClick={onItemClick} />
  </div>
);

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginOrRegister, setisLoginOrRegister] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.login.status);
  const apiKey = useSelector((state) => state.login.apikey);
  const profile = useSelector((state) => state.profile.profile);

  const NAV_ITEMS = useMemo(
    () => [
      { title: "Trang Chủ", path: "/" },
      { title: "Món ăn", path: "/food" },
      { title: "Ưu đãi", path: "/discount" },
      { title: "Giới thiệu", path: "/abouts" },
    ],
    []
  );

  useEffect(() => {
    if (dataLoca) {
      setIsAuthenticated(true);
      dispatch(getProfile(apiKey));
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (status && apiKey) {
        try {
          setIsLoginModalOpen(false);
          setIsAuthenticated(true);
          setIsMenuOpen(false);

          await dispatch(getProfile(apiKey));
        } catch (error) {
          console.error("Failed to fetch profile:", error);
          setIsAuthenticated(false);
        }
      }
    };

    fetchProfile();
  }, [status, dispatch, apiKey]);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleItemClick = useCallback(
    (path, action) => {
      if (action === "logout") {
        if (confirm("Bạn muốn đăng xuất ?")) {
          setIsAuthenticated(false);
          setIsAuthenticated(false);
          dispatch({
            type: "add/profile",
            payload: null,
          });
          dispatch({
            type: "login/apikey",
            payload: null,
            status: false,
          });
          localStorage.removeItem("apikey");

          navigate("/");
          setDropdownOpen(false);
        }
      } else if (path) {
        navigate(path);
        setDropdownOpen(false);
      }
    },
    [navigate]
  );

  const handleLoginClick = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const handleCloseLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setisLoginOrRegister(true);
  }, []);

  const Logo = useMemo(
    () => (
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src="/path/to/your/logo.jpg"
            alt="FastFood Logo"
          />
        </div>
        <span className="text-2xl font-bold text-gray-800">FastFood</span>
      </Link>
    ),
    []
  );

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex w-11/12 m-auto items-center justify-between max-lg:w-full">
          {Logo}

          <div className="hidden md:flex space-x-6">
            {NAV_ITEMS.map(({ title, path }) => (
              <NavLink key={path} to={path}>
                {title}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:block">
            {isAuthenticated ? (
              <UserProfile
                user={profile}
                dropdownOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
                onItemClick={handleItemClick}
              />
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Đăng nhập
              </button>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-3xl text-gray-600"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <MdOutlineCancel /> : <MdMenu />}
          </button>
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
                  <UserProfile
                    user={profile}
                    dropdownOpen={dropdownOpen}
                    toggleDropdown={toggleDropdown}
                    onItemClick={handleItemClick}
                  />
                </li>
              ) : (
                <li>
                  <button
                    onClick={handleLoginClick}
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
      {isLoginModalOpen &&
        (isLoginOrRegister ? (
          <Modal_login
            onClick={handleCloseLoginModal}
            LoginOrRegister={setisLoginOrRegister}
          />
        ) : (
          <Modal_Register
            onClick={handleCloseLoginModal}
            LoginOrRegister={setisLoginOrRegister}
          />
        ))}
    </div>
  );
};

export default Nav;
