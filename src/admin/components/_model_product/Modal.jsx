/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { productUpdateAdmin } from "../../../service/server/product/update_product";
import { toast } from "react-toastify";
import { productCreateAdmin } from "../../../service/server/product/create_product";

const Modal = ({ isOpen, onClose, editData, fetchData }) => {
  if (!isOpen) return null;

  const isEdit = Boolean(editData);
  const title = isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm mới";
  const buttonText = isEdit ? "Cập nhật" : "Thêm sản phẩm";

  // Initialize form fields
  const [name, setName] = useState(editData?.name || "");
  const [id] = useState(editData?.id || "");
  const [imageUrl, setImageUrl] = useState(editData?.image_url || "");
  const [price, setPrice] = useState(editData?.price || "");
  const [quantity, setQuantity] = useState(editData?.quantity || "");
  const [type, setType] = useState(editData?.type || "water");
  const [lock, setLock] = useState(editData?.lock ?? false);
  const [description, setDescription] = useState(editData?.description || "");
  const [discount, setDiscount] = useState(editData?.discount || ""); // Discount field
  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      id,
      name,
      image_url: imageUrl,
      price,
      quantity,
      type,
      lock,
      description,
      discount,
    };
    isEdit ? handleEditProduct(productData) : handleAddProduct(productData);
  };

  const handleEditProduct = async (productData) => {
    const result = await productUpdateAdmin(id, productData);
    if (!result.ok) {
      toast.error(result.message);
    } else {
      fetchData();
      toast.success(result.message);
      onClose();
    }
  };

  const handleAddProduct = async (productData) => {
    const result = await productCreateAdmin(productData);
    if (!result.ok) {
      toast.error(result.message);
    } else {
      fetchData();
      toast.success(result.message);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-700">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                URL Hình ảnh <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập URL hình ảnh"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Giá <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded pr-12"
                  placeholder="Nhập giá"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <span className="absolute right-3 top-2 text-gray-500">
                  VNĐ
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Số lượng <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập số lượng"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Loại sản phẩm
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="water">Nước uống</option>
                <option value="cake">Bánh</option>
                <option value="food">Đồ ăn</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Giảm giá
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập % giảm giá"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="lock"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                  checked={lock}
                  onChange={(e) => setLock(e.target.checked)}
                />
                <label
                  htmlFor="lock"
                  className="text-sm font-medium text-gray-700"
                >
                  Khóa sản phẩm
                </label>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Mô tả <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập mô tả sản phẩm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
