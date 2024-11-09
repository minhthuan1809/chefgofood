import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

export default function Oder() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "Nguyễn Văn A",
      orderDate: "2024-01-15",
      total: 1500000,
      status: "Chờ xác nhận",
      items: [
        {
          name: "Sản phẩm 1",
          quantity: 2,
          price: 500000,
        },
        {
          name: "Sản phẩm 2",
          quantity: 1,
          price: 500000,
        },
      ],
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleConfirmOrder = (orderId) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: "Đang giao hàng" };
        }
        return order;
      })
    );
  };

  const handleDelivery = (orderId) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: "Đang giao hàng" };
        }
        return order;
      })
    );
  };

  const handleComplete = (orderId) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: "Hoàn thành" };
        }
        return order;
      })
    );
  };

  const handleCancelOrder = (orderId) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: "Đã hủy" };
        }
        return order;
      })
    );
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="all">Tất cả</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="making">Đang làm đồ</option>
            <option value="made">Đã làm xong</option>
            <option value="delivering">Đang giao hàng</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã đơn hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày đặt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewDetail(order)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    #{order.id}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.total.toLocaleString("vi-VN")}đ
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      order.status === "Chờ xác nhận"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Đang làm đồ"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "Đã làm xong"
                        ? "bg-indigo-100 text-indigo-800"
                        : order.status === "Đang giao hàng"
                        ? "bg-purple-100 text-purple-800"
                        : order.status === "Hoàn thành"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    {order.status === "Chờ xác nhận" && (
                      <>
                        <button
                          onClick={() => handleConfirmOrder(order.id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Xác nhận
                        </button>
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Hủy
                        </button>
                      </>
                    )}

                    {order.status === "Đang giao hàng" && (
                      <button
                        onClick={() => handleComplete(order.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Hoàn thành
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Chi tiết đơn hàng */}
      {showOrderDetail && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Chi tiết đơn hàng #{selectedOrder.id}
              </h3>
              <button
                onClick={() => setShowOrderDetail(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Khách hàng:</p>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Ngày đặt:</p>
                  <p className="font-medium">{selectedOrder.orderDate}</p>
                </div>
                <div>
                  <p className="text-gray-600">Trạng thái:</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      selectedOrder.status === "Chờ xác nhận"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedOrder.status === "Đang làm đồ"
                        ? "bg-blue-100 text-blue-800"
                        : selectedOrder.status === "Đã làm xong"
                        ? "bg-indigo-100 text-indigo-800"
                        : selectedOrder.status === "Đang giao hàng"
                        ? "bg-purple-100 text-purple-800"
                        : selectedOrder.status === "Hoàn thành"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Danh sách sản phẩm</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-sm font-medium text-gray-500">
                          Sản phẩm
                        </th>
                        <th className="text-right text-sm font-medium text-gray-500">
                          Số lượng
                        </th>
                        <th className="text-right text-sm font-medium text-gray-500">
                          Đơn giá
                        </th>
                        <th className="text-right text-sm font-medium text-gray-500">
                          Thành tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="py-2">{item.name}</td>
                          <td className="text-right">{item.quantity}</td>
                          <td className="text-right">
                            {item.price.toLocaleString("vi-VN")}đ
                          </td>
                          <td className="text-right">
                            {(item.price * item.quantity).toLocaleString(
                              "vi-VN"
                            )}
                            đ
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tổng cộng:</span>
                  <span className="font-bold text-lg">
                    {selectedOrder.total.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowOrderDetail(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
