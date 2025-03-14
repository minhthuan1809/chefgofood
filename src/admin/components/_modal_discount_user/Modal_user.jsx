/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { createDiscountUser } from "../../../service/server/discount/discount_system_create_user";
import { getDiscountUserById } from "../../../service/server/discount/discount_system_update";

const Modal_user = ({ isOpen, onClose, editData, fetchData }) => {
  // Return null early if modal is not open
  if (!isOpen) return null;

  // Move state declarations outside of conditional
  const [code, setCode] = useState(editData?.code || "");
  const [id] = useState(editData?.id || "");
  const [email, setEmail] = useState(editData?.email || "");
  const [name, setName] = useState(editData?.name || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [discountPercent, setDiscountPercent] = useState(
    editData?.discount_percent || ""
  );
  const [minimumPrice, setMinimumPrice] = useState(
    editData?.minimum_price || ""
  );
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [status, setStatus] = useState(editData?.status || false);
  const [isLoading, setIsLoading] = useState(false);

  const isEdit = Boolean(editData);
  const title = isEdit ? "Sửa mã giảm giá" : "Thêm mã giảm giá mới";
  const buttonText = isEdit ? "Cập nhật" : "Thêm mã giảm giá";

  useEffect(() => {
    if (editData) {
      // Format dates from ISO string to YYYY-MM-DD
      const fromDate = editData.valid_from
        ? new Date(editData.valid_from).toISOString().split("T")[0]
        : "";
      const toDate = editData.valid_to
        ? new Date(editData.valid_to).toISOString().split("T")[0]
        : "";

      setValidFrom(fromDate);
      setValidTo(toDate);
    }
  }, [editData]);

  const resetForm = () => {
    setCode("");
    setEmail("");
    setName("");
    setDescription("");
    setDiscountPercent("");
    setMinimumPrice("");
    setValidFrom("");
    setValidTo("");
    setStatus(false);
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const discountData = {
      id,
      code,
      email,
      name,
      description,
      discount_percent: discountPercent,
      minimum_price: minimumPrice,
      valid_from: validFrom,
      valid_to: validTo,
      status,
    };
    isEdit ? handleEditDiscount(discountData) : handleAddDiscount(discountData);
  };

  const handleEditDiscount = async (discountData) => {
    try {
      const res = await getDiscountUserById(id, discountData);
      toast.success(res.message);
      resetForm();
      fetchData();
      onClose();
    } catch (error) {
      toast.error("Lỗi khi cập nhật mã giảm giá");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDiscount = async (discountData) => {
    toast.dismiss();
    const res = await createDiscountUser(discountData);
    if (res.ok) {
      toast.success(res.message);
      resetForm();
      fetchData();
      onClose();
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
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
            {editData && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mã giảm giá <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Nhập mã giảm giá"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tên mã giảm giá <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập tên mã giảm giá"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phần trăm giảm giá <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập % giảm giá"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Đơn hàng tối thiểu <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập giá trị tối thiểu"
                value={minimumPrice}
                onChange={(e) => setMinimumPrice(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Thời gian <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={validFrom}
                  onChange={(e) => setValidFrom(e.target.value)}
                  required
                />
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={validTo}
                  onChange={(e) => setValidTo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Trạng thái
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">
                  {!status ? "Đang hoạt động" : "Tạm dừng"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập mô tả mã giảm giá"
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
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                buttonText
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal_user;
