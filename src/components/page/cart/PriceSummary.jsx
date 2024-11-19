/* eslint-disable no-undef */
import React from "react";

export default function PriceSummary({
  subtotal,
  discountAmount,
  shippingCost,
}) {
  const finalTotal = subtotal - discountAmount + shippingCost;
  console.log(subtotal);

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-600">Tạm tính:</span>
        <span className="font-semibold">
          {subtotal?.toLocaleString("vi-VN")}₫
        </span>
      </div>
      {discountAmount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Giảm giá:</span>
          <span>-{discountAmount?.toLocaleString("vi-VN")}₫</span>
        </div>
      )}
      <div className="flex justify-between text-gray-600">
        <span>Phí vận chuyển:</span>
        <span>{shippingCost?.toLocaleString("vi-VN")}₫</span>
      </div>
      <div className="flex justify-between pt-2 border-t border-gray-200">
        <span className="font-semibold">Tổng cộng:</span>
        <span className="font-semibold text-lg">
          {finalTotal?.toLocaleString("vi-VN")}₫
        </span>
      </div>
    </div>
  );
}
