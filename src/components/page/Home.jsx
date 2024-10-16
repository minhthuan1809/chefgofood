import React, { useRef } from "react";
import {
  FaSearch,
  FaCartPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import PageFooter from "../footer/PageFooter";
import Nav from "../header/Nav";

export default function Home() {
  const products = [
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
      discount: 0.2,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
      discount: 0.2,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
      discount: 0.2,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
      discount: 0.2,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
      discount: 0.2,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
      discount: 0.2,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
      discount: 0.2,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://i.ytimg.com/vi/c9GfHgMk1ac/maxresdefault.jpg",
      discount: 0.2,
    },
  ];

  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Nav />
      </header>
      <main>
        <section className="relative h-screen">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Banner FastFood"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center text-white">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                FASTFOOD
              </motion.h1>
              <motion.p
                className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Chào mừng bạn đến với FASTFOOD – nơi mang đến những trải nghiệm
                ẩm thực tuyệt vời với sự nhanh chóng, tiện lợi và hương vị tuyệt
                hảo.
              </motion.p>
              <motion.div
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-xl sm:text-2xl font-semibold mb-2">
                  Đặt Đồ ăn, giao hàng từ chỉ 30 phút
                </p>
                <p className="text-base sm:text-lg">
                  Thời gian mở cửa 6:30 A.M - 12:00 P.M
                </p>
              </motion.div>
              <motion.form
                className="flex flex-col sm:flex-row justify-center items-center gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <input
                  type="search"
                  placeholder="Tìm địa điểm, món ăn, địa chỉ..."
                  className="w-full sm:w-96 p-3 sm:p-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  <FaSearch className="mr-2" />
                  Tìm kiếm
                </button>
              </motion.form>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              Sản phẩm được đặt nhiều nhất
            </h2>
            <div className="relative">
              <button
                onClick={() => scroll(-300)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition duration-300"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <div
                ref={scrollRef}
                className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    className="flex-shrink-0 w-72 bg-white shadow-lg rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm font-semibold rounded">
                        {Math.round(product.discount * 100)}% OFF
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-500 line-through">
                            {product.price.toLocaleString("vi-VN")} đ
                          </p>
                          <p className="text-xl font-bold text-red-600">
                            {(
                              product.price *
                              (1 - product.discount)
                            ).toLocaleString("vi-VN")}{" "}
                            đ
                          </p>
                        </div>
                        <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
                          <FaCartPlus className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => scroll(300)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition duration-300"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <PageFooter />
      </footer>
    </div>
  );
}
