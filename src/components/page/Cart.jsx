import React, { useState } from "react";
import {
  FaTrashAlt,
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaCreditCard,
  FaMoneyBillWave,
  FaPaypal,
} from "react-icons/fa";

const initialCartItems = [
  { id: 1, name: "Áo thun", price: 250000, quantity: 2 },
  { id: 2, name: "Quần jeans", price: 550000, quantity: 1 },
  { id: 3, name: "Giày sneaker", price: 800000, quantity: 1 },
];

const discountCodes = [
  { code: "SUMMER10", discount: 0.1 },
  { code: "NEWUSER20", discount: 0.2 },
];

const paymentMethods = [
  { id: "credit", name: "Thẻ tín dụng", icon: FaCreditCard },
  { id: "cash", name: "Tiền mặt", icon: FaMoneyBillWave },
  { id: "paypal", name: "PayPal", icon: FaPaypal },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [requireVAT, setRequireVAT] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = subtotal * appliedDiscount;
  const total = subtotal - discount;
  const vat = requireVAT ? total * 0.1 : 0;
  const finalTotal = total + vat;

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyDiscount = () => {
    const discount = discountCodes.find((dc) => dc.code === discountCode);
    if (discount) {
      setAppliedDiscount(discount.discount);
    } else {
      alert("Mã giảm giá không hợp lệ");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-100">
        <h2 className="text-2xl font-bold flex items-center text-gray-800">
          <FaShoppingCart className="mr-2" /> Giỏ hàng của bạn
        </h2>
      </div>
      <div className="px-6 py-4">
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="py-4 flex justify-between items-center"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.price.toLocaleString("vi-VN")} ₫
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaMinus className="h-4 w-4" />
                </button>
                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaPlus className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-4 bg-gray-100">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Nhập mã giảm giá"
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={applyDiscount}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md transition duration-200"
          >
            Áp dụng
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Phương thức thanh toán</h3>
          <div className="flex space-x-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`flex items-center p-2 border rounded ${
                  selectedPaymentMethod === method.id
                    ? "bg-blue-100 border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <method.icon className="mr-2" />
                {method.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={requireVAT}
              onChange={(e) => setRequireVAT(e.target.checked)}
              className="mr-2"
            />
            Xuất hóa đơn VAT
          </label>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tạm tính:</span>
            <span className="font-semibold">
              {subtotal.toLocaleString("vi-VN")} ₫
            </span>
          </div>
          {appliedDiscount > 0 && (
            <div className="flex justify-between items-center text-green-600">
              <span>Giảm giá:</span>
              <span>-{discount.toLocaleString("vi-VN")} ₫</span>
            </div>
          )}
          {requireVAT && (
            <div className="flex justify-between items-center text-gray-600">
              <span>VAT (10%):</span>
              <span>{vat.toLocaleString("vi-VN")} ₫</span>
            </div>
          )}
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Tổng cộng:</span>
            <span>{finalTotal.toLocaleString("vi-VN")} ₫</span>
          </div>
        </div>
      </div>
      <div className="px-6 py-4">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
          disabled={!selectedPaymentMethod}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
