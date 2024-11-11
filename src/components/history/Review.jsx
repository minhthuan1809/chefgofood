/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { createReview } from "../../service/review";
import { toast } from "react-toastify";

const ReviewModal = ({ isOpen, onClose, order }) => {
  const apiKey = useSelector((state) => state.login.apikey);
  const [ratings, setRatings] = useState(
    order?.products ? Array(order.products.length).fill(5) : []
  );
  const [comments, setComments] = useState(
    order?.products ? Array(order.products.length).fill("") : []
  );
  const [images, setImages] = useState(
    order?.products ? order.products.map(() => ["", "", ""]) : []
  );

  if (!order || !order.products) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isReviewSubmitted = false;

    for (let index = 0; index < order.products.length; index++) {
      // Kiểm tra nếu không có đánh giá
      if (ratings[index] === 0) {
        toast.error("Vui lòng đánh giá sản phẩm");
        return;
      }

      // Bỏ qua nếu không có comment hoặc hình ảnh
      if (comments[index] === "" && images[index][0] === "") {
        continue;
      }

      const reviewData = {
        product_id: order.products[index].product_id,
        rating: ratings[index],
        comment: comments[index],
        images: images[index],
      };

      try {
        await createReview(apiKey, reviewData);
        isReviewSubmitted = true;
      } catch (error) {
        console.error("Đánh giá sản phẩm thất bại:", error);
        toast.error("Đánh giá sản phẩm thất bại");
      }
    }

    if (isReviewSubmitted) {
      onClose();
      toast.success("Đánh giá sản phẩm thành công");
    }
  };

  const handleRatingChange = (index, newRating) => {
    setRatings((prevRatings) => {
      const newRatings = [...prevRatings];
      newRatings[index] = newRating;
      return newRatings;
    });
  };

  const handleCommentChange = (index, newComment) => {
    setComments((prevComments) => {
      const newComments = [...prevComments];
      newComments[index] = newComment;
      return newComments;
    });
  };

  const handleImageChange = (index, imageIndex, newImageUrl) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index][imageIndex] = newImageUrl;
      return newImages;
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Đánh giá đơn hàng #{order.order_id}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {order.products.map((product, index) => (
              <div key={product.product_id} className="mb-8 border-b pb-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <h3 className="font-semibold text-lg">
                    {product.product_name}
                  </h3>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Số sao đánh giá
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer text-2xl ${
                          star <= ratings[index]
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleRatingChange(index, star)}
                      />
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex flex-col gap-4">
                    {[0, 1, 2].map((imgIndex) => (
                      <input
                        key={imgIndex}
                        type="text"
                        className="border-2 border-gray-300 rounded-lg p-2 outline-none"
                        placeholder="url hình ảnh ..."
                        value={images[index][imgIndex]}
                        onChange={(e) =>
                          handleImageChange(index, imgIndex, e.target.value)
                        }
                      />
                    ))}
                  </div>
                  <label className="block text-gray-700 mb-2">
                    Nhận xét của bạn
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                    value={comments[index]}
                    onChange={(e) => handleCommentChange(index, e.target.value)}
                    placeholder="Nhập nhận xét của bạn về sản phẩm..."
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Gửi đánh giá
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
