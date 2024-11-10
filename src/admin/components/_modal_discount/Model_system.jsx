/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUpdateDiscountSystem } from "../../../service/server/discount/update_system";
import { getCreateDiscountSystem } from "../../../service/server/discount/discounnt_system_create";

const DiscountModalSystem = ({ isOpen, onClose, discount, fetchData }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (discount) {
      setCode(discount.code || "");
      setName(discount.name || "");
      setDiscountPercent(discount.discount_percent || 0);
      setMinimumPrice(discount.minimum_price || 0);
      setQuantity(discount.quantity || 0);
      setValidFrom(discount.valid_from || "");
      setValidTo(discount.valid_to || "");
      setStatus(discount.status || false);
    }
  }, [discount]);

  if (!isOpen) return null;

  const data = {
    code: code.trim(),
    name: name.trim(),
    discount_percent: discountPercent,
    quantity: quantity,
    minimum_price: minimumPrice,
    valid_from: validFrom,
    valid_to: validTo,
    status: status,
  };

  const reset = () => {
    setCode("");
    setName("");
    setDiscountPercent(0);
    setMinimumPrice(0);
    setQuantity(0);
    setValidFrom("");
    setValidTo("");
    setStatus(false);
  };

  const handleUpdate = async () => {
    toast.dismiss();
    try {
      const result = await getUpdateDiscountSystem(data, discount.id);
      if (result.ok) {
        toast.success(result.message);
        onClose();
        reset();
        fetchData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi trong quá trình cập nhật.");
      console.error("Update error:", error);
    }
  };

  const handleCreate = async () => {
    toast.dismiss();
    try {
      const result = await getCreateDiscountSystem(data);
      if (result.ok) {
        toast.success(result.message);
        onClose();
        reset();
        fetchData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi trong quá trình tạo mã giảm giá.");
      console.error("Create error:", error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 grid grid-cols-2 gap-4">
            {discount && (
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mã giảm giá
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Tên mã giảm giá
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="discount-percent"
                className="block text-sm font-medium text-gray-700"
              >
                Giảm giá (%)
              </label>
              <input
                type="number"
                id="discount-percent"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="minimum-price"
                className="block text-sm font-medium text-gray-700"
              >
                Giá trị tối thiểu (VND)
              </label>
              <input
                type="number"
                id="minimum-price"
                value={minimumPrice}
                onChange={(e) => setMinimumPrice(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Số lượng
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="valid-from"
                className="block text-sm font-medium text-gray-700"
              >
                Ngày bắt đầu
              </label>
              <input
                type="date"
                id="valid-from"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="valid-to"
                className="block text-sm font-medium text-gray-700"
              >
                Ngày kết thúc
              </label>
              <input
                type="date"
                id="valid-to"
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="status"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
              <label htmlFor="status">{status ? "Khóa" : "Mở"}</label>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={discount ? handleUpdate : handleCreate}
            >
              {discount ? "Cập nhật" : "Tạo mới"}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountModalSystem;
