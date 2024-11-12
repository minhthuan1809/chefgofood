/* eslint-disable react/prop-types */
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
import { getOrdersChart } from "../../../service/dashboard";
import { useEffect, useState } from "react";

const OrdersChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getOrdersChart();
      const formattedData = [
        { name: "Thứ 2", orders: result.data[0].orders },
        { name: "Thứ 3", orders: result.data[1].orders },
        { name: "Thứ 4", orders: result.data[2].orders },
        { name: "Thứ 5", orders: result.data[3].orders },
        { name: "Thứ 6", orders: result.data[4].orders },
        { name: "Thứ 7", orders: result.data[5].orders },
        { name: "Chủ nhật", orders: result.data[6].orders },
      ];
      setData(formattedData);
    };
    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-semibold">{label}</p>
          <p>Số đơn hàng: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Thống Kê Đơn Hàng</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="orders" name="Số đơn hàng" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersChart;
