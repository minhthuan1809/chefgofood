import React, { useState } from "react";
import {
  IoLockClosedOutline,
  IoEyeOffOutline,
  IoEyeOutline,
  IoShieldOutline,
  IoKeyOutline,
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

  const PasswordField = ({
    label,
    value,
    onChange,
    showPassword,
    toggleShowPassword,
    error,
    placeholder,
    icon,
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-blue-700">{label}</label>
      <div className="relative">
        <div
          className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
            error ? "top-[-25%]" : ""
          }`}
        >
          {icon}
        </div>
        <input
          type={showPassword ? "password" : "text"}
          value={value}
          onChange={onChange}
          className={`w-full outline-none pl-10 pr-12 py-3 border-2 ${
            error ? "border-red-400" : "border-blue-100"
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50 transition-all`}
          placeholder={placeholder}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <button
          type="button"
          onClick={toggleShowPassword}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            error ? "top-[40%]" : "top-1/2"
          }`}
        >
          {showPassword ? (
            <IoEyeOutline className="text-blue-400 w-5 h-5" />
          ) : (
            <IoEyeOffOutline className="text-blue-400 w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-blue-800">
          Cài đặt tài khoản
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-5">
            <LeftSeting />
          </div>

          {/* Password Change Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-100">
                <div className="bg-blue-600 text-white p-3 rounded-full">
                  <IoShieldOutline className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-blue-800">
                  Đổi mật khẩu
                </h3>
              </div>

              <p className="text-gray-600 mb-6 text-sm">
                Để bảo vệ tài khoản, vui lòng chọn mật khẩu mạnh với ít nhất 6
                ký tự.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <PasswordField
                  label="Mật khẩu hiện tại"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  showPassword={showOldPassword}
                  toggleShowPassword={() =>
                    setShowOldPassword(!showOldPassword)
                  }
                  error={errorOldPassword}
                  placeholder="Nhập mật khẩu hiện tại"
                  icon={<IoKeyOutline className="text-blue-400 w-5 h-5" />}
                />

                <PasswordField
                  label="Mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  showPassword={showNewPassword}
                  toggleShowPassword={() =>
                    setShowNewPassword(!showNewPassword)
                  }
                  error={errorNewPassword}
                  placeholder="Nhập mật khẩu mới"
                  icon={
                    <IoLockClosedOutline className="text-blue-400 w-5 h-5" />
                  }
                />

                <PasswordField
                  label="Xác nhận mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  showPassword={showConfirmPassword}
                  toggleShowPassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  error={errorConfirmPassword}
                  placeholder="Xác nhận mật khẩu mới"
                  icon={
                    <IoLockClosedOutline className="text-blue-400 w-5 h-5" />
                  }
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:ring-4 focus:ring-blue-200 transition-all font-medium mt-8 shadow-md"
                >
                  Cập nhật mật khẩu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
