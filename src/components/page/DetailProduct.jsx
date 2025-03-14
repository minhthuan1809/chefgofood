import { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineShoppingCart,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDetailProduct } from "../../redux/middlewares/client/detailProduct";
import ImageModal from "./detail/ImageModal";
import Evaluate from "./detail/Evaluate";
import Nav from "../header/Nav";
import Loading from "../util/Loading";
import PageFooter from "../footer/PageFooter";
import { toast } from "react-toastify";
import { addCart } from "../../service/cart_client";
import ModelPayCart from "./cart/ModelPayCart";
import { addFavorite } from "../../service/favorite_api";

const DetailProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail.detailProduct);
  const apiKey = useSelector((state) => state.login.apikey);
  const profile = useSelector((state) => state.profile.profile);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchDetailProduct = async () => {
      const data = await dispatch(getDetailProduct(params.id, 1));
      toast.dismiss();
      if (!data.ok) {
        toast.error("Đã có lỗi xảy ra !");
      }
    };
    fetchDetailProduct();
  }, [params.id]);

  const addProductToCart = async () => {
    toast.dismiss();
    const addItem = await addCart(product.id, apiKey);
    if (addItem.ok) {
      toast.success(addItem.message);
    } else {
      toast.error(addItem.message);
    }
  };

  const handleAddFavorite = async () => {
    const data = await addFavorite(profile?.id, { product_id: product.id });
    console.log(data);
    if (data.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

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
                        onClick={() => setSelectedImage(product.image_url)}
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                      />
                      {!product.status && (
                        <div className="absolute top-4 left-4">
                          <div className="bg-red-50 border-2 border-red-500 px-4 py-2 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              <span className="text-red-600 font-semibold tracking-wide text-sm">
                                Hết hàng
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      {product.discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Giảm {product.discount}%
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Thông Tin Sản Phẩm */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-[#b17741] px-3 py-1 text-sm font-medium text-[#b17741]">
                          {product.type
                            .toUpperCase()
                            .replace("FOOD", "Đồ ăn")
                            .replace("CAKE", "Bánh")
                            .replace("WATER", "Đồ uống")}
                        </span>
                        <div className="flex gap-4">
                          <button
                            className="text-gray-400 hover:text-gray-500"
                            title="Chia sẻ"
                          >
                            <AiOutlineShareAlt
                              className="w-6 h-6"
                              onClick={() => {
                                navigator.clipboard
                                  .writeText(window.location.href)
                                  .then(
                                    toast.success(
                                      "Đã copy đường dẫn thành công !"
                                    )
                                  );
                              }}
                            />
                          </button>
                          <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="text-gray-400 hover:text-red-500"
                            title={isFavorite ? "Bỏ yêu thích" : "Yêu thích"}
                          >
                            {isFavorite ? (
                              <AiFillHeart className="w-6 h-6 text-red-500" />
                            ) : (
                              <AiOutlineHeart
                                className="w-6 h-6"
                                onClick={handleAddFavorite}
                              />
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
                            ({Math.floor(product.average_rating * 10) / 10}/5)
                          </span>
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
                      <div className="text-3xl font-bold text-[#b17741]">
                        {(
                          parseInt(product.price) *
                          (1 - product.discount / 100)
                        ).toLocaleString()}
                        ₫
                      </div>
                      {product.discount > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400 line-through">
                            {parseInt(product.price).toLocaleString()}₫
                          </span>
                          <span className="text-sm text-red-500">
                            Tiết kiệm{" "}
                            {(
                              (product.price * product.discount) /
                              100
                            ).toLocaleString()}
                            ₫
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <div className="flex gap-4 mt-6">
                        <button
                          className={`w-full flex items-center justify-center py-3 rounded-lg transition ${
                            product.status
                              ? "bg-red-600 hover:bg-red-700 text-white"
                              : "bg-gray-300 cursor-not-allowed text-gray-500"
                          }`}
                          disabled={!product.status}
                          onClick={() => setIsOpen(true)}
                        >
                          <AiOutlineShoppingCart className="mr-2" />
                          Mua ngay
                        </button>
                        <button
                          className={`w-full flex items-center justify-center py-3 rounded-lg transition ${
                            product.status
                              ? "bg-[#b17741] hover:bg-[#b17741] text-white"
                              : "bg-gray-300 cursor-not-allowed text-gray-500"
                          }`}
                          disabled={!product.status}
                          onClick={addProductToCart}
                        >
                          <AiOutlineShoppingCart className="mr-2" />
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <ModelPayCart
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  items={product}
                />
              </div>
              <Evaluate data={product} setSelectedImage={setSelectedImage} />
            </div>
          </div>
        </main>
      )}
      <PageFooter />
      <ImageModal imageUrl={selectedImage} onClose={setSelectedImage} />
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
