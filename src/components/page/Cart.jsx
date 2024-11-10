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
    <li className="py-4 flex flex-row sm:items-center gap-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {item.warning && (
          <input
            type="checkbox"
            className="w-4 h-4"
            checked={isSelected}
            onChange={() => onSelect(item.id)}
          />
        )}
        {!item.warning && <div className="p-3"></div>}
        <img
          src={item.image_url}
          alt={item.product_name}
          className="w-20 h-20 object-cover rounded"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.product_name}</h3>
        <p className="text-gray-600">
          Đơn giá: {item.price.toLocaleString("vi-VN")}₫
        </p>
        {item.discount > 0 && (
          <div>
            <p className="text-red-500">Giảm giá: {item.discount}%</p>
            <p className="text-green-600">
              Tiết kiệm: {discountAmount.toLocaleString("vi-VN")}₫
            </p>
          </div>
        )}
        <p className="font-semibold text-blue-600 mt-1">
          Thành tiền: {itemPrice.toLocaleString("vi-VN")}₫
        </p>
      </div>

      <div className="flex items-center gap-4">
        {item.warning ? (
          <div className="flex items-center border rounded-md">
            <button
              className="p-2 hover:bg-gray-100"
              onClick={() => onDeleteQuantity(item)}
            >
              <FaMinus className="w-4 h-4" />
            </button>
            <span className="px-4">{item.quantity}</span>
            <button
              className="p-2 hover:bg-gray-100"
              onClick={() => onUpdateQuantity(item)}
            >
              <FaPlus className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-red-500 font-semibold p-2">Hết hàng</div>
        )}
        <button
          className="text-red-500 hover:text-red-700 p-2"
          onClick={() => onDelete(item.id)}
        >
          <FaTrashAlt className="w-5 h-5" />
        </button>
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

  const fetchCart = async () => {
    try {
      await dispatch(getCartRender(apiKey));
    } catch (error) {
      toast.error("Lỗi khi tải giỏ hàng!");
    } finally {
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

  if (!DataCart) return <Loading />;

  const availableItems = DataCart.filter((item) => item.warning);
  const selectedItemsData = DataCart.filter((item) =>
    selectedItems.includes(item.id)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white">
        <Nav />
        <SupportChat />
      </header>

      <main className="flex-grow pt-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 bg-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center text-gray-800">
                <FaShoppingCart className="mr-2" /> Giỏ hàng của bạn
              </h2>
              {availableItems.length > 0 && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mr-2"
                    checked={
                      selectedItems.length === availableItems.length &&
                      availableItems.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                  <span className="text-sm text-gray-600">Chọn tất cả</span>
                </div>
              )}
            </div>
          </div>

          {DataCart.length === 0 ? (
            <div className="text-center text-gray-500 p-8">
              Giỏ hàng của bạn trống
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row lg:gap-8">
              <div className="w-full lg:w-2/3 p-4">
                <div className="max-h-[110vh] overflow-y-auto">
                  <ul className="divide-y divide-gray-200">
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

              <div className="w-full lg:w-1/3 p-4 bg-gray-50">
                {selectedItemsData.length > 0 && (
                  <PayCart items={selectedItemsData} totalPrice={totalPrice} />
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-8">
        <PageFooter />
      </footer>
    </div>
  );
}
