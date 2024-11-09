/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { FaCreditCard, FaMoneyBillWave, FaPaypal } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProfileAddress } from "../../../redux/middlewares/client/addAddress";
import { getProfile } from "../../../redux/middlewares/client/addProfile";

// Constants
const DISCOUNT_CODES = [
  { code: "SUMMER10", discount: 0.1, description: "Giảm 10% cho mùa hè" },
  {
    code: "NEWUSER20",
    discount: 0.2,
    description: "Giảm 20% cho khách hàng mới",
  },
  {
    code: "FREESHIP",
    discount: 0,
    shipping: true,
    description: "Miễn phí vận chuyển",
  },
];

const PAYMENT_METHODS = [
  { id: "cash", name: "Tiền mặt", icon: FaMoneyBillWave },
  { id: "credit", name: "Thẻ tín dụng", icon: FaCreditCard },
  { id: "paypal", name: "PayPal", icon: FaPaypal },
];

const DEFAULT_SHIPPING_COST = 30000;

// Component hiển thị sản phẩm đã chọn
const SelectedItems = ({ items }) => (
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
              <h5 className="font-medium text-gray-800">{item.product_name}</h5>
              <div className="flex justify-between mt-1">
                <div className="text-gray-600">
                  <span>Số lượng: {item.quantity}</span>
                  <span className="mx-2">|</span>
                  <span>Đơn giá: {item.price.toLocaleString("vi-VN")}₫</span>
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
);

// Component for shipping address
const ShippingAddress = ({ address, onChangeClick }) => (
  <div className="mb-6 p-4 border rounded-lg">
    <div className="flex justify-between items-center mb-2">
      <h4 className="font-medium">Địa chỉ giao hàng</h4>
      <button
        onClick={onChangeClick}
        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        Thay đổi
      </button>
    </div>
    {address ? (
      <div>
        <p className="font-medium">{address.note}</p>
        <p className="text-gray-600">{address.phone}</p>
        <p className="text-gray-600">{address.address}</p>
      </div>
    ) : (
      <p className="text-gray-500">Chưa có địa chỉ giao hàng</p>
    )}
  </div>
);

// Component for payment methods
const PaymentMethodSelector = ({ selectedMethod, onSelect }) => (
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
          <span className="font-medium text-sm text-center">{method.name}</span>
        </button>
      ))}
    </div>
  </div>
);

// Component for price summary
const PriceSummary = ({ subtotal, discountAmount, shippingCost }) => {
  const finalTotal = subtotal - discountAmount + shippingCost;

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-600">Tạm tính:</span>
        <span className="font-semibold">
          {subtotal.toLocaleString("vi-VN")}₫
        </span>
      </div>
      {discountAmount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Giảm giá:</span>
          <span>-{discountAmount.toLocaleString("vi-VN")}₫</span>
        </div>
      )}
      <div className="flex justify-between text-gray-600">
        <span>Phí vận chuyển:</span>
        <span>{shippingCost.toLocaleString("vi-VN")}₫</span>
      </div>
      <div className="flex justify-between pt-2 border-t border-gray-200">
        <span className="font-semibold">Tổng cộng:</span>
        <span className="font-semibold text-lg">
          {finalTotal.toLocaleString("vi-VN")}₫
        </span>
      </div>
    </div>
  );
};

// Modal component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {children}
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

// Main PayCart component
const PayCart = ({ items }) => {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.login.apikey);

  // State
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(DEFAULT_SHIPPING_COST);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * appliedDiscount;

  // Fetch addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await dispatch(getProfile(apiKey));
        const data = await dispatch(getProfileAddress(response.data.id));
        setAddresses(data.addresses);
        if (data.addresses?.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("Không thể tải địa chỉ giao hàng");
      }
    };

    fetchAddresses();
  }, [dispatch, apiKey]);

  const handleApplyDiscount = () => {
    const foundDiscount = DISCOUNT_CODES.find(
      (code) => code.code === discountCode
    );
    if (foundDiscount) {
      setAppliedDiscount(foundDiscount.discount);
      if (foundDiscount.shipping) {
        setShippingCost(0);
      }
      toast.success("Áp dụng mã giảm giá thành công!");
    } else {
      toast.error("Mã giảm giá không hợp lệ!");
    }
  };

  const handleCheckout = () => {
    console.log("Thông tin đơn hàng:");
    console.log("Danh sách sản phẩm:", items);
    console.log("Địa chỉ giao hàng:", selectedAddress);
    console.log("Phương thức thanh toán:", selectedPaymentMethod);
    console.log("Ghi chú giao hàng:", deliveryNote);
    console.log("Mã giảm giá:", discountCode);
    console.log("Tạm tính:", subtotal);
    console.log("Giảm giá:", discountAmount);
    console.log("Phí vận chuyển:", shippingCost);
    console.log("Tổng cộng:", subtotal - discountAmount + shippingCost);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-center mb-2">Thanh toán</h3>

      <ShippingAddress
        address={selectedAddress}
        onChangeClick={() => setIsAddressModalOpen(true)}
      />

      <div className="space-y-6">
        <SelectedItems items={items} />

        {/* Delivery Note */}
        <div>
          <h4 className="font-medium mb-2">Ghi chú giao hàng</h4>
          <textarea
            value={deliveryNote}
            onChange={(e) => setDeliveryNote(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Nhập ghi chú cho người giao hàng..."
          />
        </div>

        {/* Discount Code */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
              placeholder="Nhập mã giảm giá"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleApplyDiscount}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Áp dụng
            </button>
          </div>
          <button
            onClick={() => setIsDiscountModalOpen(true)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Xem mã giảm giá
          </button>
        </div>

        <PaymentMethodSelector
          selectedMethod={selectedPaymentMethod}
          onSelect={setSelectedPaymentMethod}
        />

        <PriceSummary
          subtotal={subtotal}
          discountAmount={discountAmount}
          shippingCost={shippingCost}
        />

        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={!selectedPaymentMethod || !selectedAddress}
        >
          Thanh toán
        </button>
      </div>

      {/* Discount Modal */}
      <Modal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        title="Mã giảm giá"
      >
        <div className="space-y-2">
          {DISCOUNT_CODES.map((code) => (
            <button
              key={code.code}
              onClick={() => {
                setDiscountCode(code.code);
                setAppliedDiscount(code.discount);
                if (code.shipping) setShippingCost(0);
                setIsDiscountModalOpen(false);
              }}
              className="w-full text-left p-3 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">{code.code}</span>
                  <p className="text-sm text-gray-500">{code.description}</p>
                </div>
                <span className="text-blue-600">
                  {code.shipping
                    ? "Miễn phí ship"
                    : `Giảm ${code.discount * 100}%`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </Modal>

      {/* Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Chọn địa chỉ giao hàng"
      >
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {addresses?.map((address) => (
            <button
              key={address.id}
              onClick={() => {
                setSelectedAddress(address);
                setIsAddressModalOpen(false);
              }}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedAddress?.id === address.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{address.note}</p>
                  <p className="text-gray-600">{address.phone}</p>
                  <p className="text-gray-600">{address.address}</p>
                </div>
                {selectedAddress?.id === address.id && (
                  <span className="text-blue-600">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default PayCart;
