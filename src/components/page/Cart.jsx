import { useState } from "react";
import Nav from "../header/Nav";
import PageFooter from "../footer/PageFooter";
import { FaTrashAlt, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import PayCart from "./cart/PayCart";

const initialCartItems = [
  {
    id: 1,
    name: "Áo thun",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 250000,
    quantity: 2,
  },
  {
    id: 2,
    name: "Quần jeans",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 550000,
    quantity: 1,
  },
  {
    id: 3,
    name: "Giày sneaker",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 800000,
    quantity: 1,
  },
  {
    id: 4,
    name: "Áo thunÁo thunÁo thun",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 250000,
    quantity: 2,
  },
  {
    id: 5,
    name: "Quần jeans",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 550000,
    quantity: 1,
  },
  {
    id: 6,
    name: "Giày sneaker",
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    price: 800000,
    quantity: 1,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  return (
    <div className="min-h-screen flex flex-col mt-[1rem]">
      <header className="fixed top-0 w-full z-50 bg-white">
        <Nav />
      </header>

      <main className="flex-grow pt-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 bg-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center text-gray-800">
              <FaShoppingCart className="mr-2" /> Giỏ hàng của bạn
            </h2>
          </div>
<<<<<<< HEAD
          <div className="flex flex-col md:flex-row">
            {/* Left side - Product list */}
            <div className="w-full md:w-2/3 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="py-4 flex flex-row sm:items-center"
                  >
                    <div className="flex items-center mb-2 sm:mb-0">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItemCheck(item.id)}
                        className="mr-4"
                      />
                      <div className="w-20 h-20 mr-4">
=======

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
                        <input type="checkbox" className="w-4 h-4" />
>>>>>>> c355b36ec85e2a368126c6b0565c385f8c952e34
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
                          <button className="p-1 sm:p-2 hover:bg-gray-100">
                            <FaMinus className="w-4 h-4" />
                          </button>
                          <span className="px-2 sm:px-4">{item.quantity}</span>
                          <button className="p-1 sm:p-2 hover:bg-gray-100">
                            <FaPlus className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="text-red-500 hover:text-red-700 p-2">
                          <FaTrashAlt className="w-5 h-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-1/3 p-4 bg-gray-50">
              <PayCart />
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
