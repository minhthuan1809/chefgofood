import { createContext, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Statistical_Product from "../Statistical/Statistical_Product";
import Statistical_oder from "../Statistical/Statistical_oder";
import StatisticalUse from "../Statistical/Statistical_use";

export const StatisticalSearchQuantity = createContext();

function Statistical() {
  const [type, setType] = useState(
    localStorage.getItem("typeAdmin") || "product"
  );
  const [quantity, setQuantity] = useState(
    parseInt(localStorage.getItem("quantity")) || 30
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("typeAdmin", type);
  }, [type]);

  useEffect(() => {
    localStorage.setItem("quantity", quantity);
  }, [quantity]);

  const dataStatistical = {
    product: <Statistical_Product />,
    order: <Statistical_oder />,
    user: <StatisticalUse />,
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:border-[#b17741]"
            />
          </div>

          {/* Bộ lọc trạng thái */}
          <select
            className="p-2 border rounded-lg focus:outline-none focus:border-[#b17741]"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="product">Sản phẩm</option>
            <option value="user">Người dùng</option>
            <option value="order">Đơn hàng</option>
          </select>

          {/* Số lượng */}
          <div className="flex items-center gap-2">
            <label className="text-gray-500">Số lượng:</label>
            <select
              className="border rounded px-3 py-2 outline-none"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {Array.from({ length: 100 }, (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Hiện thị các danh mục thống kê */}
        <div className="bg-white p-4 rounded-lg shadow mt-6">
          <StatisticalSearchQuantity.Provider value={{ search, quantity }}>
            {dataStatistical[type]}
          </StatisticalSearchQuantity.Provider>
        </div>
      </div>
    </div>
  );
}

export default Statistical;
