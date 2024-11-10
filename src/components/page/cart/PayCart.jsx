/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProfileAddress } from "../../../redux/middlewares/client/addAddress";
import { getProfile } from "../../../redux/middlewares/client/addProfile";
import { addCartPay } from "../../../service/cart_client";
import { getUiDiscountSystem } from "../../../service/discount/discount_system";
import ShippingAddress from "./ShippingAddress";
import PriceSummary from "./PriceSummary";
import SelectedItems from "./SelectedItems";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { useNavigate } from "react-router";

// Tách Modal thành component riêng
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Tách AddressModal thành component riêng
const AddressModal = ({
  isOpen,
  onClose,
  addresses,
  selectedAddress,
  onSelect,
}) => {
  const handleSelectAddress = (address) => {
    onSelect(address);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chọn địa chỉ giao hàng">
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {addresses?.map((address) => (
          <button
            key={address.id}
            onClick={() => handleSelectAddress(address)}
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
  );
};

// Component PayCart chính
const PayCart = ({ items }) => {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.login.apikey);
  const profile = useSelector((state) => state.profile.profile);

  // State
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [shippingCost] = useState(30000);
  const [deliveryNote, setDeliveryNote] = useState("");
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [discountSystem, setDiscountSystem] = useState(null);
  const navigate = useNavigate();
  // Tính toán tổng tiền
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * appliedDiscount;
  const total = subtotal - discountAmount + shippingCost;

  // Fetch addresses và discount system
  useEffect(() => {
    toast.dismiss();
    const fetchData = async () => {
      try {
        const [discountResponse, profileResponse] = await Promise.all([
          getUiDiscountSystem(),
          dispatch(getProfile(apiKey)),
        ]);

        setDiscountSystem(discountResponse.data.discounts);
        console.log("discountResponse", discountResponse);

        if (profileResponse.data.id) {
          const addressResponse = await dispatch(
            getProfileAddress(profileResponse.data.id)
          );
          setAddresses(addressResponse.addresses);
          if (addressResponse.addresses?.length > 0) {
            setSelectedAddress(addressResponse.addresses[0]);
          }
        }
      } catch (error) {
        toast.error("Lỗi khi tải dữ liệu");
      }
    };

    fetchData();
  }, [dispatch, apiKey]);

  // Xử lý thanh toán
  const handleCheckout = async () => {
    toast.dismiss();
    if (!selectedAddress) {
      toast.error("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }

    try {
      const paymentData = {
        user_id: profile.id,
        address_id: selectedAddress.id,
        products: items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
        total_price: total,
        subtotal: subtotal,
        payment_method: selectedPaymentMethod,
        note: deliveryNote,
        discount_code: discountCode,
        delivery_note: deliveryNote,
      };

      const result = await addCartPay(paymentData);
      console.log("result", result);
      if (result.success) {
        toast.success("Đặt hàng thành công!");
        navigate("/history");
        // Xử lý sau khi thanh toán thành công
      } else {
        toast.error(result.message || "Đặt hàng thất bại");
      }
    } catch (error) {
      toast.error("Lỗi khi xử lý thanh toán");
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-center mb-6">Thanh toán</h3>

      <div className="space-y-6">
        <ShippingAddress
          address={selectedAddress}
          onChangeClick={() => setIsAddressModalOpen(true)}
        />

        <SelectedItems items={items} />

        <div className="space-y-4">
          <h4 className="font-medium">Ghi chú giao hàng</h4>
          <textarea
            value={deliveryNote}
            onChange={(e) => setDeliveryNote(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Nhập ghi chú cho người giao hàng..."
          />
        </div>

        <button
          onClick={() => setIsDiscountModalOpen(true)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {discountCode ? `Mã đang dùng: ${discountCode}` : "Chọn mã giảm giá"}
        </button>

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
          {discountSystem?.map((code) => {
            if (code.days_remaining <= 0) {
              return;
            }

            return (
              <button
                key={code.id}
                onClick={() => {
                  if (subtotal < code.minimum_price) {
                    toast.dismiss();
                    toast.error(
                      `Đơn hàng tối thiểu ${code.minimum_price.toLocaleString()}₫`
                    );
                    return;
                  }

                  if (code.quantity <= 0) {
                    toast.dismiss();
                    toast.error("Mã giảm giá đã hết lượt sử dụng!");
                    return;
                  }

                  setDiscountCode(code.code);
                  setAppliedDiscount(code.discount_percent / 100);
                  setIsDiscountModalOpen(false);
                  toast.success("Áp dụng mã giảm giá thành công!");
                }}
                className="w-full text-left p-3 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold">{code.code}</span>
                    <p className="text-sm text-gray-500">{code.name}</p>
                    <p className="text-xs text-gray-400">
                      Đơn tối thiểu: {code.minimum_price.toLocaleString()}₫
                    </p>
                    <p className="text-xs text-gray-400">
                      Thời gian còn lại: {code.days_remaining} ngày
                    </p>
                    {code.days_remaining < 0 && (
                      <p className="text-xs text-red-500">{code.message}</p>
                    )}
                  </div>
                  <span className="text-blue-600">
                    Giảm {code.discount_percent}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </Modal>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelect={setSelectedAddress}
      />
    </div>
  );
};

export default PayCart;
