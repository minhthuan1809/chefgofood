import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TfiMinus } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";
import Cookies from "js-cookie";
import { getProfileAddress } from "../../../redux/middlewares/client/addAddress";
import { getProfile } from "../../../redux/middlewares/client/addProfile";
import { addCartPay } from "../../../service/cart_client";
import { getUiDiscountSystem } from "../../../service/discount/discount_system";

import ShippingAddress from "./ShippingAddress";
import PriceSummary from "./PriceSummary";
import PaymentMethodSelector from "./PaymentMethodSelector";
import AddressModal from "./AddressModal";
import ModalDiscount from "./ModalDiscount";

const SHIPPING_COST = 30000;
const INITIAL_CHECKOUT_STATE = {
  discountCode: "",
  appliedDiscount: 0,
  paymentMethod: "",
  deliveryNote: "",
  minimumOrderValue: 0,
};

const ModelPayCart = ({ isOpen, onClose, items }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiKey = useSelector((state) => state.login.apikey);
  const profile = useSelector((state) => state.profile.profile);
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [modals, setModals] = useState({
    discount: false,
    address: false,
  });
  const [checkout, setCheckout] = useState(INITIAL_CHECKOUT_STATE);
  const [productQuantity, setProductQuantity] = useState(1);
  const [addresses, setAddresses] = useState({
    list: null,
    selected: null,
  });
  const [discountSystem, setDiscountSystem] = useState(null);
  // state để lưu trữ địa chỉ mới
  const [newAddress, setNewAddress] = useState(null);

  //  function
  // Memoized calculations to prevent unnecessary re-renders
  const calculatedValues = useMemo(() => {
    const subtotal = items.price * productQuantity;
    const discountAmount = items.discount
      ? (items.price * productQuantity * items.discount) / 100
      : 0;
    const totalPrice = subtotal - discountAmount;

    return { subtotal, discountAmount, totalPrice };
  }, [items, productQuantity]);

  const validateDiscount = (subtotal) => {
    if (!checkout.discountCode) return true;
    return subtotal >= checkout.minimumOrderValue;
  };

  const calculateTotal = () => {
    const { subtotal, discountAmount } = calculatedValues;
    const discountApplicable = validateDiscount(subtotal);
    const appliedDiscount = discountApplicable ? checkout.appliedDiscount : 0;
    const total = subtotal - subtotal * appliedDiscount + SHIPPING_COST;

    return total;
  };

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      if (!isOpen) return;

      const [discountResponse, profileResponse] = await Promise.all([
        getUiDiscountSystem(),
        dispatch(getProfile(apiKey)),
      ]);

      setDiscountSystem(discountResponse.data.discounts);

      if (profileResponse.data.id && apiKey !== null) {
        const addressResponse = await dispatch(
          getProfileAddress(profileResponse.data.id)
        );

        setAddresses((prev) => ({
          list: addressResponse.addresses,
          selected: addressResponse.addresses?.[0] || null,
        }));
      }
    };

    fetchInitialData();
  }, [dispatch, apiKey, isOpen]);

  // Reset discount if items change
  useEffect(() => {
    if (checkout.discountCode && !validateDiscount(calculatedValues.subtotal)) {
      toast.warning("Mã giảm giá không còn hiệu lực do tổng đơn hàng thay đổi");
      setCheckout(INITIAL_CHECKOUT_STATE);
    }
  }, [items, productQuantity]);

  const handleApplyDiscount = ({ code, discountPercent, minOrderValue }) => {
    setCheckout((prev) => ({
      ...prev,
      discountCode: code,
      appliedDiscount: discountPercent / 100,
      minimumOrderValue: minOrderValue,
    }));
  };
  // thanh toán
  const handleCheckout = async () => {
    Cookies.remove("timeSePay");
    const { paymentMethod } = checkout;
    console.log(checkout);
    if (!addresses.selected.id) {
      toast.error("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }
    try {
      const paymentData = {
        user_id: profile.id,
        address_id: addresses.selected.id,
        products: [
          {
            product_id: items.id,
            quantity: productQuantity,
          },
        ],

        // Start of Selection
        total_price:
          calculatedValues.totalPrice -
          calculatedValues.totalPrice * checkout.appliedDiscount * 100 +
          SHIPPING_COST,
        subtotal: calculatedValues.subtotal,
        payment_method: checkout.paymentMethod,
        note: checkout.deliveryNote,
        discount_code: checkout.discountCode,
      };

      if (checkout.paymentMethod === "credit") {
        navigate(
          `/paysepay/ThanhToanDienTu?total=${
            calculatedValues.totalPrice -
            calculatedValues.totalPrice * checkout.appliedDiscount * 100 +
            SHIPPING_COST
          }`
        );
        dispatch({ type: "add/sepay/data", payload: paymentData });
        return;
      }
      const result = await addCartPay(paymentData);

      if (result.success) {
        toast.success("Đặt hàng thành công!");
        onClose();
        navigate("/history");
      } else {
        toast.error(result.message || "Đặt hàng thất bại");
      }
    } catch (error) {
      toast.error("Lỗi khi xử lý thanh toán");
    }
  };

  const handleDataAddAddress = (e) => {
    e.preventDefault();
    toast.dismiss();
    const form = new FormData(e.target);
    const name = form.get("name");
    const phone = form.get("phone");
    const address = form.get("address");
    const email = form.get("email");

    if (!name || !phone || !address) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    const newAddressData = {
      name,
      phone,
      address,
      email,
    };

    setNewAddress(newAddressData);
    setIsAddAddress(false);
  };

  if (!isOpen) return null;

  function ModalAddAddAddress() {
    if (!isAddAddress) return;
    return (
      <div className=" flex items-center justify-center ">
        <span
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsAddAddress(false)}
        ></span>
        <div className=" w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto z-50 ">
          <button
            onClick={() => setIsAddAddress(false)}
            className="text-gray-500 hover:text-gray-700 float-right hover:bg-gray-200 rounded-full px-2 py-1"
          >
            ✕
          </button>
          <form onSubmit={handleDataAddAddress}>
            <div className="space-y-2 mt-2">
              <label className="text-gray-600">Tên người nhận</label>
              <input
                name="name"
                type="text"
                value={newAddress?.name}
                placeholder="Tên người nhận"
                className="border border-gray-200 rounded-lg p-2 w-full focus:outline-none"
              />
            </div>
            <div className="space-y-2 mt-2">
              <label className="text-gray-600">Số điện thoại</label>
              <input
                name="phone"
                type="text"
                value={newAddress?.phone}
                placeholder="Số điện thoại"
                className="border border-gray-200 rounded-lg p-2 w-full focus:outline-none"
              />
            </div>
            <div className="space-y-2 mt-2">
              <label className="text-gray-600">Địa chỉ</label>
              <input
                name="address"
                type="text"
                value={newAddress?.address}
                placeholder="Địa chỉ"
                className="border border-gray-200 rounded-lg p-2 w-full focus:outline-none"
              />
            </div>
            <div className="space-y-2 mt-2">
              <label className=" text-gray-600">Gmail</label>
              <input
                name="email"
                type="email"
                value={newAddress?.email}
                placeholder="(Không bắt buộc)"
                className="border border-gray-200 rounded-lg p-2 w-full focus:outline-none"
              />
            </div>
            <button className="w-full py-3 bg-[#b17741] text-white font-semibold rounded-lg hover:bg-[#b17741] transition-colors disabled:bg-gray-400 mt-4">
              Thêm địa chỉ
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Thanh toán</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Shipping Address */}
          {apiKey !== null ? (
            <ShippingAddress
              address={addresses.selected}
              onChangeClick={() =>
                setModals((prev) => ({ ...prev, address: true }))
              }
            />
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <p className=" text-lg font-bold text-gray-800">
                  Địa chỉ giao hàng
                </p>
                <button
                  className="text-[#b17741] hover:text-[#b17741] text-sm font-medium"
                  onClick={() => setIsAddAddress(true)}
                >
                  {newAddress ? "Thay đổi" : "Thêm địa chỉ"}
                </button>
              </div>
              {!newAddress ? (
                <p className="text-gray-600 my-2 ">Bạn cần nhập địa chỉ</p>
              ) : (
                <>
                  <h1 className="text-lg font-bold text-gray-800">
                    {newAddress.name}
                  </h1>
                  <p className="text-gray-600">{newAddress.email}</p>
                  <p className="text-gray-600">{newAddress.phone}</p>
                  <p className="text-gray-600">{newAddress.address}</p>
                </>
              )}
            </div>
          )}

          {/* Product Details */}
          <div className="bg-white shadow-lg rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold text-gray-800">Sản phẩm</h4>
            </div>

            <div className="max-h-[400px] overflow-y-auto space-y-4">
              <div className="flex items-center bg-gray-50 rounded-lg p-4 transition-all hover:shadow-sm">
                <img
                  src={items.image_url}
                  alt={items.product_name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />

                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    {items.product_name}
                  </h5>

                  <div className="flex items-center justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          setProductQuantity((prev) => Math.max(1, prev - 1))
                        }
                        className="bg-gray-200 text-gray-700 p-1 rounded-full hover:bg-gray-300"
                      >
                        <TfiMinus size={16} />
                      </button>

                      <span className="font-medium text-gray-800 mx-2">
                        {productQuantity}
                      </span>

                      <button
                        onClick={() => setProductQuantity((prev) => prev + 1)}
                        className="bg-gray-200 text-gray-700 p-1 rounded-full hover:bg-gray-300"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>

                    {/* Price Display */}
                    <div className="text-right">
                      <div className="text-sm text-gray-600 line-through">
                        {calculatedValues.subtotal.toLocaleString("vi-VN")}₫
                      </div>
                      <div className="text-[#b17741] font-bold">
                        {calculatedValues.totalPrice.toLocaleString("vi-VN")}₫
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ModalAddAddAddress />
          {/* Delivery Note */}
          <div className="space-y-4">
            <h4 className="font-medium">Ghi chú giao hàng</h4>
            <textarea
              value={checkout.deliveryNote}
              onChange={(e) =>
                setCheckout((prev) => ({
                  ...prev,
                  deliveryNote: e.target.value,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#b17741]"
              rows="3"
              placeholder="Nhập ghi chú cho người giao hàng..."
            />
          </div>

          {/* Discount Button */}
          <button
            onClick={() => setModals((prev) => ({ ...prev, discount: true }))}
            className="text-[#b17741] hover:text-[#b17741] text-sm font-medium"
          >
            {checkout.discountCode
              ? `Mã đang dùng: ${checkout.discountCode}`
              : "Chọn mã giảm giá"}
          </button>

          {/* Payment Method Selector */}
          <PaymentMethodSelector
            selectedMethod={checkout.paymentMethod}
            onSelect={(method) =>
              setCheckout((prev) => ({ ...prev, paymentMethod: method }))
            }
          />

          {/* Hiện th��� giá và mã giảm giá*/}
          <PriceSummary
            subtotal={calculatedValues.totalPrice}
            discountAmount={
              calculatedValues.totalPrice * checkout.appliedDiscount * 100
            }
            shippingCost={SHIPPING_COST}
          />

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-[#b17741] text-white font-semibold rounded-lg hover:bg-[#b17741] transition-colors disabled:bg-gray-400"
            disabled={
              !checkout.paymentMethod || (!addresses.selected && !newAddress)
            }
          >
            Thanh toán
          </button>
        </div>

        {/* Modals */}
        <ModalDiscount
          isOpen={modals.discount}
          onClose={() => setModals((prev) => ({ ...prev, discount: false }))}
          discountSystem={discountSystem}
          subtotal={calculatedValues.totalPrice}
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
        {/* modal thêm địa chỉ cho người mới */}
      </div>
    </div>
  );
};

export default ModelPayCart;
