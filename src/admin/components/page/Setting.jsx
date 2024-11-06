import React, { useState } from "react";

import {
  IoLockClosedOutline,
  IoEyeOffOutline,
  IoEyeOutline,
} from "react-icons/io5";
import LeftSeting from "../_setting/LeftSeting";
import handleChangePassword from "../../components/_setting/changer_pass";

export default function Setting() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [errorOldPassword, setErrorOldPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const validatePassword = () => {
    let isValid = true;
    if (oldPassword.trim() === "") {
      setErrorOldPassword("Mật khẩu hiện tại không được để trống");
      isValid = false;
    } else if (oldPassword.length < 6) {
      setErrorOldPassword("Mật khẩu hiện tại phải có ít nhất 6 ký tự");
      isValid = false;
    } else {
      setErrorOldPassword("");
    }

    if (newPassword.trim() === "") {
      setErrorNewPassword("Mật khẩu mới không được để trống");
      isValid = false;
    } else if (newPassword.length < 6) {
      setErrorNewPassword("Mật khẩu mới phải có ít nhất 6 ký tự");
      isValid = false;
    } else {
      setErrorNewPassword("");
    }

    if (confirmPassword.trim() === "") {
      setErrorConfirmPassword("Xác nhận mật khẩu mới không được để trống");
      isValid = false;
    } else if (confirmPassword.length < 6) {
      setErrorConfirmPassword("Xác nhận mật khẩu mới phải có ít nhất 6 ký tự");
      isValid = false;
    } else if (confirmPassword !== newPassword) {
      setErrorConfirmPassword("Mật khẩu xác nhận không khớp");
      isValid = false;
    } else {
      setErrorConfirmPassword("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      current_password: oldPassword,
      new_password: newPassword,
    };
    if (validatePassword()) {
      handleChangePassword(
        data,
        setNewPassword,
        setOldPassword,
        setConfirmPassword
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
        Cài đặt tài khoản
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Thông tin cá nhân */}
        <LeftSeting />

        {/* Đổi mật khẩu */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <IoLockClosedOutline className="text-blue-500" />
            Đổi mật khẩu
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu hiện tại
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                    errorOldPassword && "top-[-25%] "
                  }`}
                >
                  <IoLockClosedOutline className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type={showOldPassword ? "password" : "text"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className={`w-full outline-none pl-10 pr-12 py-2 border ${
                    errorOldPassword ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Nhập mật khẩu hiện tại"
                />
                {errorOldPassword && (
                  <p className="text-red-500 text-xs italic">
                    {errorOldPassword}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    errorConfirmPassword ? "top-[40%] " : "top-1/2"
                  }`}
                >
                  {showOldPassword ? (
                    <IoEyeOutline className="text-gray-400 w-5 h-5" />
                  ) : (
                    <IoEyeOffOutline className="text-gray-400 w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {/* //NewPassword */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                    errorNewPassword && "top-[-25%] "
                  }`}
                >
                  <IoLockClosedOutline className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type={showNewPassword ? "password" : "text"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full pl-10 outline-none pr-12 py-2 border ${
                    errorNewPassword ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Nhập mật khẩu mới"
                />
                {errorNewPassword && (
                  <p className="text-red-500 text-xs italic">
                    {errorNewPassword}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    errorNewPassword ? "top-[40%] " : "top-1/2"
                  }`}
                >
                  {showNewPassword ? (
                    <IoEyeOutline className="text-gray-400 w-5 h-5" />
                  ) : (
                    <IoEyeOffOutline className="text-gray-400 w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {/* //ConfirmPassword */}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
                    errorNewPassword && "top-[-25%] "
                  }`}
                >
                  <IoLockClosedOutline className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type={showConfirmPassword ? "password" : "text"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 outline-none pr-12 py-2 border ${
                    errorConfirmPassword ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  placeholder="Xác nhận mật khẩu mới"
                />
                {errorConfirmPassword && (
                  <p className="text-red-500 text-xs italic">
                    {errorConfirmPassword}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    errorConfirmPassword ? "top-[40%] " : "top-1/2"
                  }`}
                >
                  {showConfirmPassword ? (
                    <IoEyeOutline className="text-gray-400 w-5 h-5" />
                  ) : (
                    <IoEyeOffOutline className="text-gray-400 w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition-all font-medium mt-6"
            >
              Đổi mật khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
