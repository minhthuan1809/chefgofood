import { toast } from "react-toastify";
import { updateStatusOrder } from "../../service/server/oder";

export default function Model_Cancel({ isOpen, onClose, order_id }) {
  if (!isOpen) return null;
  const handleCancelOrder = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?"))
      return;
    const result = await updateStatusOrder(order_id, "Cancel");
    console.log(result);
    if (!result.ok) {
      toast.error("Hủy đơn hàng thất bại");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-xl z-10 w-[500px]">
        <h2 className="text-2xl font-bold mb-4">Xác nhận hủy đơn hàng</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Lý do hủy đơn:
          </label>
          <select className="w-full p-2 border rounded">
            <option value="">-- Chọn lý do --</option>
            <option value="wrong_address">Địa chỉ không chính xác</option>
            <option value="change_mind">Đổi ý không muốn mua nữa</option>
            <option value="wrong_item">Đặt nhầm món</option>
            <option value="other">Lý do khác</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Ghi chú thêm:
          </label>
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Nhập ghi chú thêm nếu có..."
          ></textarea>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleCancelOrder}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Xác nhận hủy đơn
          </button>
        </div>
      </div>
    </div>
  );
}
