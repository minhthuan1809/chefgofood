import React from "react";

const TopProducts = () => {
  const products = [
    { name: "Áo thun nam", sales: 245, revenue: "12.250.000₫" },
    { name: "Quần jean nữ", sales: 189, revenue: "9.450.000₫" },
    { name: "Giày thể thao", sales: 156, revenue: "7.800.000₫" },
    { name: "Giày thể thao", sales: 156, revenue: "7.800.000₫" },
    { name: "Giày thể thao", sales: 156, revenue: "7.800.000₫" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Top Sản Phẩm</h3>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-500">{product.sales} đã bán</p>
            </div>
            <span className="text-green-500 font-medium">
              {product.revenue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
