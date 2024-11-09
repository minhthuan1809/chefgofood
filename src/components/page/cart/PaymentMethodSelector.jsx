import React from "react";
import { FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa";

export default function PaymentMethodSelector({ selectedMethod, onSelect }) {
  const PAYMENT_METHODS = [
    { id: "cash", name: "Tiền mặt", icon: FaMoneyBillWave },
    { id: "credit", name: "Thẻ tín dụng", icon: FaCreditCard },
  ];
  return (
    <div>
      <div>
        <h4 className="font-medium mb-3">Phương thức thanh toán</h4>
        <div className="grid grid-cols-3 gap-2">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border
          ${
            selectedMethod === method.id
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:bg-gray-50"
          }`}
            >
              <method.icon className="text-gray-600" size={24} />
              <span className="font-medium text-sm text-center">
                {method.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
