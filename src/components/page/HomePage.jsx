import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import PageFooter from "../footer/PageFooter";
import Nav from "../header/Nav";
import TopProducts from "./home/TopProducts";

import { useEffect, useState } from "react";
import { getUiHeader } from "../../service/ui/ui_header";
import OrderingSteps from "./home/OrderingSteps";
import { useNavigate } from "react-router";
import Loading from "../util/Loading";
import SupportChat from "../messger/SupportChat";

export default function Home() {
  const [header, setHeader] = useState({});
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUiHeader();
        if (!data.ok) {
          navigate("/error");
          throw new Error(data.message);
        }
        setHeader(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  if (header === null) {
    <Loading />;
    return null;
  }

  // tìm kiếm
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      return;
    }
    navigate(`/food?search=${searchTerm.trim().replace(/\s+/g, "+")}`);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <Nav />
        <SupportChat />
      </header>
      <main>
        <section className="relative h-screen">
          <img
            className="w-full h-full object-cover"
            src={header.websiteInfo?.logo_url}
            alt={`Banner ${header.websiteInfo?.site_name}`}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center text-white">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {header.websiteInfo?.site_name}
              </motion.h1>
              <motion.p
                className="text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {header.websiteInfo?.site_slogan}
              </motion.p>
              <motion.div
                className="mb-6 sm:mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-xl sm:text-2xl font-semibold mb-1">
                  {header.delivery?.title}
                </p>
                <p className="text-base  sm:text-2xl flex justify-center gap-2">
                  <span className="font-semibold">Thời gian mở cửa:</span>
                  {header.websiteInfo?.opening_hours}
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
                  placeholder={header.websiteInfo?.search_placeholder}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-96 p-3 sm:p-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-[#b17741]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <button
                  onClick={handleSearch}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#b17741] text-white rounded-full hover:bg-[#b17741] transition duration-300 flex items-center justify-center"
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
