import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Redux Actions
import { getProfileAddress } from "../../../redux/middlewares/client/addAddress";
import { getProfile } from "../../../redux/middlewares/client/addProfile";

// Services
import { addCartPay } from "../../../service/cart_client";
import { getUiDiscountSystem } from "../../../service/discount/discount_system";

// Components
import ShippingAddress from "./ShippingAddress";
import PriceSummary from "./PriceSummary";
import SelectedItems from "./SelectedItems";
import PaymentMethodSelector from "./PaymentMethodSelector";
import ModalDiscount from "./ModalDiscount";
import AddressModal from "./AddressModal";

const SHIPPING_COST = 30000;

const PayCart = ({ items }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux Selectors
  const apiKey = useSelector((state) => state.login.apikey);
  const profile = useSelector((state) => state.profile.profile);

  // State Management
  const [checkout, setCheckout] = useState({
    discountCode: "",
    appliedDiscount: 0,
    minimumOrderValue: 0,
  });
  const [modalStates, setModalStates] = useState({
    discount: false,
    address: false,
  });
  const [deliveryDetails, setDeliveryDetails] = useState({
    selectedAddress: null,
    selectedPaymentMethod: "",
    deliveryNote: "",
  });
  const [systemData, setSystemData] = useState({
    addresses: null,
    discountSystem: null,
  });

  // Calculated Values
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const total = useMemo(() => {
    const discountAmount = subtotal * checkout.appliedDiscount;
    return subtotal - discountAmount + SHIPPING_COST;
  }, [subtotal, checkout.appliedDiscount]);

  // Data Fetching
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [discountResponse, profileResponse] = await Promise.all([
          getUiDiscountSystem(),
          dispatch(getProfile(apiKey)),
        ]);

        setSystemData((prev) => ({
          ...prev,
          discountSystem: discountResponse.data.discounts,
        }));

        if (profileResponse.data.id) {
          const addressResponse = await dispatch(
            getProfileAddress(profileResponse.data.id)
          );

          setSystemData((prev) => ({
            ...prev,
            addresses: addressResponse.addresses,
          }));

          // Auto-select first address if available
          if (addressResponse.addresses?.length > 0) {
            setDeliveryDetails((prev) => ({
              ...prev,
              selectedAddress: addressResponse.addresses[0],
            }));
          }
        }
      } catch (error) {
        toast.error("Lỗi khi tải dữ liệu");
      }
    };

    fetchInitialData();
  }, [dispatch, apiKey]);

  // Handlers
  const handleApplyDiscount = (discountData) => {
    setCheckout({
      discountCode: discountData.code,
      appliedDiscount: discountData.discountPercent,
      minimumOrderValue: discountData.minOrderValue,
    });
  };
// xử lý thanh toán chuyển khoản
const handlePaySePay = () => {
    window.open(`/paysepay/ThanhToanDienTu?total=${total}&subtotal=${subtotal}`, '_blank');
  };

  const handleCheckout = async () => {
    if(deliveryDetails.selectedPaymentMethod === 'credit'){
      handlePaySePay();
      return;
    }
    const { selectedAddress, selectedPaymentMethod, deliveryNote } =
      deliveryDetails;

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
        discount_code: checkout.discountCode,
      };

      const result = await addCartPay(paymentData);

      if (result.success) {
        toast.success("Đặt hàng thành công!");
        navigate("/history");
      } else {
        toast.error(result.message || "Đặt hàng thất bại");
      }
    } catch (error) {
      toast.error("Lỗi khi xử lý thanh toán");
    }
  };

  // Modal Toggles
  const toggleModal = (type, isOpen) => {
    setModalStates((prev) => ({
      ...prev,
      [type]: isOpen,
    }));
  };

  // Update Delivery Details
  const updateDeliveryDetails = (field, value) => {
    setDeliveryDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-center mb-6">Thanh toán</h3>

      <div className="space-y-6">
        <ShippingAddress
          address={deliveryDetails.selectedAddress}
          onChangeClick={() => toggleModal("address", true)}
        />

        <SelectedItems items={items} />

        <div className="space-y-4">
          <h4 className="font-medium">Ghi chú giao hàng</h4>
          <textarea
            value={deliveryDetails.deliveryNote}
            onChange={(e) =>
              updateDeliveryDetails("deliveryNote", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Nhập ghi chú cho người giao hàng..."
          />
        </div>

        <button
          onClick={() => toggleModal("discount", true)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {checkout.discountCode
            ? `Mã đang dùng: ${checkout.discountCode}`
            : "Chọn mã giảm giá"}
        </button>

        <PaymentMethodSelector
          selectedMethod={deliveryDetails.selectedPaymentMethod}
          onSelect={(method) =>
            updateDeliveryDetails("selectedPaymentMethod", method)
          }
        />

        <PriceSummary
          subtotal={subtotal}
          discountAmount={subtotal * checkout.appliedDiscount}
          shippingCost={SHIPPING_COST}
        />

        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={
            !deliveryDetails.selectedPaymentMethod ||
            !deliveryDetails.selectedAddress
          }
        >
          Thanh toán
        </button>
      </div>

      <ModalDiscount
        isOpen={modalStates.discount}
        onClose={() => toggleModal("discount", false)}
        discountSystem={systemData.discountSystem}
        subtotal={subtotal}
        onApplyDiscount={handleApplyDiscount}
      />

      <AddressModal
        isOpen={modalStates.address}
        onClose={() => toggleModal("address", false)}
        addresses={systemData.addresses}
        selectedAddress={deliveryDetails.selectedAddress}
        onSelect={(address) =>
          updateDeliveryDetails("selectedAddress", address)
        }
      />
    </div>
  );
};

export default PayCart;
