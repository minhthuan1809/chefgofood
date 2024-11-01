/* eslint-disable react/prop-types */
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../redux/middlewares/login";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Modal_login({ onClick, LoginOrRegister }) {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.login.apikey);
  const [statusLogin, setStatusLogin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const email = data.email;

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }

    const response = await dispatch(getLogin(data));
    console.log(response);
    toast.dismiss();
    if (response.message === "Invalid username or password.") {
      setStatusLogin("Email hoặc mật khẩu không chính xác.");
      toast.error("Email hoặc mật khẩu không chính xác.");
    } else if (response.ok) {
      toast.success("Thành Công !");
    } else {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Đăng nhập</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClick}
          >
            <MdOutlineCancel size={24} />
          </button>
        </div>
        {statusLogin && (
          <p className="text-red-500 text-sm text-center mb-4">{statusLogin}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              maxLength={30}
              type="email"
              id="email"
              name="email"
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
              maxLength={20}
              // minLength={6}
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mật khẩu"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                Ghi nhớ đăng nhập
              </span>
            </label>
            <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
              Quên mật khẩu?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?
            <button
              className="text-blue-500 hover:text-blue-600"
              onClick={() => LoginOrRegister(false)}
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
