/* eslint-disable react/prop-types */

export function EditModal({
  isOpen,
  onClose,
  editInfo,
  handleChange,
  isEditing,
  onClickCreate,
  onClickSave,
  errors,
}) {
  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose(); // Đóng modal khi nhấn "Escape"
    }
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của form
      if (isEditing) {
        onClickSave(); // Gọi hàm lưu nếu đang chỉnh sửa
      } else {
        onClickCreate(); // Gọi hàm thêm nếu đang tạo mới
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          {isEditing ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Tên gợi nhớ:</label>
          <input
            maxLength={255}
            name="note"
            value={editInfo.note || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Thêm xử lý phím cho trường này
            className="border p-2 w-full rounded"
            placeholder="Nhập tên gợi nhớ"
          />
          {errors.note && <p className="text-red-500">{errors.note}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Địa chỉ:</label>
          <input
            maxLength={255}
            name="address"
            value={editInfo.address || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Thêm xử lý phím cho trường này
            className="border p-2 w-full rounded"
            placeholder="Nhập địa chỉ"
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Số điện thoại:</label>
          <input
            maxLength={15}
            name="phone"
            type="number"
            value={editInfo.phone || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Thêm xử lý phím cho trường này
            className="border p-2 w-full rounded"
            placeholder="Nhập số điện thoại"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-[#b17741] text-white rounded-lg hover:bg-[#b17741]"
            onClick={isEditing ? onClickSave : onClickCreate}
          >
            {isEditing ? "Lưu" : "Thêm"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
