/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function DiscountCard({
  name,
  discount_percent,
  minimum_price,
  days_remaining,
}) {
  const navigator = useNavigate();
  const apiKey = useSelector((state) => state.login.apikey);

  const handleUse = () => {
    toast.dismiss();
    if (!apiKey && apiKey !== Array) {
      toast.info("Bạn cần đăng nhập để dùng tính năng này !");
    } else {
      navigator("/food");
    }
  };

  if (days_remaining <= 0) return null;

  // Giới hạn độ dài tên nếu quá dài
  const truncatedName = name.length > 25 ? name.substring(0, 25) + "..." : name;

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3
              className="text-lg font-semibold text-gray-800 line-clamp-1"
              title={name}
            >
              {truncatedName}
            </h3>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
              -{discount_percent}%
            </span>
          </div>
          <div className="flex items-center text-gray-600 text-sm mb-2 bg-gray-50 p-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-[#b17741]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Đơn tối thiểu {parseInt(minimum_price).toLocaleString()}₫
            </span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-[#b17741]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Còn {days_remaining} ngày</span>
          </div>
        </div>
        <button
          className="w-full py-3 bg-[#b17741] text-white font-medium hover:bg-[#a06835] transition duration-300 flex items-center justify-center gap-2"
          onClick={handleUse}
        >
          Dùng ngay
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
