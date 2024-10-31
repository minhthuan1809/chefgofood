import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

export default function Modal_Register({ onClick, LoginOrRegister }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirm) {
      setError("Mật khẩu và mật khẩu xác nhận không khớp.");
      return;
    }

    // Gửi yêu cầu đăng ký
    try {
      const response = await fetch(
        "http://localhost/WebDoAn/main.php/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Đăng ký thất bại. Vui lòng thử lại.");
      }

      const data = await response.json();
      console.log("Đăng ký thành công:", data);
      setSuccess("Đăng ký thành công!");
      setError(""); // Reset lỗi
      setFormData({ username: "", email: "", password: "", confirm: "" }); // Reset form
    } catch (error) {
      setError(error.message);
      setSuccess(""); // Reset thông báo thành công
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Đăng ký</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClick}
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
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tên người dùng của bạn"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email của bạn"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mật khẩu"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              value={formData.confirm}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Xác nhận mật khẩu"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

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
              className="text-blue-500 hover:text-blue-600"
              onClick={() => LoginOrRegister(true)}
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
