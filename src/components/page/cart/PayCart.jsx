import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
    toast.success(`Đã áp dụng mã giảm giá: ${discountData.code}`);
  };

  const handleCheckout = async () => {
    Cookies.remove("timeSePay");
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

    setIsLoading(true);
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

      if (deliveryDetails.selectedPaymentMethod === "credit") {
        navigate(`/paysepay/ThanhToanDienTu?total=${total}`);
        dispatch({ type: "add/sepay/data", payload: paymentData });
        return;
      }

      const result = await addCartPay(paymentData);

      if (result.success) {
        toast.success("Đặt hàng thành công!");
        navigate("/history");
      } else {
        toast.error(result.message || "Đặt hàng thất bại");
      }
    } catch (error) {
      toast.error("Lỗi khi xử lý thanh toán");
    } finally {
      setIsLoading(false);
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
    <div>
      <div className="w-full mx-auto bg-white rounded-md shadow-md p-4 my-4">
        <h2 className="text-xl font-bold text-center mb-4 text-[#8a5d2f]">
          Thanh Toán Đơn Hàng
        </h2>

        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#b17741]"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Progress Indicator */}
            <div className="flex justify-between mb-3">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-[#b17741] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  1
                </div>
                <span className="text-xs mt-1">Giỏ hàng</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className="h-px w-full bg-[#b17741]"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-[#b17741] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  2
                </div>
                <span className="text-xs mt-1">Thanh toán</span>
              </div>
              <div className="flex-1 flex items-center">
                <div className="h-px w-full bg-gray-300"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">
                  3
                </div>
                <span className="text-xs mt-1 text-gray-500">Hoàn tất</span>
              </div>
            </div>

            {/* Shipping Address Section */}
            <div className="bg-gray-50 rounded-mdborder border-gray-200">
              <div className="flex justify-between items-center ">
                <h3 className="text-base font-semibold text-gray-800">
                  <span className="text-[#b17741] mr-1">1.</span>Địa Chỉ Giao
                  Hàng
                </h3>
              </div>
              <ShippingAddress
                address={deliveryDetails.selectedAddress}
                onChangeClick={() => toggleModal("address", true)}
              />
            </div>

            {/* Selected Items Section */}
            <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                <span className="text-[#b17741] mr-1">2.</span>Sản Phẩm
              </h3>
              <SelectedItems items={items} />
            </div>

            {/* Additional Info and Payment Method Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  <span className="text-[#b17741] mr-1">3.</span>Ghi Chú
                </h3>
                <textarea
                  value={deliveryDetails.deliveryNote}
                  onChange={(e) =>
                    updateDeliveryDetails("deliveryNote", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-[#b17741] transition-all"
                  rows="2"
                  placeholder="Nhập ghi chú cho người giao hàng..."
                />
              </div>

              <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  <span className="text-[#b17741] mr-1">4.</span>Phương Thức
                  Thanh Toán
                </h3>
                <PaymentMethodSelector
                  selectedMethod={deliveryDetails.selectedPaymentMethod}
                  onSelect={(method) =>
                    updateDeliveryDetails("selectedPaymentMethod", method)
                  }
                />
              </div>
            </div>

            {/* Discount Section */}
            <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                <span className="text-[#b17741] mr-1">5.</span>Mã Giảm Giá
              </h3>
              <div className="flex items-center">
                <div className="flex-1 bg-white rounded-md border border-gray-300 px-3 py-2 text-sm">
                  {checkout.discountCode ? (
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#b17741]">
                        {checkout.discountCode} (-
                        {(checkout.appliedDiscount * 100).toFixed(0)}%)
                      </span>
                      <button
                        onClick={() =>
                          setCheckout({
                            discountCode: "",
                            appliedDiscount: 0,
                            minimumOrderValue: 0,
                          })
                        }
                        className="text-gray-500 hover:text-red-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Chưa có mã giảm giá
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleModal("discount", true)}
                  className="ml-2 px-3 py-2 bg-[#b17741] text-white text-sm font-medium rounded-md hover:bg-[#a06835] transition-colors"
                >
                  Chọn Mã
                </button>
              </div>
            </div>

            {/* Price Summary Section */}
            <div className="bg-gray-50 rounded-md p-3 border border-gray-200">
              <h3 className="text-base font-semibold text-gray-800 mb-2">
                <span className="text-[#b17741] mr-1">6.</span>Tổng Thanh Toán
              </h3>
              <PriceSummary
                subtotal={subtotal}
                discountAmount={subtotal * checkout.appliedDiscount}
                shippingCost={SHIPPING_COST}
              />

              <div className="mt-3 border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-base font-bold">Tổng cộng:</span>
                  <span className="text-lg font-bold text-[#b17741]">
                    {total.toLocaleString()}đ
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-2 bg-[#b17741] text-white text-base font-semibold rounded-md hover:bg-[#a06835] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={
                    !deliveryDetails.selectedPaymentMethod ||
                    !deliveryDetails.selectedAddress ||
                    isLoading
                  }
                >
                  {isLoading ? (
                    <span className="mr-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                  ) : null}
                  Xác Nhận Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        )}

        <ModalDiscount
          isOpen={modalStates.discount}
          onClose={() => toggleModal("discount", false)}
          discountSystem={systemData.discountSystem}
          subtotal={subtotal}
          onApplyDiscount={handleApplyDiscount}
        />
      </div>
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
