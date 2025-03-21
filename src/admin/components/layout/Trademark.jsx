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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Cài đặt thương hiệu
          </h2>
          <p className="text-gray-600 mt-2">
            Quản lý logo và tên thương hiệu của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">Logo</h3>
            </div>
            <div className="p-6 flex flex-col items-center">
              <div className="mb-6 w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-inner flex items-center justify-center bg-gray-50">
                {dataRender.image ? (
                  <img
                    src={dataRender.image}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">Chưa có logo</div>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="logo-url"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  URL hình ảnh
                </label>
                <input
                  id="logo-url"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nhập URL hình ảnh logo..."
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      getTrademark();
                    }
                  }}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Khuyến nghị: hình ảnh định dạng vuông, kích thước tối thiểu
                  200x200px
                </p>
              </div>
            </div>
          </div>

          {/* Brand Name Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">
                Tên thương hiệu
              </h3>
            </div>
            <div className="p-6">
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <span className="text-2xl font-bold text-gray-800 block text-center">
                  {dataRender.title || "Chưa có tên thương hiệu"}
                </span>
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tên thương hiệu
                </label>
                <input
                  id="brand-name"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nhập tên thương hiệu mới..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      getTrademark();
                    }
                  }}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Tên thương hiệu sẽ được hiển thị trên thanh điều hướng và tiêu
                  đề trang
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-end">
          <button
            disabled={loading}
            onClick={getTrademark}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Đang lưu...
              </>
            ) : (
              "Lưu thay đổi"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
