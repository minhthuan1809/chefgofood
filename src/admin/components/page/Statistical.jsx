import React, { useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { FaSearch, FaPlus } from "react-icons/fa";
import Statistical_Product from "../Statistical/Statistical_Product";
import Statistical_oder from "../Statistical/Statistical_oder";

const Statistical = () => {
  const [type, setType] = useState("product");
  const dataStatistical = {
    product: <Statistical_Product />,
    order: <Statistical_oder />,
  };
  return (
    <div className="p-6">
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold mb-4">Thống kê</h1>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 border rounded hover:bg-gray-100 flex items-center gap-2">
            <BiRefresh className="text-xl text-gray-500" />
          </button>
          {/* Bộ lọc trạng thái */}
          <select
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="product">Sản phẩm</option>
            <option value="user">Người dùng</option>
            <option value="order">Đơn hàng</option>
          </select>

          {/* Số lượng */}
          <div className="flex items-center gap-2">
            <label className="text-gray-500">Số lượng:</label>
            <select className="border rounded px-3 py-2 outline-none">
              {Array.from({ length: 100 }, (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* hiện thị các danh mục thống kê */}
        <div className="bg-white p-4 rounded-lg shadow  mt-6">
          {dataStatistical[type]}
        </div>
      </div>
    </div>
  );
};

export default Statistical;
