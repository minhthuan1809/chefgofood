/* eslint-disable react/prop-types */
import { TiDeleteOutline } from "react-icons/ti";
import { addUser } from "../../../service/server/user/addUser";
import { toast } from "react-toastify";
import { updateUser } from "../../../service/server/user/UpdateUser";
import { useState } from "react";

export default function ModelAddEditUser({
  handleCloseModal,
  editUser,
  formData,
  setFormData,
  fetchData,
}) {
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Kiểm tra username
    if (!formData.username.trim()) {
      tempErrors.username = "Tên người dùng không được để trống";
      isValid = false;
    } else if (!formData.username.includes(" ")) {
      tempErrors.username = "Vui lòng nhập đủ 2 chữ cái";
      isValid = false;
    }

    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = "Email không được để trống";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    // Kiểm tra password
    if (!formData.password) {
      tempErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      isValid = false;
    } else if (formData.password.includes(" ")) {
      tempErrors.password = "Mật khẩu không được có khoảng trắng";
      isValid = false;
    }
    setErrors(tempErrors);
    console.log(tempErrors);

    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Xóa thông báo lỗi khi người dùng bắt đầu nhập
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    toast.dismiss();
    const data = await updateUser(editUser.id, formData);
    fetchData();
    if (data.ok) {
      handleCloseModal();
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    toast.dismiss();
    const data = await addUser(formData);
    fetchData();
    if (data.ok) {
      handleCloseModal();
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div>
      {" "}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {editUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
            </h2>
            <button onClick={handleCloseModal}>
              <TiDeleteOutline size={30} />
            </button>
          </div>

          <form>
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={formData.avata}
                  alt={formData.username}
                  className="w-20 h-20 object-cover rounded-full border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tên người dùng
                </label>
                <input
                  maxLength={40}
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${
                    errors.username ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  required={!editUser}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              {editUser && (
                <div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      URL Ảnh đại diện
                    </label>
                    <input
                      type="text"
                      name="avata"
                      value={formData.avata}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="role"
                      checked={formData.role}
                      onChange={handleInputChange}
                      id="roleCheckbox"
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor="roleCheckbox"
                      className="text-sm p-3 cursor-pointer"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, role: !prev.role }));
                      }}
                    >
                      {formData.role ? "Khóa" : "Hoạt động"}
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={editUser ? handleEditUser : handleAddUser}
              >
                {editUser ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
