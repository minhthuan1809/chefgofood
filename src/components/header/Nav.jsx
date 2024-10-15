import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

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
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="w-[2rem] h-[2rem] overflow-hidden rounded-full">
                    <img
                      src={user.picture}
                      alt={user.nickname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{user.nickname}</span>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <ul className="py-1">
                      <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-200 ease-in-out">
                        Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-200 ease-in-out">
                        Tùy chọn 2
                      </li>
                      <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-200 ease-in-out">
                        Tùy chọn 3
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition duration-200 ease-in-out"
                        onClick={logout}
                      >
                        Đăng xuất
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
