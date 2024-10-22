import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import PageFooter from "../footer/PageFooter";
import Nav from "../header/Nav";
import TopProducts from "./home/TopProducts";
import OrderingSteps from "./home/OrderingSteps ";
import Sale from "./home/Sale";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Nav />
      </header>
      <main>
        <section className="relative h-screen">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Banner FastFood"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center text-white">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                FASTFOOD
              </motion.h1>
              <motion.p
                className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-12 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Chào mừng bạn đến với FASTFOOD – nơi mang đến những trải nghiệm
                ẩm thực tuyệt vời với sự nhanh chóng, tiện lợi và hương vị tuyệt
                hảo.
              </motion.p>
              <motion.div
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-xl sm:text-2xl font-semibold mb-2">
                  Đặt Đồ ăn, giao hàng từ chỉ 30 phút
                </p>
                <p className="text-base sm:text-lg">
                  Thời gian mở cửa 6:30 A.M - 12:00 P.M
                </p>
              </motion.div>
              <motion.form
                className="flex flex-col sm:flex-row justify-center items-center gap-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <input
                  type="search"
                  placeholder="Tìm địa điểm, món ăn, địa chỉ..."
                  className="w-full sm:w-96 p-3 sm:p-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  <FaSearch className="mr-2" />
                  Tìm kiếm
                </button>
              </motion.form>
            </div>
          </div>
        </section>
        <section>
          <TopProducts />
        </section>
        {/* <section>
          <Sale />
        </section> */}
        <section>
          <OrderingSteps />
        </section>
      </main>

      <footer>
        <PageFooter />
      </footer>
    </div>
  );
}
