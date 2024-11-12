/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getRenderProduct } from "../../../redux/middlewares/admin/product/render_product";
import PaginationPage from "../util/PaginationPage";
import { getDeleteProductAdmin } from "../../../service/server/product/delete_product";
import { toast } from "react-toastify";
import Modal from "../_model_product/Modal";
import Loading from "../util/Loading";
import ExportToExcel from "../_model_product/ExcelProduct";

const ProductManagement = () => {
  // State quản lý form thêm/sửa sản phẩm
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(100);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Sử dụng Redux
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

  // Lấy dữ liệu sản phẩm khi component mount hoặc các dependency thay đổi
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

  // Xử lý xóa sản phẩm
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

  // Xử lý mở modal thêm sản phẩm mới
  const handleAddProduct = () => {
    setEditData(null);
    setShowModal(true);
  };

  // Xử lý mở modal sửa sản phẩm
  const handleEditProduct = (product) => {
    setEditData(product);
    setShowModal(true);
  };

  // Xử lý đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-4 w-full mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-bold text-gray-500">Quản lý sản phẩm</h2>
          <div className="flex items-center gap-2">
            {" "}
            <button
              onClick={handleAddProduct}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <FaPlus className="mr-2" />
              Thêm
            </button>
            {/* btn xuất excel */}
            <ExportToExcel data={products} fileName="DanhSachSanPham" />
          </div>
        </div>

        <div className="p-4">
          {/* Search Bar */}
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={fetchData}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              <BiRefresh className="text-xl text-gray-500" />
            </button>
            {/* Loại */}
            <div className="flex items-center gap-2">
              <label className="text-gray-500">Loại:</label>
              <select
                className="border rounded px-3 py-2 outline-none"
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
            {/* Số lượng */}
            <div className="flex items-center gap-2">
              <label className="text-gray-500">Số lượng:</label>
              <select
                className="border rounded px-3 py-2 outline-none"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
              >
                {Array.from({ length: 100 }, (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* sản phẩm */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left text-gray-500">STT</th>
                  <th className="p-2 text-left text-gray-500">Hình ảnh</th>
                  <th className="p-2 text-left text-gray-500">Tên</th>
                  <th className="p-2 text-left text-gray-500">Mô tả</th>
                  <th className="p-2 text-left text-gray-500">Giảm giá</th>
                  <th className="p-2 text-right text-gray-500">Giá</th>
                  <th className="p-2 text-right text-gray-500">Số lượng</th>
                  <th className="p-2 text-center text-gray-500">Loại</th>
                  <th className="p-2 text-center text-gray-500">Trạng thái</th>
                  <th className="p-2 text-center text-gray-500">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products && products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product.id} className="border-t hover:bg-gray-50">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2 relative">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        {product.discount > 0 && (
                          <span className="absolute top-1 left-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                            -{product.discount}%
                          </span>
                        )}
                      </td>
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">{product.description}</td>
                      <td className="p-2">{product.discount}%</td>

                      <td className="p-2 text-right">
                        {parseInt(product.price).toLocaleString()}đ
                      </td>
                      <td className="p-2 text-right">{product.quantity}</td>
                      <td className="p-2 text-center w-[4rem]">
                        {product.type
                          .toLowerCase()
                          .replace("cake", "Bánh")
                          .replace("water", "Nước")
                          .replace("food", "Đồ ăn")}
                      </td>
                      <td className="p-2 text-center text-sm w-[7rem]">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            product.lock
                              ? "bg-yellow-200 text-yellow-800"
                              : product.status
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {product.lock
                            ? "Đang dừng"
                            : product.status
                            ? "Còn hàng"
                            : "Hết hàng"}
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            className="p-2 text-blue-500 hover:bg-blue-100 rounded"
                            onClick={() => handleEditProduct(product)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="p-2 text-red-500 hover:bg-red-100 rounded"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-500">
                      Không có sản phẩm nào
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
      <div className="mt-4">
        {totalPages === 1 ? null : (
          <PaginationPage count={totalPages} setPage={setPage} />
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
