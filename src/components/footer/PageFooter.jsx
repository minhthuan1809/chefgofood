import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function PageFooter() {
  return (
    <footer className="bg-slate-800 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            <h2 className="text-5xl font-extrabold italic">FastFood</h2>
            <p className="text-lg">
              Hương vị tuyệt vời, giao hàng nhanh chóng. Trải nghiệm ẩm thực độc
              đáo chỉ có tại FastFood!
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-white hover:text-blue-600 transition-colors duration-300"
              >
                <FaFacebookF className="h-8 w-8" />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-600 transition-colors duration-300"
              >
                <FaInstagram className="h-8 w-8" />
              </a>
              <a
                href="#"
                className="text-white hover:text-blue-600 transition-colors duration-300"
              >
                <FaTwitter className="h-8 w-8" />
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Liên hệ với chúng tôi</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="h-6 w-6 " />
                <span>123 Đường Ẩm Thực, Q.1, TP.HCM</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="h-6 w-6 " />
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="h-6 w-6 " />
                <a href="mailto:info@fastfood.com" className="hover:underline">
                  info@fastfood.com
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Đăng ký nhận ưu đãi</h3>
            <p>Nhận ngay ưu đãi 20% cho đơn hàng đầu tiên!</p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Email của bạn"
                className="px-4 py-3 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors duration-300"
              >
                Đăng ký ngay
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white border-opacity-20">
          <div className="flex flex-wrap justify-between items-center">
            <p>
              &copy; {new Date().getFullYear()} FastFood. All rights reserved.
            </p>
            <nav className="flex space-x-6 text-sm">
              <a href="#" className="hover:underline">
                Điều khoản sử dụng
              </a>
              <a href="#" className="hover:underline">
                Chính sách bảo mật
              </a>
              <a href="#" className="hover:underline">
                Cookies
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
