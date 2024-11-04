import { useState } from "react";
import Nav from "../header/Nav";
import PageFooter from "../footer/PageFooter";
import { FaTrashAlt, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import PayCart from "./cart/PayCart";
import SupportChat from "../messger/SupportChat";

const initialCartItems = [
  {
    id: 1,
    name: "Áo thun",
    image: "/api/placeholder/80/80",
    price: 250000,
    quantity: 2,
    checked: false,
  },
  {
    id: 2,
    name: "Quần jeans",
    image: "/api/placeholder/80/80",
    price: 550000,
    quantity: 1,
    checked: false,
  },
  {
    id: 3,
    name: "Giày sneaker",
    image: "/api/placeholder/80/80",
    price: 800000,
    quantity: 1,
    checked: false,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Handle checkbox toggle
  const toggleItemCheck = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Handle quantity changes
  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // Handle item removal
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-white">
        <Nav />
        <SupportChat />
      </header>

      <main className="flex-grow pt-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 bg-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center text-gray-800">
              <FaShoppingCart className="mr-2" /> Giỏ hàng của bạn
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-8">
            <div className="w-full lg:w-2/3 p-4">
              <div className="max-h-[60vh] overflow-y-auto">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="py-4 flex flex-row sm:items-center gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={item.checked}
                          onChange={() => toggleItemCheck(item.id)}
                        />
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">
                          {item.price.toLocaleString("vi-VN")} ₫
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-md">
                          <button
                            className="p-1 sm:p-2 hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <FaMinus className="w-4 h-4" />
                          </button>
                          <span className="px-2 sm:px-4">{item.quantity}</span>
                          <button
                            className="p-1 sm:p-2 hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <FaPlus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 p-2"
                          onClick={() => removeItem(item.id)}
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
              <PayCart items={cartItems.filter((item) => item.checked)} />
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
