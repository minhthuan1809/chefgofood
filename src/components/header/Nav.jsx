/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import { MdMenu, MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Modal_login from "./Modal_login";
import { getProfile } from "../../redux/middlewares/client/addProfile";
import Modal_Register from "./Modal_Register";
import {
  AddProfileRedux,
  apikeyRedux,
} from "../../redux/action/client/profile";
import { getUiNavbar } from "../../service/ui/ui_navbav";
import ModalForgot from "./ModalForgot";
import { FaHeart, FaHistory } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`transition duration-300 ${
        isActive
          ? "text-[#b17741] font-semibold"
          : "text-gray-600 hover:text-[#b17741]"
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

const MobileUserMenu = ({ user, onItemClick, DataCart, onClose }) => {
  const USER_MENU_ITEMS = [
    {
      icon: <FaCartShopping className="text-[#b17741]" />,
      text: "Giỏ hàng",
      badge: DataCart?.length,
      path: "/carts",
    },
    {
      icon: <FaHistory className="text-[#b17741]" />,
      text: "Lịch sử đơn hàng",
      path: "/history",
    },
    {
      icon: <IoIosSettings className="text-[#b17741]" />,
      text: "Cập nhật tài khoản",
      path: "/account",
    },
    {
      icon: <CiHeart className="text-[#b17741]" />,
      text: "Yêu thích",
      path: "/favorite",
    },
    {
      icon: <IoMdLogOut className="text-red-500" />,
      text: "Đăng xuất",
      action: "logout",
    },
  ];

  return (
    <div className="bg-white px-4 py-2 border-t border-gray-200">
      <div className="flex items-center space-x-3 mb-4 p-2 bg-gray-50 rounded-lg">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#b17741]">
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
      <ul className="space-y-1">
        {USER_MENU_ITEMS.map((item, index) => (
          <UserMenuItem
            key={index}
            {...item}
            onClick={() => {
              onItemClick(item.path, item.action);
              onClose();
            }}
          />
        ))}
      </ul>
    </div>
  );
};

const UserDropdown = ({ isOpen, onItemClick, DataCart }) => {
  if (!isOpen) return null;
  const USER_MENU_ITEMS = [
    {
      icon: <FaCartShopping />,
      text: "Giỏ hàng",
      badge: DataCart?.length,
      path: "/carts",
    },
    { icon: <FaHistory />, text: "Lịch sử đơn hàng", path: "/history" },
    { icon: <IoIosSettings />, text: "Cập nhật tài khoản", path: "/account" },
    {
      icon: <FaHeart />,
      text: "Yêu thích",
      path: "/favorite",
    },
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

const UserProfile = ({
  user,
  dropdownOpen,
  toggleDropdown,
  onItemClick,
  DataCart,
}) => (
  <div className="relative">
    <div
      onClick={toggleDropdown}
      className="flex items-center space-x-3 cursor-pointer"
    >
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#b17741]">
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
    <UserDropdown
      isOpen={dropdownOpen}
      onItemClick={onItemClick}
      DataCart={DataCart}
    />
  </div>
);

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginOrRegister, setisLoginOrRegister] = useState(true);
  const [dataRender, setDataRender] = useState({});
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.login.status);
  const apiKey = useSelector((state) => state.login.apikey);
  const profile = useSelector((state) => state.profile.profile);
  const DataCart = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    async function checkApiKey() {
      const data = await dispatch(getProfile(apiKey));
      if (!data?.ok) {
        dispatch(apikeyRedux(null, false));
        localStorage.removeItem("apikey");
      } else {
        dispatch(apikeyRedux(apiKey, true));
      }
    }
    checkApiKey();
  }, [apiKey, dispatch]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUiNavbar();
        if (data.ok) {
          setDataRender(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    if (dropdownOpen) setDropdownOpen(false);
  }, [dropdownOpen]);

  const handleItemClick = useCallback(
    (path, action) => {
      if (action === "logout") {
        if (confirm("Bạn muốn đăng xuất ?")) {
          dispatch(AddProfileRedux(null));
          dispatch(apikeyRedux(null, false));
          localStorage.removeItem("apikey");
          navigate("/");
          setDropdownOpen(false);
        }
      } else if (path) {
        navigate(path);
        setDropdownOpen(false);
      }
    },
    [navigate, dispatch]
  );

  const handleLoginClick = useCallback(() => {
    setIsLoginModalOpen(true);
    setIsMenuOpen(false);
  }, []);

  const handleCloseLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setisLoginOrRegister(true);
  }, []);

  const Logo = dataRender.menu?.find((item) => item.id === "5");

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex w-11/12 m-auto items-center justify-between max-lg:w-full">
          {Logo && (
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={Logo.image || "https://example.com/default-logo.png"}
                  alt={Logo.title || "FastFood Logo"}
                />
              </div>
              <span className="text-2xl font-bold text-gray-800">
                {Logo.title}
              </span>
            </Link>
          )}

          <div className="hidden md:flex space-x-6">
            {dataRender.menu
              ?.filter((item) => item.id !== "5")
              .map(({ id, title, url, className }) => (
                <NavLink key={id} to={url || "/"}>
                  <span className={className}>{title}</span>
                </NavLink>
              ))}
          </div>

          <div className="hidden md:block">
            {status ? (
              <UserProfile
                user={profile}
                dropdownOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
                onItemClick={handleItemClick}
                DataCart={DataCart}
              />
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLoginClick}
                  className="bg-[#b17741] text-white px-6 py-2 rounded-full hover:bg-[#b17741] transition duration-300"
                >
                  Đăng nhập
                </button>
              </div>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition duration-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <MdOutlineCancel className="text-2xl text-gray-600" />
            ) : (
              <MdMenu className="text-2xl text-gray-600" />
            )}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[76px] bg-white z-50 overflow-y-auto">
            <div className="px-4 py-2 space-y-2">
              {dataRender.menu
                ?.filter((item) => item.id !== "5")
                .map(({ id, title, url, className }) => (
                  <div key={id} className="border-b border-gray-100">
                    <NavLink
                      to={url || "/"}
                      onClick={toggleMenu}
                      className="block py-3"
                    >
                      <span className={`text-lg ${className}`}>{title}</span>
                    </NavLink>
                  </div>
                ))}

              {status ? (
                <MobileUserMenu
                  user={profile}
                  onItemClick={handleItemClick}
                  DataCart={DataCart}
                  onClose={toggleMenu}
                />
              ) : (
                <div className="mt-4 px-4">
                  <button
                    onClick={handleLoginClick}
                    className="w-full bg-[#b17741] text-white py-3 rounded-lg hover:bg-[#b17741] transition duration-300"
                  >
                    Đăng nhập
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Modals */}
      {isLoginModalOpen && (
        <Modal_login
          onClose={handleCloseLoginModal}
          setisLoginOrRegister={setisLoginOrRegister}
          isForgotModalOpen={setIsForgotModalOpen}
        />
      )}
      {!isLoginOrRegister && (
        <Modal_Register
          onClose={handleCloseLoginModal}
          isLoginModalOpen={setIsLoginModalOpen}
          setisLoginOrRegister={setisLoginOrRegister}
        />
      )}
      {isForgotModalOpen && (
        <ModalForgot
          onClose={setIsForgotModalOpen}
          isLoginModalOpen={setIsLoginModalOpen}
        />
      )}
    </div>
  );
};

export default Nav;
