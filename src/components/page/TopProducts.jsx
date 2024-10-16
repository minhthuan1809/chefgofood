import React, { useRef, useState, useEffect } from "react";
import { FaCartPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TopProducts() {
  const products = [
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKl9oFDSKxEy5Z2_1EQMQuHk0l1dLxdPS6OA&s",
      discount: 0.05,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
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
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
    checkScrollPosition();
  };

  const checkScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft + clientWidth === scrollWidth);
  };

  useEffect(() => {
    const ref = scrollRef.current;
    ref.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();

    return () => {
      ref.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);
  return (
    <div>
      {" "}
      <section className="py-16 bg-white">
        <div className="container w-full m-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Sản phẩm được đặt nhiều nhất
          </h2>
          <div className="relative">
            {/* Nút Left */}
            {!isAtStart && (
              <button
                onClick={() => scroll(-500)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition duration-300"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
            )}
            {/* Danh sách sản phẩm */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={index}
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
                  <div className="p-4 mt-4">
                    <h3 className="text-xl font-semibold mb-1">
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
            {/* Nút Right */}
            {!isAtEnd && (
              <button
                onClick={() => scroll(500)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition duration-300"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
