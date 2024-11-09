import { useEffect, useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { ConfirmOrder, detailOrder } from "../../../service/server/oder";
import OrderDetailModal from "../Modal_detail_oder/modal_oder";
import Loading from "../util/Loading";
import { BiRefresh } from "react-icons/bi";
import PaginationPage from "../util/PaginationPage";

export default function Oder() {
  const [orders, setOrders] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);

  const fetchOrders = async () => {
    const result = await ConfirmOrder(page, limit, searchTerm);
    if (result.ok) {
      let filteredOrders = result.data.orders;

      if (selectedStatus !== "all") {
        filteredOrders = filteredOrders.filter((order) => {
          const status = order.status.toLowerCase();
          switch (selectedStatus) {
            case "pending":
              return status === "pending";
            case "delivering":
              return status === "delivery";
            case "preparing":
              return status === "preparing";

            default:
              return true;
          }
        });
      }

      setOrders(filteredOrders);
      setTotalPages(result.data.pagination.total_pages);
    }
  };

  useEffect(() => {
    fetchOrders();
  });

  const handleViewDetail = async (order) => {
    const result = await detailOrder(order.id);
    if (result.ok) {
      setSelectedOrder(result.data);
      setShowOrderDetail(true);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setPage(1);
    setLimit(30);
    fetchOrders();
  };

  const handleCloseModal = () => {
    setShowOrderDetail(false);
  };

  if (!orders) return <Loading />;

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
        <button
          onClick={handleReset}
          className="px-4 py-2 border rounded hover:bg-gray-100 flex items-center gap-2"
        >
          <BiRefresh className="text-xl text-gray-500" />
        </button>
        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="all">Tất cả</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="preparing">Đang chuẩn bị</option>
            <option value="delivering">Đang giao hàng</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-500">Số lượng:</label>
          <select
            className="border rounded px-3 py-2 outline-none"
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value))}
          >
            {Array.from({ length: 100 }, (_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
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
                  {order.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.total_price.toLocaleString("vi-VN")}đ
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      order.status
                        .toLocaleLowerCase()
                        .replace("completed", "Hoàn thành")
                        .replace("pending", "Chờ xác nhận")
                        .replace("preparing", "Đang chuẩn bị")
                        .replace("delivery", "Đã giao")
                        .replace("cancel", "Đã hủy") === "Chờ xác nhận"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status
                            .toLocaleLowerCase()
                            .replace("completed", "Hoàn thành")
                            .replace("pending", "Chờ xác nhận")
                            .replace("preparing", "Đang chuẩn bị")
                            .replace("delivery", "Đã giao")
                            .replace("cancel", "Đã hủy") === "Đã giao"
                        ? "bg-green-100 text-green-800"
                        : order.status
                            .toLocaleLowerCase()
                            .replace("completed", "Hoàn thành")
                            .replace("pending", "Chờ xác nhận")
                            .replace("preparing", "Đang chuẩn bị")
                            .replace("delivery", "Đã giao")
                            .replace("cancel", "Đã hủy") === "Hoàn thành"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status
                      .toLocaleLowerCase()
                      .replace("completed", "Hoàn thành")
                      .replace("pending", "Chờ xác nhận")
                      .replace("preparing", "Đang chuẩn bị")
                      .replace("delivery", "Đang giao")
                      .replace("cancel", "Đã hủy")}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">btn</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showOrderDetail && selectedOrder && (
        <OrderDetailModal
          selectedOrder={selectedOrder}
          onClose={handleCloseModal}
        />
      )}
      {totalPages > 1 && (
        <PaginationPage count={totalPages} setPage={setPage} />
      )}
    </div>
  );
}
