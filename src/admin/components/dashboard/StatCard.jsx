/* eslint-disable react/prop-types */
// StatCard.js
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const StatCard = ({ icon, label, value, color, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div
        className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}
      >
        {icon}
      </div>
      {trend && (
        <span
          className={`flex items-center ${
            trend > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend > 0 ? (
            <FiTrendingUp className="mr-1" />
          ) : (
            <FiTrendingDown className="mr-1" />
          )}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <h3 className="text-3xl font-bold mb-2">{value}</h3>
    <p className="text-gray-500">{label}</p>
  </div>
);

export default StatCard;
