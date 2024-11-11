/* eslint-disable react/prop-types */
import { FaStar, FaCartPlus } from "react-icons/fa";
import { PiContactlessPaymentLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCart } from "../../../service/cart_client";

const RenderProduct = ({ product, idProduct }) => {
  const apiKey = useSelector((state) => state.login.apikey);

  if (product.lock) return null;
  const calculateDiscountedPrice = (price, discount) => {
    const discountRate = discount > 1 ? discount / 100 : discount;
    return price * (1 - discountRate);
  };

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount
  );
  const displayDiscount = `${product.discount}%`;

  const addProductToCart = async () => {
    toast.dismiss();
    const addItem = await addCart(product.id, apiKey);
    if (addItem.ok) {
      toast.success(addItem.message);
    } else {
      toast.error(addItem.message);
    }
  };

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
          <div className="relative">
            <img
              src={product.image_url}
              alt={product.name}
              className={`w-full h-36 sm:h-48 object-cover ${
                !product.status ? "opacity-60 grayscale" : ""
              }`}
            />
            {!product.status && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                <div className="bg-white/90 px-4 py-2 rounded-lg shadow-xl">
                  <div className="flex flex-col items-center">
                    <span className="text-red-600 font-bold text-lg tracking-wider">
                      HẾT HÀNG
                    </span>
                    <span className="text-gray-600 text-xs mt-1">
                      Sẽ sớm trở lại
                    </span>
                  </div>
                </div>
              </div>
            )}
            {product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                {displayDiscount} OFF
              </div>
            )}
          </div>
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
            {!product.status ? (
              <span className="text-red-500 font-bold text-sm sm:text-lg">
                Hết hàng
              </span>
            ) : (
              <>
                <span className="text-red-500 font-bold text-sm sm:text-lg">
                  {discountedPrice.toLocaleString("vi-VN")} ₫
                </span>
                {product.discount > 0 && (
                  <span className="text-gray-500 line-through ml-1 sm:ml-2 text-xs sm:text-sm">
                    {product.price.toLocaleString("vi-VN")} ₫
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <div className="flex items-center mr-1 sm:mr-2">
              <FaStar className="text-yellow-400 mr-1" />
              <span>{Number(product.average_rating).toFixed(1)}</span>
            </div>
            <span>{product.sold} đã bán</span>
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => addProductToCart(product)}
              disabled={!product.status}
              className={`${
                product.status
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              <FaCartPlus size={16} />
            </button>
            <button
              disabled={!product.status}
              className={`${
                product.status
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white p-1.5 sm:p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              <PiContactlessPaymentLight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderProduct;
