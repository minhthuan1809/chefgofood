/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFileExcel,
  FaFilter,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getRenderProduct } from "../../../redux/middlewares/admin/product/render_product";
import PaginationPage from "../util/PaginationPage";
import { getDeleteProductAdmin } from "../../../service/server/product/delete_product";
import { toast } from "react-toastify";
import Modal from "../_model_product/Modal";
import Loading from "../util/Loading";
import ExportToExcel from "../_model_product/ExcelProduct";

const ProductManagement = () => {
  // State management
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(100);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsAdmin.products);

  // Debounce function
  const debounce = (callback, delay) => {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback();
      }, delay);
    };
  };

  // Fetch product data
  const fetchData = async () => {
    setIsLoading(true);
    const res = await dispatch(getRenderProduct(searchTerm, limit, page, type));
    setTotalPages(res.data.pagination.total_pages);
    setIsLoading(false);
  };

  // Debounced search
  const debouncedSearch = debounce(() => {
    fetchData();
  }, 500);

  useEffect(() => {
    debouncedSearch();
  }, [dispatch, limit, page, searchTerm, type]);

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;
    try {
      toast.dismiss();
      const result = await getDeleteProductAdmin(id);
      if (result.success) {
        toast.success(result.message);
        dispatch(getRenderProduct(searchTerm, limit, page, type));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xóa sản phẩm!");
      console.error(error);
    }
  };

  // Add new product
  const handleAddProduct = () => {
    setEditData(null);
    setShowModal(true);
  };

  // Edit product
  const handleEditProduct = (product) => {
    setEditData(product);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-6 w-full mx-auto bg-gray-50 min-h-screen">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            {/* Header */}
            <div className=" p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold  flex items-center">
                  Quản lý sản phẩm
                  <span className="ml-2 bg-white bg-opacity-20 text-white text-sm py-1 px-3 rounded-full">
                    {products?.length || 0} sản phẩm
                  </span>
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAddProduct}
                    className="flex items-center px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-all shadow-sm font-medium"
                  >
                    <FaPlus className="mr-2" />
                    Thêm sản phẩm
                  </button>
                  <ExportToExcel
                    data={products}
                    fileName="DanhSachSanPham"
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm font-medium"
                  >
                    <FaFileExcel className="mr-2" />
                    Xuất Excel
                  </ExportToExcel>
                </div>
              </div>

              {/* Search bar */}
              <div className="mt-6 flex">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên sản phẩm..."
                    className="w-full pl-12 pr-4 py-3 rounded-l-lg border border-gray-200 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={fetchData}
                  className="px-5 py-3 bg-white hover:bg-gray-100 transition-colors border-l border-gray-200"
                >
                  <BiRefresh className="text-xl text-gray-500" />
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-5 py-3 bg-white hover:bg-gray-100 transition-colors rounded-r-lg flex items-center gap-2 font-medium"
                >
                  <FaFilter className="text-gray-500" />
                  <span className="text-gray-700">Bộ lọc</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
                  <label className="text-gray-700 font-medium">Loại:</label>
                  <select
                    className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-700"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {[
                      { value: "", label: "Tất cả" },
                      { value: "water", label: "Nước uống" },
                      { value: "cake", label: "Bánh" },
                      { value: "food", label: "Đồ ăn" },
                    ].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
                  <label className="text-gray-700 font-medium">Hiển thị:</label>
                  <select
                    className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-300 bg-white text-gray-700"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                  >
                    {[10, 25, 50, 75, 100].map((num) => (
                      <option key={num} value={num}>
                        {num} sản phẩm
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 text-left text-gray-700 font-semibold">
                        STT
                      </th>
                      <th className="p-4 text-left text-gray-700 font-semibold">
                        Hình ảnh
                      </th>
                      <th className="p-4 text-left text-gray-700 font-semibold">
                        Tên
                      </th>
                      <th className="p-4 text-left text-gray-700 font-semibold">
                        Mô tả
                      </th>
                      <th className="p-4 text-left text-gray-700 font-semibold">
                        Giảm giá
                      </th>
                      <th className="p-4 text-right text-gray-700 font-semibold">
                        Giá
                      </th>
                      <th className="p-4 text-right text-gray-700 font-semibold">
                        Số lượng
                      </th>
                      <th className="p-4 text-center text-gray-700 font-semibold">
                        Loại
                      </th>
                      <th className="p-4 text-center text-gray-700 font-semibold">
                        Trạng thái
                      </th>
                      <th className="p-4 text-center text-gray-700 font-semibold">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products && products.length > 0 ? (
                      products.map((product, index) => (
                        <tr
                          key={product.id}
                          className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                        >
                          <td className="p-4 text-gray-800">{index + 1}</td>
                          <td className="p-4 relative">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                              {product.discount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1">
                                  -{product.discount}%
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 font-medium text-gray-800">
                            {product.name}
                          </td>
                          <td className="p-4 text-gray-600 max-w-xs truncate">
                            {product.description}
                          </td>
                          <td className="p-4">
                            {product.discount > 0 ? (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                {product.discount}%
                              </span>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="p-4 text-right font-medium text-gray-800">
                            {parseInt(product.price).toLocaleString()}đ
                          </td>
                          <td className="p-4 text-right">
                            <span
                              className={`font-medium ${
                                product.quantity < 10
                                  ? "text-orange-600"
                                  : "text-gray-800"
                              }`}
                            >
                              {product.quantity}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                product.type === "water"
                                  ? "bg-blue-100 text-blue-800"
                                  : product.type === "cake"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {product.type
                                .toLowerCase()
                                .replace("cake", "Bánh")
                                .replace("water", "Nước")
                                .replace("food", "Đồ ăn")}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                product.lock
                                  ? "bg-yellow-100 text-yellow-800"
                                  : product.status
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {product.lock
                                ? "Đang dừng"
                                : product.status
                                ? "Còn hàng"
                                : "Hết hàng"}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                onClick={() => handleEditProduct(product)}
                                title="Chỉnh sửa"
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                onClick={() => handleDeleteProduct(product.id)}
                                title="Xóa"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="10"
                          className="p-8 text-center text-gray-500"
                        >
                          <div className="flex flex-col items-center">
                            <FaExclamationTriangle className="text-yellow-500 text-4xl mb-2" />
                            <p className="text-lg">Không có sản phẩm nào</p>
                            <p className="text-sm text-gray-400 mt-1">
                              Thêm sản phẩm mới hoặc thay đổi bộ lọc
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Modal
            isOpen={showModal}
            onClose={handleCloseModal}
            editData={editData}
            fetchData={fetchData}
          />

          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <PaginationPage count={totalPages} setPage={setPage} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductManagement;
