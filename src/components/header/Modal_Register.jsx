/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { getRegister } from "../../service/register";
import { toast } from "react-toastify";

export default function Modal_Register({
  onClose,
  isLoginModalOpen,
  setisLoginOrRegister,
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for field on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validations
    if (!formData.username) {
      newErrors.username = "Tên người dùng không được để trống.";
    } else if (formData.username.length <= 5) {
      newErrors.username = "Tên người dùng phải lớn hơn 5 ký tự.";
    }

    if (!formData.email) {
      newErrors.email = "Email không được để trống.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    if (!formData.confirm) {
      newErrors.confirm = "Xác nhận mật khẩu không được để trống.";
    } else if (formData.password !== formData.confirm) {
      newErrors.confirm = "Mật khẩu và mật khẩu xác nhận không khớp.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Gửi yêu cầu đăng ký
    try {
      toast.dismiss();
      const data = await getRegister(formData);

      if (data.ok) {
        setErrors({});
        setFormData({ username: "", email: "", password: "", confirm: "" });
        setisLoginOrRegister(true); // Chuyển về trạng thái đăng nhập
        isLoginModalOpen(true); // Mở modal đăng nhập
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Đăng ký</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <MdOutlineCancel size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tên Người Dùng
            </label>
            <input
              type="text"
              id="username"
              name="username"
              maxLength={20}
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tên người dùng của bạn"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              maxLength={50}
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email của bạn"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mật khẩu
            </label>
            <input
              maxLength={15}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mật khẩu"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Xác nhận mật khẩu
            </label>
            <input
              maxLength={15}
              type="password"
              id="confirm"
              name="confirm"
              value={formData.confirm}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Xác nhận mật khẩu"
            />
            {errors.confirm && (
              <p className="text-red-500 text-sm">{errors.confirm}</p>
            )}
          </div>
          {errors.general && (
            <p className="text-red-500 text-sm">{errors.general}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Đăng ký
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?
            <button
              className="text-blue-500 pl-2 hover:text-blue-600"
              onClick={() => {
                isLoginModalOpen(true);
                setisLoginOrRegister(true);
              }}
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
