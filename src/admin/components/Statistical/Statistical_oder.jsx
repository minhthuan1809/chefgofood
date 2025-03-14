import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { getStatisticalOrder } from "../../../service/server/statistical_api";
import Loading from "../util/Loading";
import { StatisticalSearchQuantity } from "../page/Statistical";
import PaginationPage from "../util/PaginationPage";
import ExcelStatisticalOder from "./ExcelStatisticalOder";
import OrderDetailModal from "../modal_detail_oder/_Modal_oder";
import { detailOrder } from "../../../service/server/oder";

export default function Statistical_oder() {
  const [orders, setOrders] = useState([]);
  const [overview, setOverview] = useState({});
  const { search, quantity } = useContext(StatisticalSearchQuantity);
  const [dayStart, setDayStart] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dayEnd, setDayEnd] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Cancel":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getStatisticalOrder(
        dayStart,
        dayEnd,
        page,
        quantity,
        search
      );
      setOrders(fetchedData.orders);
      setOverview(fetchedData.overview);
      setTotalPage(fetchedData.pagination.total_pages);
      console.log(fetchedData);
    };

    fetchData();
  }, [dayStart, dayEnd, quantity, search, page]);

  const handleViewDetail = async (order_id) => {
    const result = await detailOrder(order_id);
    if (result.ok) {
      setSelectedOrder(result.data);
      setShowOrderDetail(true);
    }
  };
  if (!orders || !overview) return <Loading />;
  return (
    <div className="p-4">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <p className="text-gray-500">Thời Gian:</p>
          <input
            value={dayStart}
            onChange={(e) => setDayStart(e.target.value)}
            type="date"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            value={dayEnd}
            onChange={(e) => setDayEnd(e.target.value)}
            type="date"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <ExcelStatisticalOder data={orders} />
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Tổng đơn hàng</p>
              <p className="text-2xl font-bold">{overview.total_orders}</p>
            </div>
            <div className="bg-blue-600 p-3 rounded-full">
              <MdPendingActions className="text-blue-600 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Đơn thành công</p>
              <p className="text-2xl font-bold">{overview.completed_orders}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <AiOutlineCheckCircle className="text-green-500 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Tổng doanh thu</p>
              <p className="text-2xl font-bold">
                {formatCurrency(overview.total_revenue)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <BsCashCoin className="text-purple-500 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                STT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Mã ĐH
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ngày đặt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Số SP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders === "" || orders === null || orders.length < 1 ? (
              <div className="w-full h-full p-4">
                <span className="m-auto">chưa chưa có đơn hàng nào</span>
              </div>
            ) : (
              orders.map((order, index) => (
                <>
                  <tr key={order.order_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-blue-600 hover:text-blue-600 cursor-pointer hover:underline"
                      onClick={() => handleViewDetail(order.order_id)}
                    >
                      #{order.order_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.customer_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.order_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.total_items}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(order.total_price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`${getStatusColor(order.status)}`}>
                        {order.status
                          .replace("Completed", "Thành công")
                          .replace("Cancel", "Đã hủy")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-blue-600 hover:text-blue-600 focus:outline-none"
                        title="Xem hóa đơn"
                        onClick={() => handleViewDetail(order.order_id)}
                      >
                        <FaEye className="text-xl" />
                      </button>
                    </td>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
        {showOrderDetail && (
          <OrderDetailModal
            selectedOrder={selectedOrder}
            onClose={() => setShowOrderDetail(false)}
          />
        )}
        {totalPage > 1 && (
          <PaginationPage count={totalPage} setPage={setPage} />
        )}
      </div>
    </div>
  );
}
