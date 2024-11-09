/* eslint-disable react/prop-types */
import { useState } from "react";
import { decentralizationCreate } from "../../../service/server/decentralization/create";
import { toast } from "react-toastify";
import { IoIosCreate } from "react-icons/io";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { decentralizationUpdate } from "../../../service/server/decentralization/update";
import { TiDeleteOutline } from "react-icons/ti";

const ModelDecentralization = ({ user, onClose, refetch }) => {
  const generateRandomPassword = () => {
    const length = 8;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const [formData, setFormData] = useState({
    username: user ? user.username : "",
    email: user ? user.email : "",
    password: user ? user.password : generateRandomPassword(),
    permissions: {
      decentralization: user ? user.decentralization : false,
      discount: user ? user.discount : false,
      layout: user ? user.layout : false,
      mess: user ? user.mess : false,
      order: user ? user.order : false,
      product: user ? user.product : false,
      statistics: user ? user.statistics : false,
      review: user ? user.review : false,
      user: user ? user.user : false,
    },
    note: user ? user.note : "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      tempErrors.username = "Tên người dùng không được để trống";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email không được để trống";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Email không đúng định dạng";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Mật khẩu phải chứa ít nhất 6 ký tự";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      // Xóa lỗi khi người dùng bắt đầu nhập
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  // Hàm tạo mới người dùng
  const handleCreate = async (e) => {
    e.preventDefault();
    toast.dismiss();
    if (validateForm()) {
      const result = await decentralizationCreate(formData);
      if (result.success) {
        toast.success(result.message);
        refetch();
        onClose();
      } else {
        toast.error(result.message);
      }
    }
  };
  //hàm cập nhật người dùng
  const handleUpdate = async (e) => {
    e.preventDefault();
    toast.dismiss();
    const result = await decentralizationUpdate(user.id, formData);
    if (result.success) {
      toast.success(result.message);
      refetch();
      onClose();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-none scrollbar-none">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">
            {user ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
          </h2>
          <TiDeleteOutline size={30} onClick={onClose} />
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tên người dùng
            </label>
            <input
              maxLength={50}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.username}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              maxLength={50}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mật khẩu
            </label>
            <div className="flex">
              <div className="relative flex-1">
                <input
                  maxLength={20}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <BiSolidHide size={20} />
                  ) : (
                    <BiSolidShow size={20} />
                  )}
                </button>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    password: generateRandomPassword(),
                  }))
                }
                className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
              >
                <IoIosCreate />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phân quyền
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="decentralization"
                  checked={formData.permissions.decentralization}
                  onChange={handleChange}
                  className="mr-2"
                />
                Phân quyền
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="discount"
                  checked={formData.permissions.discount}
                  onChange={handleChange}
                  className="mr-2"
                />
                Giảm giá
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="layout"
                  checked={formData.permissions.layout}
                  onChange={handleChange}
                  className="mr-2"
                />
                Giao diện
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="mess"
                  checked={formData.permissions.mess}
                  onChange={handleChange}
                  className="mr-2"
                />
                Tin nhắn
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="order"
                  checked={formData.permissions.order}
                  onChange={handleChange}
                  className="mr-2"
                />
                Đơn hàng
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="product"
                  checked={formData.permissions.product}
                  onChange={handleChange}
                  className="mr-2"
                />
                Sản phẩm
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="statistics"
                  checked={formData.permissions.statistics}
                  onChange={handleChange}
                  className="mr-2"
                />
                Thống kê
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="user"
                  checked={formData.permissions.user}
                  onChange={handleChange}
                  className="mr-2"
                />
                Người dùng
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="review"
                  checked={formData.permissions.review}
                  onChange={handleChange}
                  className="mr-2"
                />
                Đánh giá
              </label>
            </div>
            <div className="mt-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ghi chú
              </label>
              <textarea
                maxLength={30}
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            {user ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCreate}
              >
                Thêm mới
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModelDecentralization;
