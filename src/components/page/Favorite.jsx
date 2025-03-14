import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import Nav from "../header/Nav";
import PageFooter from "../footer/PageFooter";
import { deleteFavorite, renderFavorite } from "../../service/favorite_api";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const profile = useSelector((state) => state.profile.profile);

  const fetchFavorites = async () => {
    try {
      const data = await renderFavorite(profile?.id);
      setFavorites(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách yêu thích:", error);
      toast.error("Không thể tải danh sách yêu thích");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (profile?.id) {
      fetchFavorites();
    }
  }, [profile]);

  // xóa sản phẩm yêu thích
  const handleUnfavorite = async (id) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm yêu thích?")) return;
    const data = await deleteFavorite(id);
    if (data.ok) {
      toast.success("Đã xóa sản phẩm yêu thích");
      fetchFavorites();
    } else {
      toast.error("Không thể xóa sản phẩm yêu thích");
    }
  };

  return (
    <div className="min-h-screen flex flex-col mt-[5rem]">
      <Nav />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Sản phẩm yêu thích</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b17741]"></div>
          </div>
        ) : favorites.data.favorites.length < 1 ? (
          <div className="text-center py-12 absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <FaHeart className="mx-auto text-gray-300 text-5xl mb-4" />
            <p className="text-gray-500 text-lg">
              Bạn chưa có sản phẩm yêu thích nào
            </p>
            <Link
              to="/food"
              className="mt-4 inline-block px-6 py-2 bg-[#b17741] text-white rounded-lg hover:bg-[#b17741] transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.data.favorites.map((item) => (
              <div
                key={item.favorite_id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-[12rem] sm:h-[18rem]">
                  <Link
                    to={`/detail/${item.product.name
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/đ/g, "d")
                      .replace(/[^a-z0-9\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")
                      .trim()}/${item.product.id}`}
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <span className="absolute top-2 right-2">
                    <FaHeart
                      className="text-red-500 text-xl"
                      onClick={() => handleUnfavorite(item.favorite_id)}
                    />
                  </span>
                </div>

                <div className="p-4">
                  <Link
                    to={`/detail/${item.product.name
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/đ/g, "d")
                      .replace(/[^a-z0-9\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .replace(/-+/g, "-")
                      .trim()}/${item.product.id}`}
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-3">
                    {item.product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-[#b17741] font-bold">
                      {parseInt(item.product.price).toLocaleString("vi-VN")}₫
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    Đã thêm vào yêu thích:{" "}
                    {new Date(item.created_at).toLocaleDateString("vi-VN")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <PageFooter />
    </div>
  );
}
