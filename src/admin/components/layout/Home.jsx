import { useState, useEffect } from "react";
import { setHomeHeader } from "../../../service/server/layout/Trademark";
import { toast } from "react-toastify";
import { getUiHeader } from "../../../service/ui/ui_header";
import FixStep from "./FixStep";
import ModalEditStep from "./ModalEditStep";

export default function Home() {
  const [siteName, setSiteName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [siteSlogan, setSiteSlogan] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [loadingBtnHeader, setLoadingBtnHeader] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [fcSteps, setFcSteps] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUiHeader();
        if (!data.ok) {
          throw new Error(data.message);
        }
        setSiteName(data.websiteInfo.site_name);
        setLogoUrl(data.websiteInfo.logo_url);
        setSiteSlogan(data.websiteInfo.site_slogan);
        setOpeningHours(data.websiteInfo.opening_hours);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const handleSubmit = async () => {
    toast.dismiss();
    if (!confirm("Bạn có chắc chắn muốn cập nhật?")) return;
    try {
      setLoadingBtnHeader(true);
      const data = await setHomeHeader({
        site_name: siteName,
        logo_url: logoUrl,
        site_slogan: siteSlogan,
        opening_hours: openingHours,
        // search_placeholder: searchPlaceholder,
      });
      if (data.ok) {
        toast.success("Cập nhật thành công");
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoadingBtnHeader(false);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300">
        <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Giao diện Trang Chủ
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiêu đề
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập tiêu đề..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hình ảnh
            </label>
            <input
              type="text"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập URL hình ảnh..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Khẩu Hiệu
            </label>
            <input
              type="text"
              value={siteSlogan}
              onChange={(e) => setSiteSlogan(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập khẩu hiệu..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giờ Mở Cửa
            </label>
            <input
              type="text"
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nhập giờ mở cửa..."
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loadingBtnHeader}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {loadingBtnHeader ? "Đang cập nhật..." : "Lưu Thay Đổi"}
          </button>
        </div>
      </div>
      <FixStep
        setCloseModal={setIsModalOpen}
        setEditingStep={setEditingStep}
        fcSteps={fcSteps}
      />
      <ModalEditStep
        isModalOpen={isModalOpen}
        setCloseModal={setIsModalOpen}
        editingStep={editingStep}
        setFcSteps={setFcSteps}
      />
    </div>
  );
}
