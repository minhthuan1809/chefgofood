import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { getProfileAddress } from "../../../redux/middlewares/client/addAddress";
import { getProfile } from "../../../redux/middlewares/client/addProfile";
import { addCartPay } from "../../../service/cart_client";
import { getUiDiscountSystem } from "../../../service/discount/discount_system";
import ShippingAddress from "./ShippingAddress";
import PriceSummary from "./PriceSummary";
import SelectedItems from "./SelectedItems";
import PaymentMethodSelector from "./PaymentMethodSelector";
import AddressModal from "./AddressModal";
import ModalDiscount from "./ModalDiscount";

const SHIPPING_COST = 30000;

const PayCart = ({ items }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiKey = useSelector((state) => state.login.apikey);
  const profile = useSelector((state) => state.profile.profile);

  // State management
  const [modals, setModals] = useState({
    discount: false,
    address: false,
  });
  const [checkout, setCheckout] = useState({
    discountCode: "",
    appliedDiscount: 0,
    paymentMethod: "",
    deliveryNote: "",
    minimumOrderValue: 0, // Add this to track minimum order value
  });
  const [addresses, setAddresses] = useState({
    list: null,
    selected: null,
  });
  const [discountSystem, setDiscountSystem] = useState(null);

  // Calculations
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const basePrice = item.price * item.quantity;
      const discountAmount = (basePrice * (item.discount || 0)) / 100;
      return sum + (basePrice - discountAmount);
    }, 0);
  };

  const subtotal = calculateSubtotal();

  // Validate discount applicability
  const validateDiscount = () => {
    // If no discount is applied, return true
    if (!checkout.discountCode) return true;

    // Check if subtotal meets the minimum order value for the applied discount
    return subtotal >= checkout.minimumOrderValue;
  };

  const discountAmount = validateDiscount()
    ? subtotal * checkout.appliedDiscount
    : 0;
  const total = subtotal - discountAmount + SHIPPING_COST;

  // Fetch initial data
  useEffect(() => {
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

          setAddresses((prev) => ({
            list: addressResponse.addresses,
            selected: addressResponse.addresses?.[0] || null,
          }));
        }
      } catch (error) {
        toast.error("Lỗi khi tải dữ liệu");
      }
    };

    fetchData();
  }, [dispatch, apiKey]);

  // Handlers
  const handleApplyDiscount = ({ code, discountPercent, minOrderValue }) => {
    setCheckout((prev) => ({
      ...prev,
      discountCode: code,
      appliedDiscount: discountPercent,
      minimumOrderValue: minOrderValue, // Store minimum order value
    }));
  };

  // Reset discount if items change and no longer meet minimum
  useEffect(() => {
    if (checkout.discountCode && !validateDiscount()) {
      toast.warning("Mã giảm giá không còn hiệu lực do tổng đơn hàng thay đổi");
      setCheckout((prev) => ({
        ...prev,
        discountCode: "",
        appliedDiscount: 0,
        minimumOrderValue: 0,
      }));
    }
  }, [items]);

  const handleCheckout = async () => {
    if (!addresses.selected) {
      toast.error("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    if (!checkout.paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }

    try {
      const paymentData = {
        user_id: profile.id,
        address_id: addresses.selected.id,
        products: items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
        total_price: total,
        subtotal: total,
        payment_method: checkout.paymentMethod,
        discount_code: checkout.discountCode,
        delivery_note: checkout.deliveryNote,
        note: checkout.deliveryNote,
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

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-center mb-6">Thanh toán</h3>

      <div className="space-y-6">
        <ShippingAddress
          address={addresses.selected}
          onChangeClick={() =>
            setModals((prev) => ({ ...prev, address: true }))
          }
        />

        <SelectedItems items={items} />

        <div className="space-y-4">
          <h4 className="font-medium">Ghi chú giao hàng</h4>
          <textarea
            value={checkout.deliveryNote}
            onChange={(e) =>
              setCheckout((prev) => ({ ...prev, deliveryNote: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Nhập ghi chú cho người giao hàng..."
          />
        </div>

        <button
          onClick={() => setModals((prev) => ({ ...prev, discount: true }))}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {checkout.discountCode
            ? `Mã đang dùng: ${checkout.discountCode}`
            : "Chọn mã giảm giá"}
        </button>

        <PaymentMethodSelector
          selectedMethod={checkout.paymentMethod}
          onSelect={(method) =>
            setCheckout((prev) => ({ ...prev, paymentMethod: method }))
          }
        />

        <PriceSummary
          subtotal={subtotal}
          discountAmount={discountAmount}
          shippingCost={SHIPPING_COST}
        />

        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={!checkout.paymentMethod || !addresses.selected}
        >
          Thanh toán
        </button>
      </div>

      <ModalDiscount
        isOpen={modals.discount}
        onClose={() => setModals((prev) => ({ ...prev, discount: false }))}
        discountSystem={discountSystem}
        subtotal={subtotal}
        onApplyDiscount={handleApplyDiscount}
      />

      <AddressModal
        isOpen={modals.address}
        onClose={() => setModals((prev) => ({ ...prev, address: false }))}
        addresses={addresses.list}
        selectedAddress={addresses.selected}
        onSelect={(address) =>
          setAddresses((prev) => ({ ...prev, selected: address }))
        }
      />
    </div>
  );
};

export default PayCart;
