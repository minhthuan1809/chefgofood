import React, { useState } from "react";
import { FiTag, FiClock, FiChevronRight } from "react-icons/fi";
import Nav from "../header/Nav";
import { useAuth0 } from "@auth0/auth0-react";

const DiscountCard = ({ title, discount, minOrder, validity, category }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-blue-600 mb-3">{discount} OFF</p>
      <div className="flex items-center text-gray-600 text-sm mb-1">
        <FiTag className="mr-2" />
        <span>Đơn tối thiểu {minOrder}</span>
      </div>
      <div className="flex items-center text-gray-600 text-sm mb-1">
        <FiClock className="mr-2" />
        <span>Hiệu lực: {validity}</span>
      </div>
      <div className="text-sm text-blue-600">Áp dụng cho: {category}</div>
    </div>
    <button className="w-full py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center">
      Dùng ngay
      <FiChevronRight className="ml-2" />
    </button>
  </div>
);

const Discount = () => {
  const { isAuthenticated } = useAuth0();

  const discounts = [
    {
      title: "Ưu đãi đặc biệt",
      discount: "30%",
      minOrder: "150K",
      validity: "1 ngày",
      category: "Đồ ăn",
    },
    {
      title: "Giảm giá cuối tuần",
      discount: "25%",
      minOrder: "100K",
      validity: "2 ngày",
      category: "Đồ uống",
    },
    {
      title: "Khuyến mãi mùa hè",
      discount: "20%",
      minOrder: "80K",
      validity: "3 ngày",
      category: "Bánh",
    },
    {
      title: "Khuyến mãi mùa hè",
      discount: "20%",
      minOrder: "80K",
      validity: "3 ngày",
      category: "Bánh",
    },
    {
      title: "Ưu đãi đặc biệt",
      discount: "30%",
      minOrder: "150K",
      validity: "1 ngày",
      category: "Đồ ăn",
    },
    {
      title: "Giảm giá cuối tuần",
      discount: "25%",
      minOrder: "100K",
      validity: "2 ngày",
      category: "Đồ uống",
    },
    {
      title: "Khuyến mãi mùa hè",
      discount: "20%",
      minOrder: "80K",
      validity: "3 ngày",
      category: "Bánh",
    },
    {
      title: "Khuyến mãi mùa hè",
      discount: "20%",
      minOrder: "80K",
      validity: "3 ngày",
      category: "Bánh",
    },
    {
      title: "Ưu đãi đặc biệt",
      discount: "30%",
      minOrder: "150K",
      validity: "1 ngày",
      category: "Đồ ăn",
    },
    {
      title: "Giảm giá cuối tuần",
      discount: "25%",
      minOrder: "100K",
      validity: "2 ngày",
      category: "Đồ uống",
    },
    {
      title: "Khuyến mãi mùa hè",
      discount: "20%",
      minOrder: "80K",
      validity: "3 ngày",
      category: "Bánh",
    },
    {
      title: "Khuyến mãi mùa hè",
      discount: "20%",
      minOrder: "80K",
      validity: "3 ngày",
      category: "Bánh",
    },
  ];

  return (
    <>
      <header>
        <Nav />
      </header>
      <div className="bg-gray-100 min-h-screen py-[7rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Mã giảm giá của bạn
          </h1>
          {isAuthenticated ? (
            <div>
              <form className="mb-8">
                <div className="flex flex-col sm:flex-row shadow-sm rounded-lg overflow-hidden">
                  <input
                    type="text"
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Nhập mã giảm giá"
                    className="flex-grow px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition duration-300 mt-2 sm:mt-0"
                  >
                    Áp dụng
                  </button>
                </div>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {discounts.map((discount, index) => (
                  <DiscountCard key={index} {...discount} />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center text-blue-600 pb-5">
                Bạn Chưa đăng nhập bạn cần đăng nhập
              </p>
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Ưu đãi hấp dẫn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {discounts.map((discount, index) => (
              <DiscountCard key={index} {...discount} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discount;
