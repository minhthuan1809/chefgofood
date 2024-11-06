import React, { useState, useEffect, useCallback } from "react";
import { HiPencilAlt, HiTrash, HiPlus, HiSearch } from "react-icons/hi";
import { BiSolidHide, BiSolidShow, BiRefresh } from "react-icons/bi";
import { useSelector } from "react-redux";
import { getdecentralization } from "../../../service/server/decentralization/render";
import { decentralizationDelete } from "../../../service/server/decentralization/delete";
import Loading from "../../../components/util/Loading";
import { toast } from "react-toastify";
import ModelDecentralization from "../model_decentralization/ModelDecentralization";

// Constants for permissions and column definitions
const PERMISSIONS = [
  { key: "decentralization", label: "Phân quyền" },
  { key: "discount", label: "Giảm giá" },
  { key: "layout", label: "Giao diện" },
  { key: "mess", label: "Tin nhắn" },
  { key: "order", label: "Đơn hàng" },
  { key: "product", label: "Sản phẩm" },
  { key: "statistics", label: "Thống kê" },
  { key: "user", label: "Người dùng" },
];

const Decentralization = () => {
  // State management
  const [modalState, setModalState] = useState({
    isOpen: false,
    editingUser: null,
  });
  const [showPassword, setShowPassword] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redux selector
  const apikey = useSelector((state) => state.loginAdmin.apikey_dashboard);

  // Debounce utility function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // API calls
  const fetchAdmins = useCallback(
    async (search = "") => {
      try {
        setIsLoading(true);
        const response = await getdecentralization(apikey, search);
        setAdmins(response.data.admins);
      } catch (error) {
        toast.error("Lỗi tải dữ liệu!");
        console.error("Error fetching admins:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [apikey]
  );

  const deleteAdmin = async (userId) => {
    try {
      const result = await decentralizationDelete(userId);
      if (result.success) {
        toast.success("Xóa thành công!");
        fetchAdmins(searchTerm);
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      toast.error("Lỗi xóa!");
      console.error("Error deleting admin:", error);
    }
  };

  // Event handlers
  const debouncedSearch = useCallback(
    debounce((value) => fetchAdmins(value), 500),
    [fetchAdmins]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleModalOpen = (admin = null) => {
    setModalState({
      isOpen: true,
      editingUser: admin,
    });
  };

  const handleModalClose = () => {
    setModalState({
      isOpen: false,
      editingUser: null,
    });
  };

  const handleDelete = (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      toast.dismiss();
      deleteAdmin(userId);
    }
  };

  const togglePasswordVisibility = (adminId) => {
    setShowPassword(showPassword === adminId ? null : adminId);
  };

  // Effects
  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // Component renders
  const renderHeader = () => (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h1 className="text-xl md:text-2xl font-bold">Quản lý Phân quyền</h1>
      <button
        onClick={() => handleModalOpen()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
      >
        <HiPlus className="text-xl" /> Add Product
      </button>
    </div>
  );

  const renderSearchBar = () => (
    <div className="flex items-center gap-2 mb-6 p-4 bg-white rounded-lg shadow">
      <div className="relative flex-grow">
        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Tìm tài khoản..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <button
        onClick={() => fetchAdmins(searchTerm)}
        className="p-2 hover:bg-gray-100 rounded-lg"
        title="Refresh"
      >
        <BiRefresh className="text-xl text-gray-600" />
      </button>
    </div>
  );

  const renderPermissions = (admin) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {PERMISSIONS.map(({ key, label }) => (
        <div key={key} className="flex items-center">
          <span
            className={`w-3 h-3 rounded-full mr-2 ${
              admin[key] ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );

  const renderTableRow = (admin, index) => (
    <tr key={admin.id} className="hover:bg-gray-50">
      <td className="px-4 py-3 whitespace-nowrap text-sm">{index + 1}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm">{admin.username}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm">{admin.email}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm">
        <div className="flex items-center">
          <span>{showPassword === admin.id ? admin.password : "••••••••"}</span>
          <button
            onClick={() => togglePasswordVisibility(admin.id)}
            className="ml-2 hover:text-blue-900"
          >
            {showPassword === admin.id ? (
              <BiSolidHide size={20} />
            ) : (
              <BiSolidShow size={20} />
            )}
          </button>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm">{admin.time}</td>
      <td className="px-4 py-3 text-sm">{renderPermissions(admin)}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm">{admin.note}</td>
      <td className="px-4 py-3 whitespace-nowrap text-sm">
        <div className="flex gap-2">
          <button
            onClick={() => handleModalOpen(admin)}
            className="text-blue-600 hover:text-blue-900"
          >
            <HiPencilAlt className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleDelete(admin.id)}
            className="text-red-600 hover:text-red-900"
          >
            <HiTrash className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );

  const renderTable = () => (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            {[
              "ID",
              "Tên",
              "Email",
              "Mật khẩu",
              "Thời gian",
              "Quyền hạn",
              "Note",
              "Thao tác",
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {admins.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-10">
                {searchTerm
                  ? "Không tìm thấy kết quả"
                  : "Chưa có tài khoản nào"}
              </td>
            </tr>
          ) : (
            admins.map((admin, index) => renderTableRow(admin, index))
          )}
        </tbody>
      </table>
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      {renderHeader()}
      {renderSearchBar()}
      {renderTable()}
      {modalState.isOpen && (
        <ModelDecentralization
          user={modalState.editingUser}
          onClose={handleModalClose}
          refetch={() => fetchAdmins(searchTerm)}
        />
      )}
    </div>
  );
};

export default Decentralization;
