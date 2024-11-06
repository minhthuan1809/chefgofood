import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import Loading from "../util/Loading";

export default function UserAdmin() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6  mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">
            Quản lý người dùng
          </h2>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <FaPlus className="mr-2" />
            Thêm Người Dùng
          </button>
        </div>

        <div className="p-4">
          {/* Search and Refresh */}
          <div className="mb-6 flex gap-4 items-center">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              <BiRefresh className="text-gray-600" />
            </button>

            {/* Limit Selection */}
            <div className="flex items-center gap-2">
              <label className="text-gray-500">Hiển thị:</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 outline-none"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index} value={(index + 1) * 5}>
                    {(index + 1) * 5}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3">STT</th>
                  <th className="p-3">Hình ảnh</th>
                  <th className="p-3">Tên</th>
                  <th className="p-3">Email</th>
                  <th className="p-3 text-right">Mật khẩu</th>
                  <th className="p-3 text-right">Địa chỉ</th>
                  <th className="p-3 text-center">Trạng thái</th>
                  <th className="p-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">
                        <img
                          src={user.image_url}
                          alt={user.name}
                          className="w-12 h-12 object-cover rounded-full border"
                        />
                      </td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3 text-right">••••••</td>
                      <td className="p-3 text-right">{user.address}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            user.status === "active"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {user.status === "active" ? "Hoạt động" : "Khóa"}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex gap-2 justify-center">
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                            <FaEdit />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-100 rounded">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                      Không có người dùng nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
