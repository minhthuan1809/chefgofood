import { useDispatch } from "react-redux";
import { getProducts } from "../../../redux/middlewares/client/addProduct";
import { useState, useCallback, useEffect } from "react";

export default function SearchProduct() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce the search term input
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getProducts(searchTerm));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  return (
    <div>
      <input
        type="search"
        id="searchInput"
        placeholder="Nhập món ăn ..."
        className="flex-grow m-0 p-2 text-sm sm:text-base border border-gray-300 rounded-lg outline-none"
        onChange={handleSearch}
      />
    </div>
  );
}
