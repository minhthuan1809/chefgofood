import React from "react";

export default function Trademark() {
  return (
    <div className="space-y-6 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center">
      <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center w-full max-w-xl">
        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 md:mb-8">
          Logo Thương Hiệu
        </h3>
        <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
            <img
              src="https://images.unsplash.com/photo-1730758405638-ab8659278e96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D"
              alt="Logo"
              className="relative w-32 h-32 md:w-56 md:h-56 object-cover rounded-full border-4 md:border-8 border-white shadow-2xl transform transition duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
              placeholder="Nhập URL hình ảnh logo..."
            />
          </div>
        </div>
      </div>

      {/* Brand Name Section */}
      <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 w-full max-w-xl">
        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 md:mb-8">
          Tên Thương Hiệu
        </h3>
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 md:p-6 rounded-xl">
            <span className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
              FastFood
            </span>
          </div>
          <div className="w-full">
            <input
              type="text"
              className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-700 placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
              placeholder="Nhập tên thương hiệu mới..."
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base w-full md:w-auto">
        Lưu Thay Đổi
      </button>
    </div>
  );
}
