import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { getDiscountAdmin } from "../../../service/server/discount/discount_system";
import { BiRefresh } from "react-icons/bi";
import PaginationPage from "../util/PaginationPage";
import Loading from "../util/Loading";
import { deleteDiscountAdmin } from "../../../service/server/discount/distcount_system_delete";
import { toast } from "react-toastify";
import DiscountModalSystem from "../_modal_discount/Model_system";

export default function Sale() {
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    const result = await getDiscountAdmin(page, limit, searchTerm);
    console.log(result);

    let filteredDiscounts = result.data.discounts;

    // Lọc theo danh mục
    if (categoryFilter) {
      filteredDiscounts = filteredDiscounts.filter(
        (discount) => discount.type === categoryFilter
      );
    }

    setDiscounts(filteredDiscounts);
    setPage(result.data.pagination.total_pages);
    setIsLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timeout);
  }, [page, limit, searchTerm, categoryFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa mã giảm giá này không?"))
      return;
    const result = await deleteDiscountAdmin(id);
    if (result.ok) {
      toast.dismiss();
      toast.success(result.message);
      fetchData();
    } else {
      toast.dismiss();
      toast.error(result.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MdDiscount className="text-blue-600" />
          Quản lý mã giảm giá
        </h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          onClick={() => {
            setIsOpen(true);
            setDiscount(null);
          }}
        >
          <FaPlus />
          Thêm mã mới
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              placeholder="Tìm kiếm mã giảm giá..."
              className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:border-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2 border rounded bg-white hover:bg-gray-100 shadow-sm flex items-center gap-2"
            onClick={fetchData}
          >
            <BiRefresh className="text-xl text-gray-500" />
          </button>

          <select
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            <option value="food">Đồ ăn</option>
            <option value="water">Đồ uống</option>
            <option value="cake">Bánh</option>
          </select>

          <div className="flex items-center gap-2">
            <label className="text-gray-500">Số lượng:</label>
            <select
              className="border rounded px-3 py-2 outline-none shadow-sm focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setLimit(parseInt(e.target.value))}
              value={limit}
            >
              {Array.from({ length: 100 }, (_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã giảm giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giảm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tối thiểu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số lượng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {discounts.map((coupon, index) => (
              <tr key={coupon.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.discount_percent}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(coupon.minimum_price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.valid_from} - {coupon.valid_to}
                  <br />
                  <span className="text-sm text-gray-500">
                    ({coupon.days_remaining} ngày còn lại)
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.type
                    .replace("cake", "Bánh")
                    .replace("water", "Đồ uống")
                    .replace("food", "Đồ ăn")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      coupon.message.toLowerCase().includes("hết hạn")
                        ? "bg-red-100 text-red-800"
                        : coupon.message.toLowerCase().includes("tạm dừng")
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {coupon.message}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setIsOpen(true);
                        setDiscount(coupon);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(coupon.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DiscountModalSystem
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        discount={discount}
        fetchData={fetchData}
      />
      {page > 1 && <PaginationPage count={page} setPage={setPage} />}
    </div>
  );
}
