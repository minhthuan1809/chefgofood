import React, { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { getDiscountHistoryRender } from "../../../service/server/discount/discount_history";
import { toast } from "react-toastify";
import PaginationPage from "../util/PaginationPage";
import OrderDetailModal from "../modal_detail_oder/Modal_oder";
import { detailOrder } from "../../../service/server/oder";
import ExcelHistoryDiscountUser from "../_history_distcount/ExcelHistoryDiscountUser";
export default function HistoryDiscount() {
  const [discountHistory, setDiscountHistory] = useState([]);
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [_detailOrder, setDetailOrder] = useState(false);
  const [dataDetailOrder, setDataDetailOrder] = useState(null);
  const fetchData = async () => {
    const result = await getDiscountHistoryRender(limit, page, searchTerm);
    console.log("result", result);
    if (result.ok) {
      let filteredData = result.data.discount_history;

      if (filterStatus !== "all") {
        filteredData = filteredData.filter((item) => {
          const status = item.status.toLowerCase();
          switch (filterStatus) {
            case "pending":
              return status === "pending";
            case "cancel":
              return status === "cancel";
          }
        });
      }

      setTotalPages(Math.ceil(filteredData.length / limit));
      setDiscountHistory(filteredData);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, limit, page, filterStatus]);

  const handleDetailOder = async (order_id) => {
    const data = await detailOrder(order_id);

    setDataDetailOrder(data.data);
    setDetailOrder((prev) => !prev);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setPage(1);
    setLimit(30);
    setFilterStatus("all");
    fetchData();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MdDiscount className="text-blue-600" />
          Lịch sử sử dụng mã giảm giá
        </h1>
        <ExcelHistoryDiscountUser data={discountHistory} />
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo mã giảm giá hoặc email..."
              className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            className="px-4 py-2 border rounded hover:bg-gray-100"
            onClick={handleRefresh}
          >
            <BiRefresh className="text-xl text-gray-500" />
          </button>
          <select
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Hoàn thành</option>
            <option value="cancel">Hủy</option>
          </select>
          <div className="flex items-center gap-2">
            <label className="text-gray-500">Số lượng:</label>
            <select
              className="border rounded px-3 py-2 outline-none"
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
            >
              {Array.from({ length: 100 }, (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã giảm giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã đơn hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phần trăm giảm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian sử dụng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {discountHistory.map((item, index) => (
              <tr key={index}>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer hover:text-blue-600 hover:underline"
                  onClick={() => {
                    const text = item.discount_code;
                    navigator.clipboard.writeText(text);
                    toast.success("Đã copy mã giảm giá");
                  }}
                >
                  {item.discount_code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                    onClick={() => {
                      handleDetailOder(item.order_id);
                    }}
                  >
                    #{item.order_id}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.discount_percent}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.datetime}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item?.status?.toLowerCase().replace("cancel", "Hủy") ===
                      "Hủy"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item?.status
                      .replace("Cancel", "Hủy")
                      .replace("Completed", "Hoàn thành") || ""}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {_detailOrder && (
          <OrderDetailModal
            selectedOrder={dataDetailOrder}
            onClose={() => setDetailOrder((prev) => !prev)}
          />
        )}
        {totalPages > 1 && (
          <PaginationPage count={totalPages} setPage={setPage} />
        )}
      </div>
    </div>
  );
}
