import React, { useRef, useState, useEffect } from "react";
import {
  FaCartPlus,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { PiContactlessPaymentLight } from "react-icons/pi";

export default function TopProducts() {
  const products = [
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image:
        "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
      discount: 0.02,
      sold: 1000,
      rating: 4.1,
    },
    {
      name: "Bánh tráng trộn",
      price: 20000,
      image: "https://tuyetthitbo.com/uploads/source/7.jpg",
      discount: 0.5,
      sold: 1000,
      rating: 4.5,
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
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Sản phẩm được đặt nhiều nhất
          </h2>
          <div className="relative">
            {!isAtStart && (
              <button
                onClick={() => scroll(-500)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition duration-300"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
            )}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto space-x-6 scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-64 md:w-80 bg-white shadow-lg rounded-lg overflow-hidden"
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
                      <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300 relative group">
                        <span className="absolute right-[3rem] bottom-1 w-max opacity-0 group-hover:opacity-100 bg-blue-500 text-white text-xs p-2 rounded transition-opacity duration-300">
                          Thêm vào giỏ hàng
                        </span>
                        <FaCartPlus size={20} />
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center mt-3 text-gray-600">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span>{product.rating}</span>
                        <span className="ml-3">{product.sold} đã bán</span>
                      </div>
                      <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300 relative group">
                        <span className="absolute right-[3rem] bottom-1 w-max opacity-0 group-hover:opacity-100 bg-red-500 text-white text-xs p-2 rounded transition-opacity duration-300">
                          Mua Ngay
                        </span>
                        <PiContactlessPaymentLight size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
