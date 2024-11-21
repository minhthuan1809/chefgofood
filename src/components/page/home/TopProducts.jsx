/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import {
  FaCartPlus,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { PiContactlessPaymentLight } from "react-icons/pi";
import { getUiTopProduct } from "../../../service/ui/ui_topProduct";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addCart } from "../../../service/cart_client";
import { useSelector } from "react-redux";
import ModelPayCart from "../cart/ModelPayCart";
export default function TopProducts() {
  const [dataproduct, getDataProduct] = useState([]);
  const navigator = useNavigate();
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const apiKey = useSelector((state) => state.login.apikey);
  const [isOpen, setIsOpen] = useState(false);
  const [productPay, setProductPay] = useState([]);
  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
    setTimeout(checkScrollPosition, 100);
  };

  const checkScrollPosition = () => {
    const { scrollLeft } = scrollRef.current;
    setIsAtStart(scrollLeft === 0);
    // Sửa logic kiểm tra cuối để chính xác hơn
  };

  useEffect(() => {
    const ref = scrollRef.current;
    ref.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();

    return () => {
      ref.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  useEffect(() => {
    async function fectData() {
      const data = await getUiTopProduct();
      if (!data.ok) navigator("/error");
      getDataProduct(data.data.products);
    }
    fectData();
  }, [navigator]);
  const addProductToCart = async (id) => {
    toast.dismiss();
    const addItem = await addCart(id, apiKey);
    if (addItem.ok) {
      toast.success(addItem.message);
    } else {
      toast.error(addItem.message);
    }
  };

  // xử lý mua ngay
  const handleBuyNow = (product) => {
    console.log("thuan", product);
    setProductPay(product);
    setIsOpen(true);
  };
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
              {dataproduct.map((product, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-64 md:w-80 bg-white shadow-lg rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/detail/${product.name
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/đ/g, "d")
                      .replace(/[^a-z0-9\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")
                      .trim()}/${product.id}`}
                  >
                    <div className="relative">
                      <img
                        src={product.image_url}
                        alt={product.description}
                        className="w-full h-48 object-cover"
                      />
                      {product.discount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm font-semibold rounded">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4 mt-4">
                    <Link
                      to={`/detail/${product.name
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/đ/g, "d")
                        .replace(/[^a-z0-9\s-]/g, "")
                        .replace(/\s+/g, "-")
                        .replace(/-+/g, "-")
                        .trim()}/${product.id}`}
                    >
                      <h3 className="text-xl font-semibold mb-1">
                        {product.name}
                      </h3>{" "}
                    </Link>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500 line-through">
                          {product.price.toLocaleString("vi-VN")} đ
                        </p>
                        <p className="text-xl font-bold text-red-600">
                          {(
                            product.price *
                            (1 - product.discount / 100)
                          ).toLocaleString("vi-VN")}{" "}
                          đ
                        </p>
                      </div>
                      <button
                        onClick={() => addProductToCart(product.id)}
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300 relative group"
                      >
                        <span className="absolute right-[3rem] bottom-1 w-max opacity-0 group-hover:opacity-100 bg-blue-500 text-white text-xs p-2 rounded transition-opacity duration-300">
                          Thêm vào giỏ hàng
                        </span>
                        <FaCartPlus size={20} />
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center mt-3 text-gray-600">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span>{Number(product.average_rating).toFixed(1)}</span>
                        <span className="ml-3">{product.sold} đã bán</span>
                      </div>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300 relative group"
                      >
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
            {/* Sửa phần hiển thị nút phải */}
            {scrollRef.current &&
              scrollRef.current.scrollWidth > scrollRef.current.clientWidth && (
                <button
                  onClick={() => scroll(500)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md z-10 hover:bg-gray-100 transition duration-300"
                >
                  <FaChevronRight className="text-gray-600" />
                </button>
              )}

            {/* // MUA NGAY  */}
            <ModelPayCart
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              items={productPay}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
