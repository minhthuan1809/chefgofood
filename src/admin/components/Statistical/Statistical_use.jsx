import { useContext, useEffect, useState } from "react";
import { getStatisticalUser } from "../../../service/server/statistical_api";
import Loading from "../../components/util/Loading";
import { StatisticalSearchQuantity } from "../page/Statistical";
import PaginationPage from "../util/PaginationPage";
import ExcelStatisticalUser from "./ExcelStatisticalUser";

export default function StatisticalUse() {
  const [data, setData] = useState([]);
  const [dayStart, setDayStart] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { search, quantity } = useContext(StatisticalSearchQuantity);
  const [dayEnd, setDayEnd] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // run
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getStatisticalUser(
        dayStart,
        dayEnd,
        page,
        quantity,
        search
      );
      setData(fetchedData ? fetchedData.users : []);
      setTotalPage(fetchedData.pagination.total_pages);
    };

    fetchData();
  }, [dayStart, dayEnd, quantity, search, page]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="p-1">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <p className="text-gray-500">Ngày bắt đầu:</p>
          <input
            value={dayStart}
            onChange={(e) => setDayStart(e.target.value)}
            type="date"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p className="text-gray-500">Ngày kết thúc:</p>
          <input
            value={dayEnd}
            onChange={(e) => setDayEnd(e.target.value)}
            type="date"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <ExcelStatisticalUser data={data} />
      </div>
      {data.length < 1 ? (
        <span>Không có dữ liệu</span>
      ) : (
        // Table
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gmail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên người dùng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng chi tiêu
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item?.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.total_orders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.total_spent.toLocaleString("vi-VN") + " VNĐ"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPage > 1 && (
            <PaginationPage count={totalPage} setPage={setPage} />
          )}
        </div>
      )}
    </div>
  );
}
