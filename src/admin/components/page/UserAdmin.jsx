import { useEffect, useState, useCallback } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { getUserAdmin } from "../../../service/server/user/useraAdmin";
import PaginationPage from "../util/PaginationPage";
import { deleteUser } from "../../../service/server/user/deleteUser";
import { toast } from "react-toastify";
import RenderUser from "../user/RenderUser";
import ModelAddEditUser from "../_model_user/ModelAddEditUser";
import ExcelUser from "../_model_user/ExcelUser";
export default function UserAdmin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(30);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    role: "all",
    sortBy: "newest",
  });
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: true,
    avata: "",
  });

  const handleOpenModal = (user = null) => {
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
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(null);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await getUserAdmin(searchTerm, limit, page);
      setTotalPages(response.data.pagination.total_pages);

      let filteredUsers = response.data.users;

      if (filters.role !== "all") {
        filteredUsers = filteredUsers.filter((user) =>
          filters.role === "active" ? user.role === true : user.role === false
        );
      }

      filteredUsers.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return filters.sortBy === "newest" ? dateB - dateA : dateA - dateB;
      });

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      toast.error("Có lỗi xảy ra khi tải dữ liệu");
    }
  }, [searchTerm, limit, page, filters]);

  const handleRefresh = useCallback(() => {
    setSearchTerm("");
    setFilters({
      role: "all",
      sortBy: "newest",
    });
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(
    async (id) => {
      if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

      try {
        const response = await deleteUser(id);
        toast.dismiss();

        if (response.ok) {
          toast.success(response.message);
          fetchData();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        toast.error("Có lỗi xảy ra khi xóa người dùng");
      }
    },
    [fetchData]
  );

  const handleFilterChange = useCallback((type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-6 mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">
            Quản lý người dùng
          </h2>
          <div className="flex items-center gap-2">
            {" "}
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <FaPlus className="mr-2" />
              Thêm Người Dùng
            </button>
            <ExcelUser data={users} fileName="Danh sách người dùng" />
          </div>
        </div>

        <div className="p-4">
          <div className="mb-6 flex gap-4 items-center flex-wrap">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleRefresh}
            >
              <BiRefresh className="text-gray-600" />
            </button>
            <select
              className="border border-gray-300 rounded px-3 py-2 outline-none"
              value={filters.role}
              onChange={(e) => handleFilterChange("role", e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="locked active">Đã khóa</option>
            </select>

            <select
              className="border border-gray-300 rounded px-3 py-2 outline-none"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            >
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
            </select>

            <div className="flex items-center gap-2">
              <label className="text-gray-500">Hiển thị:</label>
              <select
                className="border border-gray-300 rounded px-3 py-2 outline-none"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3">STT</th>
                  <th className="p-3">Hình ảnh</th>
                  <th className="p-3">Tên người dùng</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Mật khẩu</th>
                  <th className="p-3 text-center">Trạng thái</th>
                  <th className="p-3 text-center">Ngày tạo</th>
                  <th className="p-3 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <RenderUser
                  data={users}
                  handleDelete={handleDelete}
                  handleEdit={handleOpenModal}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {totalPages > 1 && (
        <PaginationPage count={totalPages} setPage={setPage} />
      )}

      {showModal && (
        <ModelAddEditUser
          handleCloseModal={handleCloseModal}
          editUser={editUser}
          formData={formData}
          setFormData={setFormData}
          fetchData={fetchData}
        />
      )}
    </div>
  );
}
