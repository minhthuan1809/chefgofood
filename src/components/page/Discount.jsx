import { useEffect, useState } from "react";
import Nav from "../header/Nav";
import { getUiDiscountSystem } from "../../service/discount/discount_system";
import { useSelector } from "react-redux";
import { getUiDiscountUser } from "../../service/discount/discount_user";
import { useNavigate } from "react-router";
import DiscountCard from "../discount/DiscountCard";
import Loading from "../util/Loading";
import SupportChat from "../messger/SupportChat";
import PageFooter from "../footer/PageFooter";

const Discount = () => {
  const status = useSelector((state) => state.login.status);
  const profile = useSelector((state) => state.profile.profile);
  const [loading, setLoading] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [discountsUser, setDiscountsUser] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        const response = await getUiDiscountSystem();
        if (!response.ok) {
          navigator("/error");
        }
        setDiscounts(response.data.discounts);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchUserDiscounts() {
      if (!profile) {
        setLoading(false);
        return;
      }
      try {
        const response = await getUiDiscountUser(profile.id);

        if (!response.ok) {
          navigator("/error");
        }

        setDiscountsUser(response.data.discounts);
      } catch (error) {
        console.error("Error fetching user discounts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserDiscounts();
  }, [profile]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    // Apply coupon logic here
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col min-h-screen">
          <header className="fixed w-full z-50">
            <Nav />
          </header>

          <main className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Page Header */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Mã giảm giá
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Khám phá các ưu đãi đặc biệt và mã giảm giá dành riêng cho bạn
                </p>
              </div>

              {status ? (
                <div className="space-y-10">
                  {/* Coupon Input Section */}
                  <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-7xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                      Nhập mã giảm giá
                    </h2>
                    <form
                      onSubmit={handleApplyCoupon}
                      className="flex flex-col sm:flex-row gap-2"
                    >
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Nhập mã giảm giá của bạn"
                        className="flex-grow px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      />
                      <button
                        type="submit"
                        className="bg-[#b17741] text-white font-medium px-6 py-3 rounded-lg transition duration-300 flex items-center justify-center"
                      >
                        Áp dụng
                      </button>
                    </form>
                  </div>

                  {/* User's Coupons Section */}
                  <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Mã giảm giá của bạn
                      </h2>
                      <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm font-medium">
                        {discountsUser.length} mã
                      </span>
                    </div>

                    {discountsUser.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                        <div className="text-gray-400 mb-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-600 font-medium">
                          Bạn chưa có mã giảm giá nào
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          Hãy mua sắm để nhận thêm ưu đãi
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {discountsUser.map((discount, index) => (
                          <DiscountCard key={index} {...discount} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-2xl mx-auto">
                  <div className="text-indigo-500 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Đăng nhập để xem mã giảm giá
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Đăng nhập để xem và sử dụng các mã giảm giá dành riêng cho
                    bạn
                  </p>
                </div>
              )}

              {/* Available Discounts Section */}
              <div className="mt-16">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Ưu đãi hấp dẫn
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sắp xếp theo:</span>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option>Mới nhất</option>
                      <option>Phổ biến</option>
                      <option>Sắp hết hạn</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {discounts.map((discount, index) => (
                    <DiscountCard key={index} {...discount} />
                  ))}
                </div>
              </div>
            </div>
          </main>

          <SupportChat />
          <PageFooter />
        </div>
      )}
    </>
  );
};

export default Discount;
