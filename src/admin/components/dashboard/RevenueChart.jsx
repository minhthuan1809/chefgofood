// RevenueChart.js
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getRevenueChart } from "../../../service/dashboard";
import { useEffect, useState } from "react";

const RevenueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRevenueChart();

      if (result?.data) {
        const formattedData = [
          { name: "Thứ 2", revenue: result.data[0].revenue },
          { name: "Thứ 3", revenue: result.data[1].revenue },
          { name: "Thứ 4", revenue: result.data[2].revenue },
          { name: "Thứ 5", revenue: result.data[3].revenue },
          { name: "Thứ 6", revenue: result.data[4].revenue },
          { name: "Thứ 7", revenue: result.data[5].revenue },
          { name: "Chủ nhật", revenue: result.data[6].revenue },
        ];
        setData(formattedData);
      }
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-semibold">{label}</p>
          <p>Doanh thu: {payload[0].value.toLocaleString("vi-VN")} VNĐ</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Biểu Đồ Doanh Thu</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Doanh thu"
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
