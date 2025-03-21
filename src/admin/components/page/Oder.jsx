import { useEffect, useState } from "react";
import {
  ConfirmOrder,
  detailOrder,
  updateStatusOrder,
} from "../../../service/server/oder";
import OrderDetailModal from "../modal_detail_oder/_Modal_oder";
import Loading from "../util/Loading";
import PaginationPage from "../util/PaginationPage";

// Import icons from react-icons libraries
import { FaSearch, FaFilter } from "react-icons/fa";
import { BiRefresh, BiPackage } from "react-icons/bi";
import { AiOutlineEye, AiOutlineCheckCircle } from "react-icons/ai";
import { FiTruck, FiX } from "react-icons/fi";

export default function Order() {
  const [orders, setOrders] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
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
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, selectedStatus, searchTerm]);

  const handleViewDetail = async (order) => {
    setIsLoading(true);
    try {
      const result = await detailOrder(order.id);
      if (result.ok) {
        setSelectedOrder(result.data);
        setShowOrderDetail(true);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setPage(1);
    setLimit(30);
  };

  const handleUpdateStatus = async (order_id, status) => {
    setIsLoading(true);
    try {
      await updateStatusOrder(order_id, status);
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowOrderDetail(false);
  };

  const getStatusBadge = (status) => {
    const lowerStatus = status.toLowerCase();
    let displayText = "";
    let className = "";

    if (lowerStatus === "pending") {
      displayText = "Chờ xác nhận";
      className = "bg-amber-50 text-amber-700 border border-amber-200";
    } else if (lowerStatus === "preparing") {
      displayText = "Đang chuẩn bị";
      className = "bg-blue-50 text-blue-700 border border-blue-200";
    } else if (lowerStatus === "delivery") {
      displayText = "Đang giao";
      className = "bg-indigo-50 text-indigo-700 border border-indigo-200";
    } else if (lowerStatus === "completed") {
      displayText = "Hoàn thành";
      className = "bg-green-50 text-green-700 border border-green-200";
    } else if (lowerStatus === "cancel") {
      displayText = "Đã hủy";
      className = "bg-red-50 text-red-700 border border-red-200";
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${className}`}
      >
        {displayText}
      </span>
    );
  };

  if (isLoading && !orders) return <Loading />;

  return (
    <div className=" px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Quản lý đơn hàng
            </h1>

            <div className="flex items-center gap-2 self-end">
              <span className="text-sm text-gray-500">Số lượng:</span>
              <select
                className="border border-gray-200 rounded-md px-2 py-1 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-100"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
              >
                {[10, 20, 30, 50, 100].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Tìm kiếm đơn hàng theo mã hoặc tên khách hàng..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-3 text-gray-400">
                <FaSearch size={18} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex items-center min-w-[180px]">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaFilter size={16} />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                >
                  <option value="all">Tất cả</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="preparing">Đang chuẩn bị</option>
                  <option value="delivering">Đang giao hàng</option>
                </select>
              </div>

              <button
                onClick={handleReset}
                className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-100 flex items-center gap-2 transition-colors duration-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <BiRefresh size={16} className="text-gray-500" />
                <span className="text-gray-700">Đặt lại</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đặt
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {!orders || orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <p className="mt-2">Không có dữ liệu đơn hàng</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetail(order)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 transition-colors"
                      >
                        <AiOutlineEye size={16} />#{order.id}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                      {order.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {order.created_at}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                      {order.total_price.toLocaleString("vi-VN")}đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {/* Xác nhận */}
                        {order.status.toLowerCase() === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleUpdateStatus(order.id, "Preparing")
                              }
                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
                            >
                              <AiOutlineCheckCircle size={15} />
                              Xác nhận
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  confirm(
                                    "Bạn có chắc chắn muốn hủy đơn hàng này?"
                                  )
                                ) {
                                  handleUpdateStatus(order.id, "Cancel");
                                }
                              }}
                              className="bg-white border border-red-300 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
                            >
                              <FiX size={15} />
                              Hủy
                            </button>
                          </>
                        )}

                        {/* Chuẩn bị xong */}
                        {order.status.toLowerCase() === "preparing" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(order.id, "Delivery")
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
                          >
                            <BiPackage size={15} />
                            Chuẩn bị xong
                          </button>
                        )}

                        {/* Giao hàng thành công */}
                        {order.status.toLowerCase() === "delivery" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(order.id, "Completed")
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors"
                          >
                            <FiTruck size={15} />
                            Giao thành công
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <PaginationPage count={totalPages} setPage={setPage} />
          </div>
        )}
      </div>

      {showOrderDetail && selectedOrder && (
        <OrderDetailModal
          selectedOrder={selectedOrder}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
