/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../header/Nav";
import Loading from "../util/Loading";
import RenderProduct from "./products/RenderProduct";
import PaginationPage from "./products/PaginationPage";
import SearchProduct from "./products/SearchProduct";
import SupportChat from "../messger/SupportChat";
import ModelPayCart from "./cart/ModelPayCart";
import { getProducts } from "../../redux/middlewares/client/addProduct";

const CATEGORIES = [
  { label: "All", value: "All" },
  { label: "Đồ Ăn", value: "food" },
  { label: "Đồ Uống", value: "water" },
  { label: "Bánh", value: "cake" },
];

const Products = () => {
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state.product.products);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [productPay, setProductPay] = useState([]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await dispatch(getProducts("", page));
      setPage(data.data.pagination.total_pages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filterProductsByCategory = React.useMemo(() => {
    return (products, category) => {
      if (category === "All") return products;
      return products.filter((product) => product.type === category);
    };
  }, []);

  const filteredProducts = React.useMemo(
    () => filterProductsByCategory(dataProduct, selectedCategory),
    [dataProduct, selectedCategory, filterProductsByCategory]
  );

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-gray-100">
      <header>
        <Nav />
        <SupportChat />
      </header>
      {loading ? (
        <Loading />
      ) : (
        <>
          <main className="container m-auto px-2 sm:px-4 xl:w-[85%] sm:py-8">
            <div className="flex flex-col pt-[6rem] sm:flex-row justify-between items-center mb-4 sm:mb-8">
              <ul className="flex flex-wrap justify-center sm:justify-start space-x-2 mb-4 sm:mb-0">
                {CATEGORIES.map(({ label, value }) => (
                  <li key={value} className="mb-2 sm:mb-0">
                    <button
                      onClick={() => setSelectedCategory(value)}
                      className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-full transition-colors duration-300 ${
                        value === selectedCategory
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {label}
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <RenderProduct
                    key={product.id}
                    product={product}
                    idProduct={product.id}
                    data={setProductPay}
                    isOpen={setIsOpen}
                  />
                ))
              ) : (
                <p className="text-center col-span-full">
                  Chưa có sản phẩm nào...
                </p>
              )}
            </div>
          </main>
          <ModelPayCart
            isOpen={isOpen}
            onClose={handleCloseModal}
            items={productPay}
          />
          <footer className="flex justify-center pb-4 sm:pb-6">
            {page > 1 && <PaginationPage page={page} />}
          </footer>
        </>
      )}
    </div>
  );
};

export default Products;
