/* eslint-disable react/prop-types */
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getLogin } from "../../redux/middlewares/client/login";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Modal_login({ onClose, setisLoginOrRegister }) {
  const dispatch = useDispatch();
  const [statusLogin, setStatusLogin] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Load cookies khi component mount
  useEffect(() => {
    const savedEmail = Cookies.get("userEmail");
    const savedPassword = Cookies.get("userPassword");
    const remembered = Cookies.get("rememberMe") === "true";

    if (remembered && savedEmail && savedPassword) {
      setFormData({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true,
      });
    }
  }, []);

  // Xử lý thay đổi input và cập nhật cookies
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Chỉ cập nhật cookies khi checkbox thay đổi
      if (type === "checkbox") {
        if (checked) {
          // Lưu cookies với thời hạn 30 ngày
          Cookies.set("userEmail", newFormData.email, {
            expires: 20,
            secure: true,
          });
          Cookies.set("userPassword", newFormData.password, {
            expires: 20,
            secure: true,
          });
          Cookies.set("rememberMe", "true", { expires: 30, secure: true });
        } else {
          // Xóa cookies khi bỏ check
          Cookies.remove("userEmail");
          Cookies.remove("userPassword");
          Cookies.remove("rememberMe");
        }
      }

      return newFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email;

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }

    const response = await dispatch(getLogin(formData));

    toast.dismiss();

    if (response.message === "Invalid username or password.") {
      setStatusLogin("Email hoặc mật khẩu không chính xác.");
      toast.error("Email hoặc mật khẩu không chính xác.");
    } else if (response.status === "block") {
      toast.info("Tài Khoản này không tồn tại !");
    } else if (response.ok) {
      // Cập nhật cookies khi đăng nhập thành công và đã check remember me
      if (formData.rememberMe) {
        Cookies.set("userEmail", formData.email, { expires: 30, secure: true });
        Cookies.set("userPassword", formData.password, {
          expires: 30,
          secure: true,
        });
        Cookies.set("rememberMe", "true", { expires: 30, secure: true });
      }
      toast.success("Thành Công !");
      onClose();
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
            onClick={onClose}
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
              maxLength={50}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
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
              maxLength={50}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mật khẩu"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
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
          <p className="text-sm text-gray-600 ">
            Chưa có tài khoản?
            <button
              className="text-blue-500 ml-2 hover:text-blue-600 ml-1"
              onClick={() => setisLoginOrRegister(false)}
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
