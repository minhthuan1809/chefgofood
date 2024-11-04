// RevenueChart.js
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = () => {
  const data = [
    { name: "T1", revenue: 4000 },
    { name: "T2", revenue: 3000 },
    { name: "T3", revenue: 5000 },
    { name: "T4", revenue: 2780 },
    { name: "T5", revenue: 1890 },
    { name: "T6", revenue: 2390 },
    { name: "T7", revenue: 3490 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Biểu Đồ Doanh Thu</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
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
