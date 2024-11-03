import { useEffect, useState } from "react";
import Nav from "../header/Nav";
import { getUiDiscountSystem } from "../../service/discount/discount_system";
import { useSelector } from "react-redux";
import { getUiDiscountUser } from "../../service/discount/discount_user";
import { useNavigate } from "react-router";
import DiscountCard from "../discount/DiscountCard";
import Loading from "../util/Loading";

const Discount = () => {
  const apiKey = useSelector((state) => state.login.apikey);
  const profile = useSelector((state) => state.profile.profile);
  const [loading, setLoading] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [discountsUser, setDiscountsUser] = useState([]);
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <header>
            <Nav />
          </header>
          <div className="bg-gray-100 min-h-screen py-[7rem]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Mã giảm giá của bạn
              </h1>
              {apiKey ? (
                <div>
                  <form className="mb-8">
                    <div className="flex flex-col sm:flex-row shadow-sm rounded-lg overflow-hidden">
                      <input
                        type="text"
                        onChange={(e) => console.log(e.target.value)}
                        placeholder="Nhập mã giảm giá"
                        className="flex-grow px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition duration-300 mt-2 sm:mt-0"
                      >
                        Áp dụng
                      </button>
                    </div>
                  </form>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                    {discountsUser.map((discount, index) => (
                      <DiscountCard key={index} {...discount} />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-center text-blue-600 pb-5">
                    Bạn Chưa đăng nhập bạn cần đăng nhập
                  </p>
                </div>
              )}

              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Ưu đãi hấp dẫn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {discounts.map((discount, index) => (
                  <DiscountCard key={index} {...discount} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Discount;
