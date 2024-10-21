import { useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa";

export default function PayCart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [requireVAT, setRequireVAT] = useState(false);

  const discountCodes = [
    { code: "SUMMER10", discount: 0.1 },
    { code: "NEWUSER20", discount: 0.2 },
  ];

  const paymentMethods = [
    { id: "cash", name: "Tiền mặt", icon: FaMoneyBillWave },
    { id: "credit", name: "Thẻ tín dụng", icon: FaCreditCard },
    { id: "paypal", name: "PayPal", icon: FaPaypal },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-center mb-4">Thanh toán</h3>

      <div className="space-y-6">
        {/* Shipping Info */}
        <div className="bg-gray-100 rounded p-4 space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Tên gọi nhớ:</span>
            <span className="text-blue-600 font-semibold">HOME</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">SĐT:</span>
            <span>0123456789</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Địa chỉ:</span>
            <span className="flex-1 text-right">
              63 D. Yên Bệ, Kim Chung, Hoài Đức, Hà Nội
            </span>
          </div>
          <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
            sửa
          </button>
        </div>

        {/* Discount Code */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Nhập mã giảm giá"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Áp dụng
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Chọn mã giảm giá
          </button>
        </div>

        {/* Payment Methods */}
        <div>
          <h4 className="font-medium mb-3">Phương thức thanh toán</h4>
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${
                  selectedPaymentMethod === method.id
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

        {/* VAT Checkbox */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={requireVAT}
            onChange={(e) => setRequireVAT(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-700">Xuất hóa đơn VAT</span>
        </label>

        {/* Price Summary */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Tạm tính:</span>
            <span className="font-semibold">20.000.000₫</span>
          </div>
          {appliedDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Giảm giá:</span>
              <span>-{(appliedDiscount * 20_000_000).toLocaleString()}₫</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>VAT (10%):</span>
            <span>2.000.000₫</span>
          </div>

          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="font-semibold">Tổng cộng:</span>
            <span className="font-semibold text-lg">20.000.000₫</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={!selectedPaymentMethod}
        >
          Thanh toán
        </button>
      </div>

      {/* Discount Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Chọn mã giảm giá</h3>
            <div className="space-y-2">
              {discountCodes.map((code) => (
                <button
                  key={code.code}
                  onClick={() => {
                    setDiscountCode(code.code);
                    setAppliedDiscount(code.discount);
                    setIsModalOpen(false);
                  }}
                  className="w-full text-left p-3 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <span className="font-semibold">{code.code}</span>
                  <span className="ml-4">Giảm {code.discount * 100}%</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
