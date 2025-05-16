import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { getDiscountUser } from "../../../service/server/discount/discount_system_user";
import { BiRefresh } from "react-icons/bi";
import PaginationPage from "../util/PaginationPage";
import { toast } from "react-toastify";
import Loading from "../util/Loading";
import { deleteDiscountUser } from "../../../service/server/discount/discount_system_delete_user";
import Modal_user from "../_modal_discount_user/Modal_user";

export default function DiscountUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [coupons, setCoupons] = useState(null);
  const [editData, setEditData] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);

  const getCouponStatus = (validFrom, validTo) => {
    const now = new Date();
    const startDate = new Date(validFrom);
    const endDate = new Date(validTo);

    if (now < startDate) {
      return "Chờ bắt đầu";
    } else if (now > endDate) {
      return "Hết hạn";
    } else {
      return "Đang hoạt động";
    }
  };

  async function fetchData() {
    toast.dismiss();
    setLoading(true);
    const res = await getDiscountUser(page, limit, searchTerm);
    let filteredCoupons = res.data.discounts.map((coupon) => ({
      ...coupon,
      message: getCouponStatus(coupon.valid_from, coupon.valid_to),
    }));

    if (filterStatus !== "all") {
      filteredCoupons = filteredCoupons.filter((coupon) =>
        coupon.message.toLowerCase().includes(filterStatus)
      );
    }

    setCoupons(filteredCoupons);
    setTotalPages(Math.ceil(filteredCoupons.length / limit));
    setLoading(false);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [page, limit, searchTerm, filterStatus]);

  const calculateDaysLeft = (validTo) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(validTo);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mã giảm giá này không?")) return;
    const res = await deleteDiscountUser(id);
    toast.dismiss();
    if (res.ok) {
      toast.success("Đã xóa mã giảm giá");
      fetchData();
    } else {
      toast.error("Lỗi xóa mã giảm giá");
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setPage(1);
    fetchData();
  };

  if (!coupons || loading) return <Loading />;
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MdDiscount className="text-blue-600" />
          Quản lý mã giảm giá
        </h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
          onClick={() => setIsOpen(true)}
        >
          <FaPlus />
          Thêm mã mới
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm mã giảm giá..."
              className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:border-blue-600"
            />
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 border rounded hover:bg-gray-100 flex items-center gap-2"
          >
            <BiRefresh className="text-xl text-gray-500" />
          </button>
          <select
            className="p-2 border rounded-lg focus:outline-none focus:border-blue-600"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="hết hạn">Hết hạn</option>
            <option value="tạm dừng">Tạm dừng</option>
            <option value="chờ bắt đầu">Chờ bắt đầu</option>
            <option value="đang hoạt động">Đang hoạt động</option>
          </select>

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
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gmail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giảm giá (%)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đơn tối thiểu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian
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
            {coupons.map((coupon, index) => (
              <tr key={coupon.id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer hover:text-[#b17741]">
                  <span
                    onClick={() => {
                      toast.dismiss();
                      navigator.clipboard
                        .writeText(coupon.code)
                        .then(() => {
                          toast.success("Đã copy mã giảm giá");
                        })
                        .catch(() => {
                          toast.error("Lỗi copy mã giảm giá");
                        });
                    }}
                  >
                    {coupon.code}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.description}
                </td>
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
                  {new Date(coupon.valid_from)
                    .toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      timeZone: "Asia/Ho_Chi_Minh",
                    })
                    .split("/")
                    .reverse()
                    .join("/")}{" "}
                  -{" "}
                  {new Date(coupon.valid_to)
                    .toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      timeZone: "Asia/Ho_Chi_Minh",
                    })
                    .split("/")
                    .reverse()
                    .join("/")}
                  <br />
                  <span className="text-sm text-gray-500">
                    (
                    {coupon.days_remaining ||
                      calculateDaysLeft(coupon.valid_to)}{" "}
                    ngày còn lại)
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      coupon.message.toLowerCase().includes("hết hạn")
                        ? "bg-red-100 text-red-800"
                        : coupon.message.toLowerCase().includes("tạm dừng")
                        ? "bg-yellow-100 text-yellow-800"
                        : coupon.message.toLowerCase().includes("chờ bắt đầu")
                        ? "bg-gray-100 text-gray-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {coupon.message}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-3">
                    <button
                      className="text-[#b17741] hover:text-[#b17741]"
                      onClick={() => {
                        setEditData(coupon);
                        setIsOpen(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      <Modal_user
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditData(null);
        }}
        editData={editData}
        fetchData={fetchData}
      />
      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationPage count={totalPages} setPage={setPage} />
      )}
    </div>
  );
}
