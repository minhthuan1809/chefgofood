import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
export default function Nav() {
  const { logout, isAuthenticated, loginWithPopup, isLoading, user } =
    useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await loginWithPopup({
        authorizationParams: {
          prompt: "login",
        },
      });
    } catch (error) {
      console.error("Login failed:", error.message, error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  console.log(user);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <nav className="flex items-center justify-between w-[80%] m-auto mt-[1rem]">
          <Link to="/">
            <div className="flex items-center gap-2">
              <div className="rounded-full overflow-hidden w-[3rem] h-[3rem]">
                <img
                  className="h-full w-full object-cover"
                  src="https://cms.imgworlds.com/assets/473cfc50-242c-46f8-80be-68b867e28919.jpg?key=home-gallery"
                  alt="logo"
                />
              </div>
              <span className="text-2xl font-bold text-gray-800">FastFood</span>
            </div>
          </Link>

          <div className="mt-4">
            <ul className="flex space-x-4 text-gray-600">
              <li className="hover:text-blue-500 cursor-pointer">Đồ ăn</li>
              <li className="hover:text-blue-500 cursor-pointer">Contact</li>
              <li className="hover:text-blue-500 cursor-pointer">Giới thiệu</li>
            </ul>
          </div>

          <div className="mt-4 flex space-x-2">
            {isAuthenticated ? (
              <div className="relative">
                <div onClick={toggleDropdown}>
                  <div>
                    <div className="flex items-center gap-4 cursor-pointer border px-5 py-2">
                      <div className="w-[2rem] h-[2rem] overflow-hidden rounded-full">
                        <img
                          src={user.picture}
                          alt={user.nickname}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>
                        {user.nickname.charAt(0).toUpperCase() +
                          user.nickname.slice(1)}
                      </span>
                    </div>
                    <span className="bg-red-600 text-white px-[9px] py-[1px]  text-[1rem] rounded-full absolute right-[-1rem] top-[-0.7rem]">
                      2
                    </span>
                  </div>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-[-2rem] mt-2 w-[15rem] bg-white border border-gray-300 rounded-lg shadow-lg">
                    <ul className="py-1">
                      <li className="flex justify-between px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-200 ease-in-out">
                        <div className="flex items-center gap-3">
                          <FaCartShopping />
                          <span> Giỏ hàng</span>
                        </div>
                        <span className="px-[9px] py-[1px]  text-[0.8rem] text-red-600 border border-solid border-red-600 rounded-full">
                          8
                        </span>
                      </li>
                      <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-200 ease-in-out">
                        <FaHistory />
                        <span> Lịch sử đơn hàng</span>
                      </li>
                      <li className="flex items-center gap-3 px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-200 ease-in-out">
                        <IoIosSettings />
                        <span> Cập nhật tài khoản</span>
                      </li>
                      <li
                        className="flex items-center gap-5 px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-200 ease-in-out"
                        onClick={logout}
                      >
                        <IoMdLogOut />
                        <span>Đăng xuất</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="border-blue-500 text-blue-500 border py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition duration-200 ease-in-out"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
