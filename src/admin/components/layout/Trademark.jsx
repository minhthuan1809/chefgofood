import { useEffect, useState } from "react";
import { setTrademark } from "../../../service/server/layout/Trademark";
import { getUiNavbar } from "../../../service/ui/ui_navbav";
import { toast } from "react-toastify";

export default function Trademark() {
  const [dataRender, setDataRender] = useState({});
  const [logo, setLogo] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  async function fetchData() {
    try {
      const data = await getUiNavbar();
      if (data.ok) {
        setDataRender(data.menu[0]);
        setLogo(data.menu[0].image);
        setTitle(data.menu[0].title);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getTrademark = async () => {
    toast.dismiss();
    setLoading(true);
    const data = await setTrademark({
      image: logo,
      title: title,
    });
    if (data.ok) {
      toast.success("Thay đổi thành công");
      fetchData();
    } else {
      toast.error("Thay đổi thất bại");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center">
      <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center w-full max-w-xl">
        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#b17741] to-purple-600 bg-clip-text text-transparent mb-6 md:mb-8">
          Logo Thương Hiệu
        </h3>
        <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#b17741] to-purple-500 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
            <img
              src={dataRender.image}
              alt="Logo"
              className="relative w-32 h-32 md:w-56 md:h-56 object-cover rounded-full border-4 md:border-8 border-white shadow-2xl transform transition duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#b17741] focus:ring-2 focus:ring-[#b17741] text-gray-700 placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
              placeholder="Nhập URL hình ảnh logo..."
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getTrademark();
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Brand Name Section */}
      <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 w-full max-w-xl">
        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#b17741] to-purple-600 bg-clip-text text-transparent mb-6 md:mb-8">
          Tên Thương Hiệu
        </h3>
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="bg-gradient-to-r from-[#b17741] to-purple-50 p-4 md:p-6 rounded-xl">
            <span className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
              {dataRender.title}
            </span>
          </div>
          <div className="w-full">
            <input
              type="text"
              className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#b17741] focus:ring-2 focus:ring-[#b17741] text-gray-700 placeholder-gray-400 transition-all duration-300 text-sm md:text-base"
              placeholder="Nhập tên thương hiệu mới..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getTrademark();
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        disabled={loading}
        onClick={getTrademark}
        className="mt-6 px-8 py-4 bg-gradient-to-r from-[#b17741] to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base w-full md:w-auto"
      >
        {loading ? "Đang lưu..." : "Lưu Thay Đổi"}
      </button>
    </div>
  );
}
