import { useState } from "react";
import Nav from "../header/Nav";
import PageFooter from "../footer/PageFooter";
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
  {
    id: 1,
    name: "Áo thun",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 250000,
    quantity: 2,
  },
  {
    id: 2,
    name: "Quần jeans",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 550000,
    quantity: 1,
  },
  {
    id: 3,
    name: "Giày sneaker",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 800000,
    quantity: 1,
  },
  {
    id: 4,
    name: "Áo thun",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 250000,
    quantity: 2,
  },
  {
    id: 5,
    name: "Quần jeans",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 550000,
    quantity: 1,
  },
  {
    id: 6,
    name: "Giày sneaker",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 800000,
    quantity: 1,
  },
];

const discountCodes = [
  { code: "SUMMER10", discount: 0.1 },
  { code: "NEWUSER20", discount: 0.2 },
];

const paymentMethods = [
  { id: "cash", name: "Tiền mặt", icon: FaMoneyBillWave },
  { id: "credit", name: "Thẻ tín dụng", icon: FaCreditCard },
  { id: "paypal", name: "PayPal", icon: FaPaypal },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [requireVAT, setRequireVAT] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkedItems = cartItems.filter((item) => item.checked);
  const subtotal = checkedItems.reduce(
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
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const toggleItemCheck = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const applyDiscount = (code) => {
    const discount = discountCodes.find((dc) => dc.code === code);
    if (discount) {
      setDiscountCode(code);
      setAppliedDiscount(discount.discount);
      setIsModalOpen(false);
    } else {
      alert("Mã giảm giá không hợp lệ");
    }
  };

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="mt-[6rem] w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 bg-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center text-gray-800">
              <FaShoppingCart className="mr-2" /> Giỏ hàng của bạn
            </h2>
          </div>
          <div className="flex flex-col md:flex-row">
            {/* Left side - Product list */}
            <div className="w-full md:w-2/3 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="py-4 flex flex-row sm:items-center"
                  >
                    <div className="flex items-center mb-2 sm:mb-0">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItemCheck(item.id)}
                        className="mr-4"
                      />
                      <div className="w-20 h-20 mr-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 mb-2 sm:mb-0">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.price.toLocaleString("vi-VN")} ₫
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FaMinus className="h-4 w-4" />
                        </button>
                        <span className="mx-2 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <FaPlus className="h-4 w-4" />
                        </button>
                      </div>
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

            {/* Right side - Payment summary */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">Thanh toán</h3>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Nhập mã giảm giá"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => applyDiscount(discountCode)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
                  >
                    Áp dụng
                  </button>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Chọn mã giảm giá
                </button>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Phương thức thanh toán</h4>
                <div className="flex flex-wrap gap-2">
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
              <div className="space-y-2 mb-4">
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
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
                disabled={!selectedPaymentMethod || checkedItems.length === 0}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Chọn mã giảm giá</h3>
              <div className="space-y-2">
                {discountCodes.map((code) => (
                  <button
                    key={code.code}
                    onClick={() => applyDiscount(code.code)}
                    className="w-full text-left p-2 hover:bg-blue-50 rounded"
                  >
                    <span className="font-semibold">{code.code}</span>
                    <span className="ml-4">Giảm {code.discount * 100}%</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </main>
      <footer className="mt-[5rem]">
        <PageFooter />
      </footer>
    </>
  );
}
