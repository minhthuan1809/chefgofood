/* eslint-disable react/prop-types */
import { FaStar, FaCartPlus } from "react-icons/fa";
import { PiContactlessPaymentLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const RenderProduct = ({ product, idProduct }) => {
  const calculateDiscountedPrice = (price, discount) => {
    const discountRate = discount > 1 ? discount / 100 : discount;
    return price * (1 - discountRate);
  };

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount
  );
  const displayDiscount =
    product.discount > 1
      ? `${product.discount}%`
      : `${product.discount * 100}%`;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Link
          to={`/detail/${product.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim()}/${idProduct}`}
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-36 sm:h-48 object-cover"
          />
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
              {displayDiscount} OFF
            </div>
          )}
        </Link>
      </div>
      <div className="p-2 sm:p-4">
        <Link
          to={`/detail/${product.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim()}/${idProduct}`}
        >
          <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2 truncate">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <div>
            <span className="text-red-500 font-bold text-sm sm:text-lg">
              {discountedPrice.toLocaleString("vi-VN")} ₫
            </span>
            {product.discount > 0 && (
              <span className="text-gray-500 line-through ml-1 sm:ml-2 text-xs sm:text-sm">
                {product.price.toLocaleString("vi-VN")} ₫
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <div className="flex items-center mr-1 sm:mr-2">
              <FaStar className="text-yellow-400 mr-1" />
              <span>{product.rating}</span>
            </div>
            <span>{product.sold} đã bán</span>
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <button className="bg-blue-500 text-white p-1 sm:p-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
              <FaCartPlus size={16} />
            </button>
            <button className="bg-red-500 text-white p-1 sm:p-2 rounded-full hover:bg-red-600 transition-colors duration-300">
              <PiContactlessPaymentLight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderProduct;
