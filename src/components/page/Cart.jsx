import { useEffect, useState } from "react";
import Nav from "../header/Nav";
import PageFooter from "../footer/PageFooter";
import { FaTrashAlt, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import PayCart from "./cart/PayCart";
import SupportChat from "../messger/SupportChat";
import { useDispatch, useSelector } from "react-redux";
import { getCartRender } from "../../redux/middlewares/client/cart_middleware";
import Loading from "../util/Loading";
import { toast } from "react-toastify";
import {
  getCartDelete,
  getCartDeleteQuantity,
} from "../../service/cart_client";
import { addCart } from "../../service/cart_client";

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const DataCart = useSelector((state) => state.cart.cartItems);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const apiKey = useSelector((state) => state.login.apikey);

  const fetchCart = async () => {
    setLoading(true);
    await dispatch(getCartRender(apiKey));
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [apiKey]);

  // Initialize selectedItems when DataCart is loaded
  useEffect(() => {
    if (DataCart) {
      const initialSelected = DataCart.filter((item) => item.warning).map(
        (item) => item.id
      );
      setSelectedItems(initialSelected);
    }
  }, [DataCart]);

  // Calculate total price whenever selectedItems or DataCart changes
  useEffect(() => {
    if (DataCart) {
      const total = DataCart.reduce((sum, item) => {
        return selectedItems.includes(item.id)
          ? sum + item.price * item.quantity
          : sum;
      }, 0);
      setTotalPrice(total);
    }
  }, [selectedItems, DataCart]);

  // Handle checkbox changes
  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (DataCart) {
      if (
        selectedItems.length === DataCart.filter((item) => item.warning).length
      ) {
        setSelectedItems([]);
      } else {
        const allAvailableIds = DataCart.filter((item) => item.warning).map(
          (item) => item.id
        );
        setSelectedItems(allAvailableIds);
      }
    }
  };

  // Handle quantity changes
  const updateQuantity = async (id) => {
    toast.dismiss();
    const updateItem = await addCart(id.product_id, apiKey);
    if (updateItem.ok) {
      toast.success(updateItem.message);
      fetchCart();
    } else {
      toast.error(updateItem.message);
    }
  };

  const deleteQuantity = async (item) => {
    toast.dismiss();
    if (item.quantity === 1) {
      if (!confirm("Xóa sản phẩm này khỏi giỏ hàng?")) return;
      await getCartDeleteQuantity(item.id);
    } else if (item.quantity > 1) {
      await getCartDeleteQuantity(item.id);
    }
    fetchCart();
  };

  const handleDelete = async (id) => {
    toast.dismiss();
    const deleteItem = await getCartDelete(id);
    if (deleteItem.ok) {
      toast.success(deleteItem.message);
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
      fetchCart();
    } else {
      toast.error(deleteItem.message);
    }
  };

  if (loading) return <Loading />;
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

          {DataCart?.length === 0 && (
            <div className="text-center text-gray-500 p-4">
              Giỏ hàng của bạn trống
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:gap-8">
            <div className="w-full lg:w-2/3 p-4">
              <div className="max-h-[110vh] overflow-y-auto">
                <ul className="divide-y divide-gray-200">
                  {DataCart.map((item) => (
                    <li
                      key={item.id}
                      className="py-4 flex flex-row sm:items-center gap-4"
                    >
                      <div className="flex items-center gap-4">
                        {!item.warning ? (
                          <div className="text-red-500 font-semibold p-2">
                            Hết hàng
                          </div>
                        ) : (
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                          />
                        )}
                        <img
                          src={item.image_url}
                          alt={item.product_name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {item.product_name}
                        </h3>
                        <p className="text-gray-600">
                          {item.price.toLocaleString("vi-VN")} ₫
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-md">
                          {!item.warning ? (
                            <div className="text-red-500 font-semibold p-2">
                              Hết hàng
                            </div>
                          ) : (
                            <>
                              <button
                                className="p-1 sm:p-2 hover:bg-gray-100"
                                onClick={() => deleteQuantity(item)}
                              >
                                <FaMinus className="w-4 h-4" />
                              </button>
                              <span className="px-2 sm:px-4">
                                {item.quantity}
                              </span>
                              <button
                                className="p-1 sm:p-2 hover:bg-gray-100"
                                onClick={() => updateQuantity(item)}
                              >
                                <FaPlus className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 p-2"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrashAlt className="w-5 h-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-1/3 p-4 bg-gray-50">
              {DataCart.length > 0 && (
                <PayCart items={selectedItemsData} totalPrice={totalPrice} />
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-8">
        <PageFooter />
      </footer>
    </div>
  );
}
