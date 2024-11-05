import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";

export default function Sale() {
  const [coupons] = useState([
    {
      id: 1,
      code: "FOOD30",
      discount: "0.3%",
      minOrder: "2,000₫",
      duration: "3 ngày",
      category: "Đồ ăn",
      status: "Đang hoạt động",
    },
    {
      id: 2,
      code: "DRINK50",
      discount: "0.5%",
      minOrder: "5,000₫",
      duration: "5 ngày",
      category: "Đồ uống",
      status: "Hết hạn",
    },
  ]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MdDiscount className="text-blue-600" />
          Quản lý mã giảm giá
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <FaPlus />
          Thêm mã mới
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm mã giảm giá..."
              className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <select className="p-2 border rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="expired">Hết hạn</option>
          </select>
          <select className="p-2 border rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Tất cả danh mục</option>
            <option value="food">Đồ ăn</option>
            <option value="drink">Đồ uống</option>
            <option value="drink">Bánh</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã giảm giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giảm giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đơn tối thiểu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời hạn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.discount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.minOrder}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      coupon.status === "Đang hoạt động"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {coupon.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg shadow">
        <div className="text-sm text-gray-500">
          Hiển thị 1-10 trong số 50 mục
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            Trước
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
