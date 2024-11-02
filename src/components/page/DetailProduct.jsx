import { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineShoppingCart,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useParams } from "react-router";
import Nav from "../header/Nav";
import PageFooter from "../footer/PageFooter";
import { getDetailProduct } from "../../service/detailProduct";
import Loading from "../util/Loading";
import ImageModal from "./detail/ImageModal";
import Evaluate from "./detail/Evaluate";

const DetailProduct = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const response = await getDetailProduct(params.id, 1);
        setProduct(response.data);
      } catch (error) {
        console.error("Không thể tải thông tin sản phẩm:", error);
      }
    };
    fetchDetailProduct();
  }, [params.id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      {!product ? (
        <Loading />
      ) : (
        <main className="flex-grow bg-gray-50 pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Phần Hình Ảnh */}
                  <div className="space-y-6">
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-gray-100">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Giảm {product.discount * 100}%
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Thông Tin Sản Phẩm */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                          {product.type.toUpperCase()}
                        </span>
                        <div className="flex gap-4">
                          <button
                            className="text-gray-400 hover:text-gray-500"
                            title="Chia sẻ"
                          >
                            <AiOutlineShareAlt className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="text-gray-400 hover:text-red-500"
                            title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
                          >
                            {isFavorite ? (
                              <AiFillHeart className="w-6 h-6 text-red-500" />
                            ) : (
                              <AiOutlineHeart className="w-6 h-6" />
                            )}
                          </button>
                        </div>
                      </div>

                      <h1 className="text-3xl font-bold text-gray-900">
                        {product.name}
                      </h1>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          {renderStars(product.average_rating)}
                          <span className="text-gray-500">
                            ({product.average_rating}/5)
                          </span>
                        </div>
                        <div className="h-5 w-px bg-gray-200" />
                        <span className="text-gray-500">
                          Đã bán: {product.sold.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-blue-600">
                        {parseInt(product.price).toLocaleString()}₫
                      </div>
                      {product.discount > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400 line-through">
                            {(
                              parseInt(product.price) /
                              (1 - product.discount)
                            ).toLocaleString()}
                            ₫
                          </span>
                          <span className="text-sm text-red-500">
                            Tiết kiệm {(product.discount * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-700">Số lượng:</span>
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            className="px-4 py-2 hover:bg-gray-50 transition"
                            title="Giảm số lượng"
                          >
                            -
                          </button>
                          <span className="px-4">{quantity}</span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-4 py-2 hover:bg-gray-50 transition"
                            title="Tăng số lượng"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className=" flex gap-4 mt-6 ">
                        <button className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg transition hover:bg-red-700">
                          <AiOutlineShoppingCart className="mr-2" />
                          Mua ngay
                        </button>
                        <button className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg transition hover:bg-blue-700">
                          <AiOutlineShoppingCart className="mr-2" />
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Evaluate data={product} setSelectedImage={setSelectedImage} />
            </div>
          </div>
        </main>
      )}
      <PageFooter />
      <ImageModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

const renderStars = (averageRating) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= averageRating ? (
          <AiFillStar key={star} className="w-5 h-5 text-yellow-400" />
        ) : (
          <AiOutlineStar key={star} className="w-5 h-5 text-gray-300" />
        )
      )}
    </div>
  );
};

export default DetailProduct;
