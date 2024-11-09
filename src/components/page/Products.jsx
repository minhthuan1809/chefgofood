/* eslint-disable react/prop-types */
import Nav from "../header/Nav";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/middlewares/client/addProduct";
import Loading from "../util/Loading";
import RenderProduct from "./products/RenderProduct";
import PaginationPage from "./products/PaginationPage";
import SearchProduct from "./products/SearchProduct";
import SupportChat from "../messger/SupportChat";

const Products = () => {
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state.product.products);

  // Trạng thái để quản lý loại sản phẩm hiện tại
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await dispatch(getProducts("", 1));
      setPage(data.data.pagination.total_pages);
      setLoading(false);
    };
    fetchData();
  }, [page, selectedCategory]);

  // Hàm để lọc sản phẩm theo loại
  const filterProductsByCategory = (products, category) => {
    if (category === "All") return products;

    // Đối tượng ánh xạ để chuyển đổi tên loại sản phẩm
    const categoryMapping = {
      "Đồ Ăn": "food",
      "Đồ Uống": "water",
      Bánh: "cake",
    };

    // Lấy loại sản phẩm tương ứng từ ánh xạ
    const categoryType = categoryMapping[category] || category;
    return products.filter((product) => product.type === categoryType);
  };

  const filteredProducts = filterProductsByCategory(
    dataProduct,
    selectedCategory
  );

  return (
    <div className="bg-gray-100">
      <header>
        <Nav />
        <SupportChat />
      </header>
      <main className="container m-auto px-2 sm:px-4 xl:w-[85%] sm:py-8">
        <div className="flex flex-col pt-[6rem] sm:flex-row justify-between items-center mb-4 sm:mb-8">
          <ul className="flex flex-wrap justify-center sm:justify-start space-x-2 mb-4 sm:mb-0">
            {["All", "Đồ Ăn", "Đồ Uống", "Bánh"].map((category, index) => (
              <li key={index} className="mb-2 sm:mb-0">
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full transition-colors duration-300 ${
                    category === selectedCategory
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
            <div className="flex items-center">
              <SearchProduct />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {loading ? (
            <Loading />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <RenderProduct
                key={product.id}
                product={product}
                idProduct={product.id}
              />
            ))
          ) : (
            <p className="text-center">Chưa có sản phẩm nào...</p>
          )}
        </div>
      </main>
      <footer className="flex justify-center pb-4 sm:pb-6">
        {page > 1 && <PaginationPage page={page} />}
      </footer>
    </div>
  );
};

export default Products;
