import React, { useEffect, useState } from "react";
import { getTopSellingProducts } from "../../../service/dashboard";

const TopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTopSellingProducts();
      if (result?.data) {
        setProducts(result.data);
      }
    };
    fetchData();
  }, []);

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
              <p className="text-sm text-gray-500">{product.sold} đã bán</p>
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
