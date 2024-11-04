// OrdersChart.js
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const OrdersChart = () => {
  const data = [
    { name: "T1", orders: 40 },
    { name: "T2", orders: 30 },
    { name: "T3", orders: 20 },
    { name: "T4", orders: 27 },
    { name: "T5", orders: 18 },
    { name: "T6", orders: 23 },
    { name: "T7", orders: 34 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Thống Kê Đơn Hàng</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersChart;
