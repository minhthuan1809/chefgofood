import React from "react";
import Nav from "../header/Nav";
import { FaCartPlus, FaStar, FaSearch } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PiContactlessPaymentLight } from "react-icons/pi";
const products = [
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image: "https://tuyetthitbo.com/uploads/source/7.jpg",
    discount: 0.01,
    sold: 1000,
    rating: 4.3,
  },
  {
    name: "Bánh tráng trộn",
    price: 20000,
    image:
      "https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/g/a/garangiavi_ngotcay_2.jpg",
    discount: 0,
    sold: 1000,
    rating: 4.3,
  },
];

const ProductCard = ({ product }) => {
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
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 sm:h-48 object-cover"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs sm:text-sm font-bold">
            {displayDiscount} OFF
          </div>
        )}
      </div>
      <div className="p-2 sm:p-4">
        <h3 className="font-bold text-sm sm:text-lg mb-1 sm:mb-2 truncate">
          {product.name}
        </h3>
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
            <button className="bg-blue-500 text-white p-1 sm:p-2 rounded-full hover:bg-blue-600 transition-colors duration-300 group">
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
export default function Products() {
  return (
    <div className="bg-gray-100">
      <header>
        <Nav />
      </header>
      <main className="container m-auto px-2  sm:px-4  sm:py-8">
        <div className="flex flex-col pt-[6rem] sm:flex-row justify-between items-center mb-4 sm:mb-8">
          <ul className="flex flex-wrap justify-center sm:justify-start space-x-2 mb-4 sm:mb-0">
            {["All", "Đồ Ăn", "Đồ Uống", "Bánh"].map((category, index) => (
              <li key={index} className="mb-2 sm:mb-0">
                <button
                  className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full transition-colors duration-300 ${
                    index === 0
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
          <div className="w-full sm:w-auto">
            <form className="flex items-center">
              <input
                type="text"
                id="searchInput"
                placeholder="Nhập món ăn ..."
                className="flex-grow m-0 p-2 text-sm sm:text-base border border-gray-300 rounded-l-lg outline-none"
              />
              <button
                type="submit"
                className="py-3 px-3 m-0 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </main>
      <footer className="flex justify-center pb-4 sm:pb-6">
        <Stack spacing={2}>
          <Pagination
            count={11}
            defaultPage={1}
            siblingCount={0}
            boundaryCount={2}
            size="small"
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: { xs: "0.75rem", sm: "1rem" },
              },
            }}
          />
        </Stack>
      </footer>
    </div>
  );
}
