import React from "react";
import PropTypes from "prop-types";

export default function SelectedItems({ items }) {
  return (
    <div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium mb-3">Sản phẩm đã chọn ({items.length})</h4>
        <div className="max-h-48 overflow-y-auto">
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-2 border-b border-gray-200"
              >
                <img
                  src={item.image_url}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">
                    {item.product_name}
                  </h5>
                  <div className="flex justify-between mt-1">
                    <div className="text-gray-600">
                      <span>Số lượng: {item.quantity}</span>
                      <span className="mx-2">|</span>
                      <span>
                        Đơn giá: {item.price.toLocaleString("vi-VN")}₫
                      </span>
                    </div>
                    <span className="font-semibold text-blue-600">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
