/* eslint-disable react/prop-types */
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
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
            {displayDiscount} OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-red-500 font-bold">
              {discountedPrice.toLocaleString("vi-VN")} ₫
            </span>
            {product.discount > 0 && (
              <span className="text-gray-500 line-through ml-2 text-sm">
                {product.price.toLocaleString("vi-VN")} ₫
              </span>
            )}
          </div>
          <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors  duration-300 relative group">
            <span className="absolute right-[3rem] bottom-1 w-max opacity-0 group-hover:opacity-100 bg-blue-500 text-white text-xs p-2 rounded transition-opacity duration-300">
              Thêm vào giỏ hàng
            </span>
            <FaCartPlus size={20} />
          </button>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <div className="flex items-center mr-4">
              <FaStar className="text-yellow-400 mr-1" />
              <span>{product.rating}</span>
            </div>
            <span>{product.sold} đã bán</span>
          </div>
          <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300 relative group">
            <span className="absolute right-[3rem] bottom-1 w-max opacity-0 group-hover:opacity-100 bg-red-500 text-white text-xs p-2 rounded transition-opacity duration-300">
              Mua Ngay
            </span>
            <PiContactlessPaymentLight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Products() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header>
        <Nav />
      </header>
      <main className="container w-4/5 mx-auto px-4 py-8">
        <h1 className="text-4xl text-center font-bold mb-8">Đồ Ăn</h1>
        <div className="flex justify-between flex-wrap items-center mb-8 max-md:justify-center">
          <ul className="flex space-x-4">
            {["All", "Đồ Ăn", "Đồ Uống", "Bánh"].map((category, index) => (
              <li key={index}>
                <button
                  className={`px-4 py-2 rounded-full transition-colors duration-300 ${
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
          <div className="flex justify-center  items-center p-4">
            <form className="flex items-center ">
              <input
                type="text"
                id="searchInput"
                placeholder="Nhập món ăn ..."
                className="flex-grow m-0 p-2 border border-gray-300 rounded-l-lg outline-none"
              />
              <button
                type="submit"
                className="py-[13px] px-3 m-0 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 "
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </main>
      <footer className="flex justify-center pb-6">
        {/* chuyển trang */}
        <Stack spacing={2}>
          <Pagination
            count={11}
            defaultPage={1}
            siblingCount={0}
            boundaryCount={2}
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "1rem",
              },
            }}
          />
        </Stack>
      </footer>
    </div>
  );
}
