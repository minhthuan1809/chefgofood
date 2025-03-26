import React, { useState, useEffect } from "react";
import { getDiscountUsed } from "../../../service/dashboard";
import { MdDiscount } from "react-icons/md";
export default function DiscountUsed() {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDiscountUsed();
      setDiscounts(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Mã giảm giá được dùng nhiều</h3>
      </div>

      <div className="space-y-4">
        {discounts.length > 0 ? (
          discounts.map((discount, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-lg">
                  <MdDiscount />
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{discount.code}</h4>
                    <p className="text-sm text-gray-500">
                      Đã sử dụng {discount.usage_count} lần
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            Không có dữ liệu mã giảm giá
          </div>
        )}
      </div>
    </div>
  );
}
