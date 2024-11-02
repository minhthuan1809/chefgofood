/* eslint-disable react/prop-types */
import React from "react";
import {
  AiFillStar,
  AiOutlineClockCircle,
  AiOutlineStar,
} from "react-icons/ai";
import PaginationReviewDetail from "./PaginationReviewDetail";

const ReviewImages = ({ review, setSelectedImage }) => {
  const images = [review.image_1, review.image_2, review.image_3].filter(
    Boolean
  );
  if (!images.length) return null;

  return (
    <div className="grid grid-cols-3 gap-2 mt-3 max-w-md">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => {
            setSelectedImage(image);
          }}
        >
          <img
            src={image}
            alt={`Ảnh đánh giá ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
      ))}
    </div>
  );
};

export default function Evaluate({ data, setSelectedImage }) {
  return (
    <div className="space-y-6">
      {data.reviews.items.length < 1 ? (
        <h1 className="text-2xl font-bold text-center">
          Sản phẩm chưa được đánh giá
        </h1>
      ) : (
        <div>
          <h2 className="text-2xl text-center mt-10 font-bold mb-6">
            Đánh giá từ khách hàng
          </h2>
          {data.reviews.items.map((review) => (
            <div
              key={review.id}
              className=" rounded-xl p-6 space-y-4 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={review.avata}
                    alt={review.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{review.username}</p>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                      <AiOutlineClockCircle className="w-4 h-4" />
                      {new Date(review.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= review.rating ? (
                      <AiFillStar
                        key={star}
                        className="w-4 h-4 text-yellow-400"
                      />
                    ) : (
                      <AiOutlineStar
                        key={star}
                        className="w-4 h-4 text-gray-300"
                      />
                    )
                  )}
                </div>
              </div>
              <p className="w-full text-gray-700">{review.comment}</p>
              <ReviewImages
                review={review}
                setSelectedImage={setSelectedImage}
              />
            </div>
          ))}
          <div className="w-full flex justify-center p-6">
            <PaginationReviewDetail
              page={data.reviews.pagination.total_pages}
            />
          </div>
        </div>
      )}
    </div>
  );
}
