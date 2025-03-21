import React from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUiDiscountUser } from "../../../service/discount/discount_user";

const DiscountButton = ({ code, subtotal, onApply }) => {
  const handleClick = () => {
    // Kiểm tra giá trị đơn hàng tối thiểu
    if (subtotal < code.minimum_price) {
      toast.dismiss();
      toast.error(`Đơn hàng tối thiểu ${code.minimum_price.toLocaleString()}₫`);
      return;
    }

    // Kiểm tra số lượng mã giảm giá
    if (code.quantity <= 0) {
      toast.dismiss();
      toast.error("Mã giảm giá đã hết lượt sử dụng!");
      return;
    }

    // Gọi hàm áp dụng mã giảm giá
    onApply(code);
  };

  return (
    <button
      key={code.id}
      onClick={handleClick}
      className="w-full text-left p-3 hover:bg-[#b17741] rounded-lg transition-colors"
    >
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold">{code.code}</span>
          <p className="text-sm text-gray-500">{code.name}</p>
          <p className="text-xs text-gray-400">
            Đơn tối thiểu: {code.minimum_price.toLocaleString()}₫
          </p>
          <p className="text-xs text-gray-400">
            Thời gian còn lại: {code.days_remaining} ngày
          </p>
          {code.days_remaining < 0 && (
            <p className="text-xs text-red-500">{code.message}</p>
          )}
          {code.isUserSpecific && (
            <p className="text-xs p-1 text-[#b17741]">
              Giảm giá dành cho riêng bạn
            </p>
          )}
        </div>
        <span className="text-[#b17741]">Giảm {code.discount_percent}%</span>
      </div>
    </button>
  );
};

const ModalDiscount = ({
  isOpen,
  onClose,
  discountSystem,
  subtotal,
  onApplyDiscount,
}) => {
  const [discountsUser, setDiscountsUser] = useState([]);
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    const fetchUserDiscounts = async () => {
      try {
        const response = await getUiDiscountUser(profile.id);
        setDiscountsUser(
          response.data.discounts.map((discount) => ({
            ...discount,
            isUserSpecific: true,
          }))
        );
      } catch (error) {
        toast.error("Không thể tải mã giảm giá người dùng");
      }
    };

    if (profile?.id) {
      fetchUserDiscounts();
    }
  }, [profile]);

  const handleApplyDiscount = (code) => {
    // Thêm kiểm tra giá trị đơn hàng và số lượng mã giảm giá
    if (subtotal < code.minimum_price) {
      toast.error(`Đơn hàng tối thiểu ${code.minimum_price.toLocaleString()}₫`);
      return;
    }
    if (code.quantity <= 0) {
      toast.error("Mã giảm giá đã hết lượt sử dụng!");
      return;
    }

    // Gọi hàm áp dụng mã giảm giá được truyền từ component cha
    onApplyDiscount({
      code: code.code,
      discountPercent: code.discount_percent / 100,
      minOrderValue: code.minimum_price,
    });

    // Hiển thị thông báo thành công
    toast.success("Áp dụng mã giảm giá thành công!");

    // Đóng modal
    onClose();
  };

  // Lọc các mã giảm giá còn hiệu lực
  const validDiscounts = [
    ...(discountsUser || []),
    ...(discountSystem || []),
  ].filter((code) => code.days_remaining > 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mã giảm giá">
      <div className="space-y-2">
        {validDiscounts.length > 0 ? (
          validDiscounts.map((code) => (
            <DiscountButton
              key={code.id}
              code={code}
              subtotal={subtotal}
              onApply={handleApplyDiscount}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            Không có mã giảm giá khả dụng
          </p>
        )}
      </div>
    </Modal>
  );
};

export default ModalDiscount;
