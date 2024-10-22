import React from "react";
import {
  FiGlobe,
  FiUser,
  FiHeart,
  FiEdit3,
  FiShoppingCart,
  FiSmile,
} from "react-icons/fi";

const OrderingSteps = () => {
  const steps = [
    {
      icon: <FiGlobe size={24} />,
      title: "Vào trang web của FASSTFOOT",
      description: "Truy cập website để bắt đầu đặt món",
    },
    {
      icon: <FiUser size={24} />,
      title: "Đăng nhập tài khoản",
      description: "Đăng nhập để nhận ưu đãi đặc biệt",
    },
    {
      icon: <FiHeart size={24} />,
      title: "Lựa chọn sản phẩm yêu thích",
      description: "Khám phá menu đa dạng của chúng tôi",
    },
    {
      icon: <FiEdit3 size={24} />,
      title: "Thêm ghi chú",
      description: "Tùy chỉnh món ăn theo ý thích",
    },
    {
      icon: <FiShoppingCart size={24} />,
      title: "Tạo đơn hàng",
      description: "Xác nhận và thanh toán đơn hàng",
    },
    {
      icon: <FiSmile size={24} />,
      title: "Chuẩn bị tận hưởng",
      description: "Đơn hàng đang được chuẩn bị",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Các bước đặt món tại FASTFOOT
        </h2>

        <div className="relative grid grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Horizontal line to next item (for items not at the end of row) */}
              {index % 2 === 0 && index !== steps.length - 1 && (
                <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-blue-200" />
              )}

              {/* Vertical line to items below (for all items except last row) */}
              {index < steps.length - 2 && (
                <div className="absolute left-1/2 top-full w-0.5 h-8 bg-blue-200" />
              )}

              <div className="bg-white p-6 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 h-full">
                <div className="flex items-start space-x-4">
                  {/* Icon container */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm font-bold text-blue-600 border-2 border-blue-200 group-hover:border-blue-400">
                      {index + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderingSteps;
