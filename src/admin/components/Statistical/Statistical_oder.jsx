import React from "react";
import { FaFileExcel, FaEye, FaChartLine } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";

export default function Statistical_oder() {
  // Fake data for orders
  const orders = [
    {
      id: "DH001",
      customerName: "Nguyễn Văn A",
      date: "2024-11-13",
      total: 1500000,
      status: "Đã thanh toán",
      items: 3,
    },
    {
      id: "DH002",
      customerName: "Trần Thị B",
      date: "2024-11-13",
      total: 2300000,
      status: "Chờ xử lý",
      items: 5,
    },
    {
      id: "DH003",
      customerName: "Lê Văn C",
      date: "2024-11-12",
      total: 800000,
      status: "Đã thanh toán",
      items: 2,
    },
    {
      id: "DH004",
      customerName: "Phạm Thị D",
      date: "2024-11-12",
      total: 3100000,
      status: "Đã hủy",
      items: 7,
    },
  ];

  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã thanh toán":
        return "text-green-500";
      case "Chờ xử lý":
        return "text-yellow-500";
      case "Đã hủy":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="p-4">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <p className="text-gray-500">Thời Gian:</p>
          <input
            type="date"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2">
          <FaFileExcel className="text-xl" />
          Xuất Excel
        </button>
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Tổng đơn hàng</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <MdPendingActions className="text-blue-500 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Đơn thành công</p>
              <p className="text-2xl font-bold">
                {
                  orders.filter((order) => order.status === "Đã thanh toán")
                    .length
                }
              </p>
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
                {formatCurrency(
                  orders.reduce((acc, order) => acc + order.total, 0)
                )}
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
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.items}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                    title="Xem hóa đơn"
                  >
                    <FaEye className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
