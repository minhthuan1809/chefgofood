import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsQrCode } from "react-icons/bs";
export default function PaymentMethodSelector({ selectedMethod, onSelect }) {
  const PAYMENT_METHODS = [
    { id: "cash", name: "Tiền mặt", icon: FaMoneyBillWave },
    { id: "credit", name: "Chuyển khoản", icon: BsQrCode },
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
              ? "border-[#b17741] bg-[#b17741]"
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
