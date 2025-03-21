/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Nav from "../header/Nav";
import PageFooter from "../footer/PageFooter";
import { FaTrashAlt, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import SupportChat from "../messger/SupportChat";
import { useDispatch, useSelector } from "react-redux";
import { getCartRender } from "../../redux/middlewares/client/cart_middleware";
import Loading from "../util/Loading";
import { toast } from "react-toastify";
import {
  getCartDelete,
  getCartDeleteQuantity,
  addCart,
} from "../../service/cart_client";
import PayCart from "./cart/PayCart";
import { Link } from "react-router-dom";

// Helper functions
const calculateItemPrice = (item) => {
  const basePrice = item.price * item.quantity;
  const discountAmount = (basePrice * item.discount) / 100;
  return basePrice - discountAmount;
};

const calculateTotalPrice = (items) => {
  return items.reduce((sum, item) => {
    const basePrice = item.price * item.quantity;
    const discountAmount = (basePrice * item.discount) / 100;
    return sum + (basePrice - discountAmount);
  }, 0);
};

// Cart Item Component
const CartItem = ({
  item,
  onDelete,
  onUpdateQuantity,
  onDeleteQuantity,
  isSelected,
  onSelect,
}) => {
  const itemPrice = calculateItemPrice(item);
  const discountAmount = (item.price * item.quantity * item.discount) / 100;

  return (
    <li className="py-4 flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-200 transition-all hover:bg-gray-50 rounded-lg p-3">
      <div className="flex items-center gap-4 mb-3 sm:mb-0">
        {item.warning && (
          <input
            type="checkbox"
            className="w-5 h-5 accent-[#b17741]"
            checked={isSelected}
            onChange={() => onSelect(item.id)}
          />
        )}
        {!item.warning && <div className="p-3"></div>}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={item.image_url}
            alt={item.product_name}
            className="w-24 h-24 object-cover rounded-lg shadow-sm transition-transform hover:scale-105"
          />
          {item.discount > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
              -{item.discount}%
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row justify-between w-full">
        <div className="mb-3 sm:mb-0">
          <h3 className="text-lg font-semibold text-gray-800">
            {item.product_name}
          </h3>
          <p className="text-gray-600 text-sm">
            Đơn giá: {item.price.toLocaleString("vi-VN")}₫
          </p>
          {item.discount > 0 && (
            <div className="flex flex-col gap-1 mt-1">
              <p className="text-red-500 text-sm">
                Tiết kiệm: {discountAmount.toLocaleString("vi-VN")}₫
              </p>
            </div>
          )}
          <p className="font-semibold text-[#b17741] mt-1 text-lg">
            {itemPrice.toLocaleString("vi-VN")}₫
          </p>
        </div>

        <div className="flex flex-row sm:flex-col items-center gap-4 justify-between">
          {item.warning ? (
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
              <button
                className="p-2 hover:bg-gray-100 text-gray-700"
                onClick={() => onDeleteQuantity(item)}
              >
                <FaMinus className="w-3 h-3" />
              </button>
              <span className="px-4 font-medium">{item.quantity}</span>
              <button
                className="p-2 hover:bg-gray-100 text-gray-700"
                onClick={() => onUpdateQuantity(item)}
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="text-red-500 font-semibold p-2 text-sm bg-red-50 rounded-lg">
              Hết hàng
            </div>
          )}
          <button
            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
            onClick={() => onDelete(item.id)}
            aria-label="Xóa sản phẩm"
          >
            <FaTrashAlt className="w-5 h-5" />
          </button>
        </div>
      </div>
    </li>
  );
};

// Main Cart Component
export default function Cart() {
  const dispatch = useDispatch();
  const DataCart = useSelector((state) => state.cart.cartItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const apiKey = useSelector((state) => state.login.apikey);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      await dispatch(getCartRender(apiKey));
    } catch (error) {
      toast.error("Lỗi khi tải giỏ hàng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [apiKey]);

  useEffect(() => {
    if (DataCart) {
      const availableItems = DataCart.filter((item) => item.warning);
      const initialSelected = availableItems.map((item) => item.id);
      setSelectedItems(initialSelected);
    }
  }, [DataCart]);

  useEffect(() => {
    if (DataCart) {
      const selectedProducts = DataCart.filter((item) =>
        selectedItems.includes(item.id)
      );
      const total = calculateTotalPrice(selectedProducts);
      setTotalPrice(total);
    }
  }, [selectedItems, DataCart]);

  // Move PayCart to mobile container when on mobile
  useEffect(() => {
    const movePayCartToMobile = () => {
      const mobileContainer = document.getElementById(
        "mobile-payment-container"
      );
      const desktopContainer = document.getElementById(
        "desktop-payment-container"
      );

      if (mobileContainer && desktopContainer && window.innerWidth < 1024) {
        const desktopContent = desktopContainer.innerHTML;
        mobileContainer.innerHTML = desktopContent;
        desktopContainer.innerHTML = "";
      } else if (
        mobileContainer &&
        desktopContainer &&
        window.innerWidth >= 1024
      ) {
        const mobileContent = mobileContainer.innerHTML;
        if (mobileContent && !desktopContainer.innerHTML) {
          desktopContainer.innerHTML = mobileContent;
          mobileContainer.innerHTML = "";
        }
      }
    };

    window.addEventListener("resize", movePayCartToMobile);
    // Initial check
    setTimeout(movePayCartToMobile, 100);

    return () => window.removeEventListener("resize", movePayCartToMobile);
  }, [selectedItems.length]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  const handleSelectAll = () => {
    if (DataCart) {
      const availableItems = DataCart.filter((item) => item.warning);
      if (selectedItems.length === availableItems.length) {
        setSelectedItems([]);
      } else {
        const allAvailableIds = availableItems.map((item) => item.id);
        setSelectedItems(allAvailableIds);
      }
    }
  };

  const handleUpdateQuantity = async (item) => {
    toast.dismiss();
    try {
      const updateItem = await addCart(item.product_id, apiKey);
      if (updateItem.ok) {
        await fetchCart();
      } else {
        toast.error(updateItem.message);
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật số lượng!");
    }
  };

  const handleDeleteQuantity = async (item) => {
    toast.dismiss();
    try {
      if (item.quantity === 1) {
        if (!confirm("Xóa sản phẩm này khỏi giỏ hàng?")) return;
      }
      await getCartDeleteQuantity(item.id);
      await fetchCart();
    } catch (error) {
      toast.error("Lỗi khi giảm số lượng!");
    }
  };

  const handleDelete = async (id) => {
    toast.dismiss();
    try {
      const deleteItem = await getCartDelete(id);
      if (deleteItem.ok) {
        toast.success(deleteItem.message);
        setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
        await fetchCart();
      } else {
        toast.error(deleteItem.message);
      }
    } catch (error) {
      toast.error("Lỗi khi xóa sản phẩm!");
    }
  };

  if (loading) return <Loading />;

  const availableItems = DataCart?.filter((item) => item.warning) || [];
  const selectedItemsData =
    DataCart?.filter((item) => selectedItems.includes(item.id)) || [];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm">
        <Nav />
        <SupportChat />
      </header>

      <main className="flex-grow pt-24 px-4 pb-24 lg:pb-8 lg:px-8 bg-gray-50">
        <div className=" w-[90%] mx-auto">
          {/* Cart Header with Back Button */}
          <div className="flex items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
              <FaShoppingCart className="mr-2 text-[#b17741]" />
              <span>Giỏ hàng</span>
              {DataCart?.length > 0 && (
                <span className="ml-2 text-sm text-gray-500 font-normal">
                  ({DataCart.length} sản phẩm)
                </span>
              )}
            </h1>
          </div>

          <div className="bg-white shadow-md rounded-2xl overflow-hidden">
            {!DataCart || DataCart.length === 0 ? (
              <div className="text-center text-gray-500 p-8">
                <h2 className="text-2xl font-bold">Giỏ hàng trống</h2>

                <img
                  className="w-full max-w-xs mx-auto my-10"
                  src="https://web.nvnstatic.net/tp/T0213/img/tmp/cart-empty.png?v=3"
                  alt="img-cart-empty"
                />
              </div>
            ) : (
              <>
                <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200">
                  {availableItems.length > 0 && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 mr-2 accent-[#b17741]"
                        checked={
                          selectedItems.length === availableItems.length &&
                          availableItems.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                      <span className="text-sm text-gray-600">
                        Chọn tất cả ({availableItems.length} sản phẩm)
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row lg:gap-8">
                  <div className="w-full lg:w-2/3 p-4">
                    <div className="max-h-[calc(100vh-220px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                      <ul className="space-y-3">
                        {DataCart.map((item) => (
                          <CartItem
                            key={item.id}
                            item={item}
                            onDelete={handleDelete}
                            onUpdateQuantity={handleUpdateQuantity}
                            onDeleteQuantity={handleDeleteQuantity}
                            isSelected={selectedItems.includes(item.id)}
                            onSelect={handleCheckboxChange}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Desktop Payment Section */}
                  <div className=" lg:block w-full lg:w-1/3 p-6 bg-gray-50 border-l border-gray-200">
                    <div id="desktop-payment-container">
                      {selectedItemsData.length > 0 && (
                        <PayCart
                          items={selectedItemsData}
                          totalPrice={totalPrice}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-auto">
        <PageFooter />
      </footer>
    </div>
  );
}
