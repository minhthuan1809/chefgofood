import { useDispatch } from "react-redux";
import { getProducts } from "../../../redux/middlewares/addProduct";

export default function SearchProduct() {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getProducts(e.target.value));
  };
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
