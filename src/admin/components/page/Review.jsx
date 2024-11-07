import { useEffect, useRef, useState } from "react";
import { HiStar } from "react-icons/hi2";
import { getRenderReview } from "../../../service/server/renderReview";
import { FaSearch } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { Link } from "react-router-dom";
import PaginationPage from "../util/PaginationPage";
import Loading from "../util/Loading";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, getTotalPages] = useState(10);
  const [page, setPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await getRenderReview(searchTerm, limit, page);
      getTotalPages(response.data.pagination.total_pages);

      if (response.status === "success") {
        let filteredReviews = response.data.reviews;
        if (ratingFilter > 0) {
          filteredReviews = filteredReviews.filter(
            (review) => review.rating === ratingFilter
          );
        }
        setReviews(filteredReviews);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Lỗi khi tải đánh giá:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchReviews();
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, ratingFilter, limit, page]);

  const handleRefresh = () => {
    setSearchTerm("");
    setRatingFilter(0);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Quản Lý Đánh Giá
      </h2>
      <div className="mb-6 flex gap-4 items-center">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            ref={searchRef}
            type="search"
            placeholder="Tìm kiếm đánh giá..."
            className="w-full pl-10 pr-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-500">Lọc theo đánh giá:</label>
          <select
            className="border rounded px-3 py-2 outline-none shadow-sm focus:ring-2 focus:ring-blue-500"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
          >
            <option value={0}>Tất cả</option>
            <option value={1}>1 sao</option>
            <option value={2}>2 sao</option>
            <option value={3}>3 sao</option>
            <option value={4}>4 sao</option>
            <option value={5}>5 sao</option>
          </select>
        </div>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 border rounded bg-white hover:bg-gray-100 shadow-sm flex items-center gap-2"
        >
          <BiRefresh className="text-xl text-gray-500" />
        </button>
        <div className="flex items-center gap-2">
          <label className="text-gray-500">Số lượng:</label>
          <select
            className="border rounded px-3 py-2 outline-none shadow-sm focus:ring-2 focus:ring-blue-500"
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
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-gray-600">Người dùng</th>
              <th className="px-6 py-3 text-left text-gray-600">Sản phẩm</th>
              <th className="px-6 py-3 text-left text-gray-600">Đánh giá</th>
              <th className="px-6 py-3 text-left text-gray-600">Nội dung</th>
              <th className="px-6 py-3 text-left text-gray-600">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <tr key={review.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={review.avata}
                        alt={review.username}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span className="text-gray-700">{review.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      target="_blank"
                      to={`/detail/${review.product_name
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/đ/g, "d")
                        .replace(/[^a-z0-9\s-]/g, "")
                        .replace(/\s+/g, "-")
                        .replace(/-+/g, "-")
                        .trim()}/${review.product_id}`}
                      className="hover:underline transition text-center "
                    >
                      <img
                        className="w-[6rem] mb-2 rounded-md "
                        src={review.product_image_url}
                        alt="photo"
                      />
                      {review.product_name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <HiStar
                          key={index}
                          className={`w-5 h-5 ${
                            index < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="truncate max-w-xs text-gray-700">
                      {review.comment}
                    </p>
                    {(review.image_1 || review.image_2 || review.image_3) && (
                      <div className="flex gap-2 mt-2">
                        {review.image_1 && (
                          <img
                            src={review.image_1}
                            alt="Review 1"
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        {review.image_2 && (
                          <img
                            src={review.image_2}
                            alt="Review 2"
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        {review.image_3 && (
                          <img
                            src={review.image_3}
                            alt="Review 3"
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(review.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Không có đánh giá nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <PaginationPage count={totalPages} setPage={setPage} />
        )}
      </div>
    </div>
  );
}
