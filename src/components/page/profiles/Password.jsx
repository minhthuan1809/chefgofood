import { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineWarning,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";
import { changerPassword } from "../../../service/changerPass_client";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Password() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const apiKey = useSelector((state) => state.login.apikey);

  // Hàm kiểm tra ký tự tiếng Việt
  const containsVietnameseCharacters = (str) => {
    const vietnameseCharacters = /[àáạảãâầấậẩẫăằắặẳẵêềếệểễôồốộổỗơờớợởỡưừứựửữ]/i;
    return vietnameseCharacters.test(str);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirm("bạn muốn thay đổi mật khẩu ?")) {
      return;
    }
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setError("");

    let valid = true;

    // Kiểm tra ký tự tiếng Việt cho các trường nhập
    if (containsVietnameseCharacters(currentPassword)) {
      setCurrentPasswordError(
        "Mật khẩu hiện tại không được chứa ký tự tiếng Việt."
      );
      valid = false;
    }
    if (containsVietnameseCharacters(newPassword)) {
      setNewPasswordError("Mật khẩu mới không được chứa ký tự tiếng Việt.");
      valid = false;
    }
    if (containsVietnameseCharacters(confirmPassword)) {
      setConfirmPasswordError(
        "Xác nhận mật khẩu không được chứa ký tự tiếng Việt."
      );
      valid = false;
    }

    // Kiểm tra mật khẩu
    if (currentPassword.trim() === "") {
      setCurrentPasswordError("Mật khẩu hiện tại không được để trống.");
      valid = false;
    }
    if (newPassword.length < 6) {
      setNewPasswordError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      valid = false;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(
        "Mật khẩu mới và xác nhận mật khẩu không trùng khớp."
      );
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await changerPassword(apiKey, {
        current_password: currentPassword,
        new_password: newPassword,
      });
      console.log(response);
      if (response?.ok) {
        if (!response?.success) {
          toast.error(response?.message);
        } else {
          toast.success("Thay đổi mật khẩu thành công!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      }
    } catch (err) {
      console.log(err);
      setError("Đã xảy ra lỗi khi thay đổi mật khẩu.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <RiLockPasswordLine className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Thay đổi mật khẩu</h2>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <MdOutlineSecurity className="w-4 h-4" />
              <p>Vui lòng nhập mật khẩu hiện tại và mật khẩu mới của bạn</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-center gap-2">
                <AiOutlineWarning className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}

            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Mật khẩu hiện tại</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu hiện tại"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {currentPasswordError && (
                <p className="text-red-600 text-sm">{currentPasswordError}</p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Mật khẩu mới</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu mới"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {newPasswordError && (
                <p className="text-red-600 text-sm">{newPasswordError}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu mới"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-red-600 text-sm">{confirmPasswordError}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                       flex items-center justify-center gap-2 transition-colors"
            >
              <RiLockPasswordLine className="w-5 h-5" />
              Cập nhật mật khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
