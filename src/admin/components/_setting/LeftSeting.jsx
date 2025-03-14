import React from "react";
import { useSelector } from "react-redux";
import {
  IoPersonOutline,
  IoMailOutline,
  IoShieldOutline,
} from "react-icons/io5";

export default function LeftSeting() {
  const dataDecentralization = useSelector(
    (state) => state.decentralization.DecentralizationReducer_dashboard
  );
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <IoPersonOutline className="text-[#b17741]" />
        Thông tin cá nhân
      </h3>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <IoPersonOutline className="text-gray-400 w-6 h-6 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Tên người dùng</p>
            <p className="font-medium text-gray-800">
              {dataDecentralization?.username}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <IoMailOutline className="text-gray-400 w-6 h-6 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-800">
              {dataDecentralization?.email}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <IoShieldOutline className="text-gray-400 w-6 h-6 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-2">Quyền hạn</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(dataDecentralization || {}).map(
                ([key, value]) => {
                  if (typeof value === "boolean") {
                    const translations = {
                      order: "Đơn hàng",
                      statistics: "Thống kê",
                      product: "Sản phẩm",
                      layout: "Giao diện",
                      mess: "Tin nhắn",
                      user: "Người dùng",
                      discount: "Giảm giá",
                      decentralization: "Phân quyền",
                      review: "Đánh giá",
                    };
                    return (
                      <div
                        key={key}
                        className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            value ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span className="text-sm">
                          {translations[key] || key}
                        </span>
                      </div>
                    );
                  }
                  return null;
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
