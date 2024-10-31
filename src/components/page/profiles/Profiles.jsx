import React from "react";
import { IoMdTrash } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Profile() {
  const profile = useSelector((state) => state.profile.profile);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Thông tin người dùng */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Thông tin người dùng
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm w-full sm:w-auto">
            <IoMdTrash />
            Xóa tài khoản
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img
            src={profile.avata}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
          />
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 shadow-sm w-full sm:w-auto">
              <FaCamera />
              Chọn ảnh
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm w-full sm:w-auto">
              Cập nhật
            </button>
          </div>
        </div>
      </div>

      {/* Thay đổi thông tin */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Thay đổi thông tin
        </h2>
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          placeholder="Nhập tên mới"
        />
        <p className="text-gray-600 mb-4">
          Email:{" "}
          <span className="font-medium text-gray-800 break-all">
            {profile.email}
          </span>
        </p>
        <button className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}
