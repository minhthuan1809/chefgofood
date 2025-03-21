import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changerPassword } from "../../../service/changerPass_client";
import {
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiShieldKeyholeLine,
  RiAlertLine,
  RiCheckLine,
} from "react-icons/ri";

export default function Password() {
  // State for password visibility
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // State for form values
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // State for form errors
  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: "",
    general: "",
  });

  // Get API key from Redux store
  const apiKey = useSelector((state) => state.login.apikey);

  // Validate Vietnamese characters
  const containsVietnameseCharacters = (str) => {
    return /[àáạảãâầấậẩẫăằắặẳẵêềếệểễôồốộổỗơờớợởỡưừứựửữ]/i.test(str);
  };

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const labels = ["Rất yếu", "Yếu", "Trung bình", "Mạnh", "Rất mạnh"];
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-400",
      "bg-green-600",
    ];

    return {
      strength,
      label: labels[strength],
      color: colors[strength],
    };
  };

  // Handle form input changes
  const handleChange = (field, value) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear respective error when typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Current password validation
    if (!passwords.current) {
      newErrors.current = "Vui lòng nhập mật khẩu hiện tại";
      isValid = false;
    } else if (containsVietnameseCharacters(passwords.current)) {
      newErrors.current = "Mật khẩu không được chứa ký tự tiếng Việt";
      isValid = false;
    }

    // New password validation
    if (!passwords.new) {
      newErrors.new = "Vui lòng nhập mật khẩu mới";
      isValid = false;
    } else if (passwords.new.length < 6) {
      newErrors.new = "Mật khẩu mới phải có ít nhất 6 ký tự";
      isValid = false;
    } else if (containsVietnameseCharacters(passwords.new)) {
      newErrors.new = "Mật khẩu không được chứa ký tự tiếng Việt";
      isValid = false;
    }

    // Confirm password validation
    if (!passwords.confirm) {
      newErrors.confirm = "Vui lòng xác nhận mật khẩu mới";
      isValid = false;
    } else if (passwords.new !== passwords.confirm) {
      newErrors.confirm = "Mật khẩu xác nhận không khớp";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!confirm("Bạn có chắc chắn muốn thay đổi mật khẩu?")) {
      return;
    }

    try {
      const response = await changerPassword(apiKey, {
        current_password: passwords.current,
        new_password: passwords.new,
      });

      if (response?.ok) {
        if (!response?.success) {
          toast.error(response?.message || "Thay đổi mật khẩu thất bại");
        } else {
          toast.success("Thay đổi mật khẩu thành công!");
          setPasswords({ current: "", new: "", confirm: "" });
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "Có lỗi xảy ra khi thay đổi mật khẩu",
        }));
      }
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        general: "Đã xảy ra lỗi khi thay đổi mật khẩu",
      }));
    }
  };

  // Calculate password strength
  const passwordStrength = getPasswordStrength(passwords.new);

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#a05a2c] to-[#d3a676] p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <RiShieldKeyholeLine className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Bảo mật tài khoản</h2>
              <p className="text-white/80 text-sm">Cập nhật mật khẩu của bạn</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg flex items-center gap-2">
              <RiAlertLine className="flex-shrink-0" />
              <p className="text-sm">{errors.general}</p>
            </div>
          )}

          {/* Current Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu hiện tại
              </label>
            </div>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPasswords.current ? "text" : "password"}
                className={`block w-full pl-10 pr-10 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#b17741] focus:border-[#b17741] ${
                  errors.current ? "border-red-300 text-red-900" : ""
                }`}
                placeholder="Nhập mật khẩu hiện tại"
                value={passwords.current}
                onChange={(e) => handleChange("current", e.target.value)}
                maxLength={15}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showPasswords.current ? (
                  <RiEyeOffLine className="h-5 w-5 text-gray-400" />
                ) : (
                  <RiEyeLine className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.current && (
              <p className="text-sm text-red-600">{errors.current}</p>
            )}
          </div>

          {/* New Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mật khẩu mới
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPasswords.new ? "text" : "password"}
                className={`block w-full pl-10 pr-10 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#b17741] focus:border-[#b17741] ${
                  errors.new ? "border-red-300 text-red-900" : ""
                }`}
                placeholder="Nhập mật khẩu mới"
                value={passwords.new}
                onChange={(e) => handleChange("new", e.target.value)}
                maxLength={15}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPasswords.new ? (
                  <RiEyeOffLine className="h-5 w-5 text-gray-400" />
                ) : (
                  <RiEyeLine className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.new && <p className="text-sm text-red-600">{errors.new}</p>}

            {/* Password strength meter */}
            {passwords.new && (
              <div className="space-y-1">
                <div className="flex h-1 overflow-hidden bg-gray-200 rounded">
                  <div
                    className={`${passwordStrength.color}`}
                    style={{
                      width: `${(passwordStrength.strength + 1) * 20}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 flex items-center">
                  Độ mạnh:{" "}
                  <span className="font-medium ml-1">
                    {passwordStrength.label}
                  </span>
                </p>

                <div className="text-xs text-gray-600 space-y-1 mt-2">
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-3 h-3 rounded-full flex items-center justify-center ${
                        passwords.new.length >= 6
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {passwords.new.length >= 6 && (
                        <RiCheckLine className="text-white w-2 h-2" />
                      )}
                    </div>
                    <span>Ít nhất 6 ký tự</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-3 h-3 rounded-full flex items-center justify-center ${
                        /[A-Z]/.test(passwords.new)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {/[A-Z]/.test(passwords.new) && (
                        <RiCheckLine className="text-white w-2 h-2" />
                      )}
                    </div>
                    <span>Có ít nhất 1 ký tự viết hoa</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-3 h-3 rounded-full flex items-center justify-center ${
                        /[0-9]/.test(passwords.new)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {/[0-9]/.test(passwords.new) && (
                        <RiCheckLine className="text-white w-2 h-2" />
                      )}
                    </div>
                    <span>Có ít nhất 1 chữ số</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPasswords.confirm ? "text" : "password"}
                className={`block w-full pl-10 pr-10 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-[#b17741] focus:border-[#b17741] ${
                  errors.confirm ? "border-red-300 text-red-900" : ""
                }`}
                placeholder="Xác nhận mật khẩu mới"
                value={passwords.confirm}
                onChange={(e) => handleChange("confirm", e.target.value)}
                maxLength={15}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPasswords.confirm ? (
                  <RiEyeOffLine className="h-5 w-5 text-gray-400" />
                ) : (
                  <RiEyeLine className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirm && (
              <p className="text-sm text-red-600">{errors.confirm}</p>
            )}
            {passwords.new &&
              passwords.confirm &&
              passwords.new === passwords.confirm && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <RiCheckLine className="w-4 h-4" />
                  Mật khẩu khớp
                </p>
              )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#b17741] to-[#d3a676] hover:from-[#a05a2c] hover:to-[#b17741] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b17741]"
            >
              Cập nhật mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
