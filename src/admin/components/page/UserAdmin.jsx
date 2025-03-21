import { useEffect, useState, useCallback, useMemo } from "react";
import { getUserAdmin } from "../../../service/server/user/useraAdmin";
import { deleteUser } from "../../../service/server/user/deleteUser";
import { toast } from "react-toastify";
import PaginationPage from "../util/PaginationPage";
import RenderUser from "../user/RenderUser";
import ModelAddEditUser from "../_model_user/ModelAddEditUser";
import ExcelUser from "../_model_user/ExcelUser";

// Icons
import {
  HiOutlineUserAdd,
  HiOutlineSearch,
  HiOutlineRefresh,
  HiOutlineFilter,
  HiOutlineDownload,
} from "react-icons/hi";

// Custom hook for user management
function useUserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    role: "all",
    sortBy: "newest",
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    toast.dismiss();
    try {
      const response = await getUserAdmin(searchTerm, limit, page);
      setTotalPages(response.data.pagination.total_pages);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      toast.error("Có lỗi xảy ra khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, limit, page]);

  const handleDeleteUser = useCallback(
    async (id) => {
      if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

      try {
        const response = await deleteUser(id);
        toast.dismiss();

        if (response.ok) {
          toast.success(response.message);
          fetchUsers();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        toast.error("Có lỗi xảy ra khi xóa người dùng");
      }
    },
    [fetchUsers]
  );

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setFilters({
      role: "all",
      sortBy: "newest",
    });
  }, []);

  const updateFilter = useCallback((type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Apply filters in memory
  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (filters.role !== "all") {
      result = result.filter((user) =>
        filters.role === "active" ? user.role === true : user.role === false
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return filters.sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [users, filters]);

  return {
    filteredUsers,
    searchTerm,
    setSearchTerm,
    limit,
    setLimit,
    totalPages,
    page,
    setPage,
    filters,
    updateFilter,
    resetFilters,
    handleDeleteUser,
    fetchUsers,
    loading,
  };
}

// Custom hook for modal management
function useModalManagement(fetchUsers) {
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: true,
    avata: "",
  });

  const openModal = useCallback((user = null) => {
    if (user) {
      setEditUser(user);
      setFormData({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        avata: user.avata,
      });
    } else {
      setEditUser(null);
      setFormData({
        username: "",
        email: "",
        password: "",
        role: true,
        avata: "",
      });
    }
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setEditUser(null);
  }, []);

  return {
    showModal,
    editUser,
    formData,
    setFormData,
    openModal,
    closeModal,
  };
}

// Main component
export default function UserAdmin() {
  const {
    filteredUsers,
    searchTerm,
    setSearchTerm,
    limit,
    setLimit,
    totalPages,
    page,
    setPage,
    filters,
    updateFilter,
    resetFilters,
    handleDeleteUser,
    fetchUsers,
    loading,
  } = useUserManagement();

  const { showModal, editUser, formData, setFormData, openModal, closeModal } =
    useModalManagement(fetchUsers);

  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className=" py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Quản lý người dùng
            </h1>
            <div className="flex space-x-3">
              <ExcelUser
                data={filteredUsers}
                fileName="Danh sách người dùng"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <HiOutlineDownload className="-ml-1 mr-2 h-5 w-5" />
                Xuất Excel
              </ExcelUser>
              <button
                onClick={() => openModal()}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <HiOutlineUserAdd className="-ml-1 mr-2 h-5 w-5" />
                Thêm người dùng
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4 flex items-center">
              <div className="relative flex-1 mr-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm người dùng..."
                  className="focus:ring-indigo-500 border-2 focus:border-indigo-500 block w-full pl-10 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={resetFilters}
                    className="pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    title="Reset tìm kiếm"
                  >
                    <HiOutlineRefresh className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowFilters(!showFilters)}
              >
                <HiOutlineFilter className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                Bộ lọc {showFilters ? "▲" : "▼"}
              </button>

              <div className="ml-6 flex items-center ">
                <span className="text-sm text-gray-500 mr-2 w-28">
                  Hiển thị:
                </span>
                <select
                  className="mt-1 border-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value))}
                >
                  {[10, 20, 30, 50, 100].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="role-filter"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Trạng thái
                  </label>
                  <select
                    id="role-filter"
                    className="mt-1 border-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={filters.role}
                    onChange={(e) => updateFilter("role", e.target.value)}
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="active">Đang hoạt động</option>
                    <option value="locked active">Đã khóa</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="sort-filter"
                    className="block text-sm font-medium text-gray-700 "
                  >
                    Sắp xếp theo
                  </label>
                  <select
                    id="sort-filter"
                    className="mt-1 border-2  block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={filters.sortBy}
                    onChange={(e) => updateFilter("sortBy", e.target.value)}
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {loading ? (
            <div className="p-6 text-center">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
              <p className="mt-4 text-gray-500">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      STT
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Hình ảnh
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Tên người dùng
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Trạng thái
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ngày tạo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    <RenderUser
                      data={filteredUsers}
                      handleDelete={handleDeleteUser}
                      handleEdit={openModal}
                    />
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-10 text-center text-sm text-gray-500"
                      >
                        Không tìm thấy dữ liệu người dùng nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6">
            <PaginationPage
              count={totalPages}
              setPage={setPage}
              currentPage={page}
            />
          </div>
        )}

        {/* Count Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Hiển thị {filteredUsers.length} trên tổng số {filteredUsers.length}{" "}
          người dùng
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ModelAddEditUser
          handleCloseModal={closeModal}
          editUser={editUser}
          formData={formData}
          setFormData={setFormData}
          fetchData={fetchUsers}
        />
      )}
    </div>
  );
}
