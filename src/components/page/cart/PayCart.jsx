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
import ModalDiscount from "./ModalDiscount";

// Tách Modal thành component riêng
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
};

const handleApplyDiscount = ({ code, discountPercent, minOrderValue }) => {
  setCheckout((prev) => ({
    ...prev,
    discountCode: code,
    appliedDiscount: discountPercent / 100,
    minimumOrderValue: minOrderValue,
  }));
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
      <div className="space-y-4">
        {addresses?.map((address) => (
          <div
            key={address.id}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
              selectedAddress?.id === address.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => handleSelectAddress(address)}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{address.note}</p>
                <p className="text-gray-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {address.phone}
                </p>
                <p className="text-gray-600 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {address.address}
                </p>
              </div>
              {selectedAddress?.id === address.id && (
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
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
      };

      const result = await addCartPay(paymentData);
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
      <ModalDiscount
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        discountSystem={discountSystem}
        subtotal={subtotal}
        onApplyDiscount={handleApplyDiscount}
      />

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
