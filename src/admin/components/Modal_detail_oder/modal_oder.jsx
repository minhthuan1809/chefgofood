/* eslint-disable react/prop-types */

export default function OrderDetailModal({ selectedOrder, onClose }) {
  console.log(selectedOrder);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <span
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></span>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Chi tiết đơn hàng #{selectedOrder.order_id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">Thông tin khách hàng</h3>
            <p>Tên: {selectedOrder?.username}</p>
            <p>Số điện thoại: {selectedOrder.shipping_info.phone}</p>
            <p>Địa chỉ: {selectedOrder.shipping_info.address}</p>
            <p>
              Ghi chú: {selectedOrder.shipping_info.note || "Không có ghi chú"}
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">Thông tin thanh toán</h3>
            <p>Mã giảm giá: {selectedOrder.discount.code}</p>
            <p>Phương thức: {selectedOrder.payment.payment_method}</p>
            <p>
              Trạng thái:{" "}
              {selectedOrder.payment.payment_status
                .replace("Completed", "Hoàn thành")
                .replace("Pending", "Chờ xác nhận")
                .replace("Preparing", "Đang chuẩn bị")
                .replace("Delivery", "Đang giao")
                .replace("Cancel", "Đã hủy")}
            </p>
            <p>Ngày thanh toán: {selectedOrder.payment.payment_date}</p>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">Sản phẩm</h3>
            <div className="space-y-2">
              {selectedOrder.products?.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{product.product_name}</p>
                    <p className="text-sm text-gray-500">
                      {product.quantity} x{" "}
                      {parseInt(product.price).toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <p className="font-medium">
                    {product.subtotal.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b pb-4">
            <div className="flex justify-between items-center font-bold mt-2">
              <p>Tổng cộng</p>
              <p>{selectedOrder.total_price.toLocaleString("vi-VN")}đ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
