import { useEffect, useState } from "react";
import { getUiAbout } from "../../service/ui/ui_about";
import PageFooter from "../footer/PageFooter";
import Nav from "../header/Nav";
import PropTypes from "prop-types";
import { DynamicIcon } from "../util/iconLibraries";
import SupportChat from "../messger/SupportChat";

const FeatureCard = ({ iconName, title, description }) => (
  <div className="relative overflow-hidden rounded-lg bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="absolute top-0 left-0 w-1 h-full bg-[#b17741]"></div>
    <div className="p-8">
      <div className="flex mb-6">
        <DynamicIcon iconName={iconName} size={36} className="text-[#b17741]" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <div className="w-12 h-0.5 bg-[#b17741] opacity-50 mb-4"></div>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const StandardItem = ({ text, iconName = "TiTick" }) => (
  <li className="mb-5">
    <div className="flex items-start">
      <div className="mr-4 text-[#b17741]">
        <DynamicIcon iconName={iconName} size={22} />
      </div>
      <div>
        <p className="text-gray-800">{text}</p>
      </div>
    </div>
  </li>
);

StandardItem.propTypes = {
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string,
};

FeatureCard.propTypes = {
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default function About() {
  const [info, setInfo] = useState([]);
  const [session, setSession] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUiAbout();

        setSession(response.session);
        setInfo(response.Info);
      } catch (error) {
        console.error("Failed to fetch about info:", error);
      }
    };
    fetchData();
  }, []);

  // Get header and story info from info array
  const headerInfo = info[0] || {
    name: "",
    description: "",
    color: "",
    id: "",
  };
  const storyInfo = info[1] || { name: "", description: "", color: "", id: "" };

  // Filter session data for features and standards
  const features = session.filter((item) => item.description && item.id <= 4);
  const standardsTitle =
    session.find((item) => item.id === "5")?.name ||
    "Tiêu Chuẩn Đồ Ăn Nhanh Của Chúng Tôi";
  const standards = session.filter((item) => item.id > 5 && item.name.trim());

  return (
    <>
      <header className="fixed w-full z-50 transition-all duration-300">
        <Nav />
      </header>

      <div className="bg-white">
        {/* Hero Section with Diagonal Design */}
        <header className="relative pt-24 overflow-hidden">
          <div className="bg-[#b17741] transform -skew-y-3  h-[400px] absolute w-full -top-10"></div>
          <div className="absolute top-0 right-0 w-full h-full">
            <div className="grid grid-cols-12 h-full">
              <div className="col-span-12 md:col-span-6"></div>
              <div className="col-span-12 md:col-span-6  bg-repeat opacity-10 h-full"></div>
            </div>
          </div>

          <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {headerInfo.name}
              </h1>
              <div className="w-24 h-1 bg-white opacity-70 mb-8"></div>
              <p className="text-xl text-white text-opacity-90 leading-relaxed max-w-xl">
                {headerInfo.description}
              </p>
            </div>
          </div>
        </header>

        <main>
          {/* Our Story Section */}
          <section className="py-24 container mx-auto px-4">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-10 md:mb-0">
                <div className="sticky top-32">
                  <span className="text-[#b17741] font-semibold text-sm tracking-wider uppercase">
                    Câu chuyện
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
                    {storyInfo.name}
                  </h2>
                  <div className="w-16 h-1 bg-[#b17741] mb-8"></div>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-16">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {storyInfo.description}
                </p>
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-4xl font-bold text-[#b17741]">
                      10+
                    </span>
                    <p className="text-gray-600 mt-2">Năm kinh nghiệm</p>
                  </div>
                  <div className="p-5 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-4xl font-bold text-[#b17741]">
                      100%
                    </span>
                    <p className="text-gray-600 mt-2">Khách hàng hài lòng</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <span className="text-[#b17741] font-semibold text-sm tracking-wider uppercase">
                  Đặc điểm nổi bật
                </span>
                <h2 className="text-4xl font-bold text-gray-900 mt-3">
                  Tại sao chọn chúng tôi
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature) => (
                  <FeatureCard
                    key={feature.id}
                    iconName={feature.icon}
                    title={feature.name}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Standards Section with Image */}
          <section className="py-24 container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="relative">
                  <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg">
                    <div className="w-full h-full bg-[url('/images/restaurant.jpg')] bg-cover bg-center rounded-lg"></div>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#b17741] bg-opacity-10 rounded-full"></div>
                  <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#b17741] bg-opacity-10 rounded-full"></div>
                </div>
              </div>

              <div>
                <span className="text-[#b17741] font-semibold text-sm tracking-wider uppercase">
                  Tiêu chuẩn
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-8">
                  {standardsTitle}
                </h2>

                <ul className="space-y-1">
                  {standards.map((standard) => (
                    <StandardItem
                      key={standard.id}
                      text={standard.name}
                      iconName={standard.icon}
                    />
                  ))}
                </ul>

                <div className="mt-10">
                  <button className="inline-flex items-center px-6 py-3 bg-[#b17741] text-white font-medium rounded-lg hover:bg-[#a06735] transition-colors duration-300">
                    Tìm hiểu thêm
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="py-20 bg-[#b17741] bg-opacity-5">
            <div className="container mx-auto px-4 text-center">
              <span className="text-[#b17741] font-semibold text-sm tracking-wider uppercase">
                Đánh giá
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-12">
                Khách hàng nói gì về chúng tôi
              </h2>

              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
                <svg
                  className="w-12 h-12 text-[#b17741] opacity-20 mx-auto mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl text-gray-700 italic mb-8">
                  "Thực phẩm tuyệt vời, dịch vụ xuất sắc và không gian thoải
                  mái. Tôi luôn hài lòng mỗi khi ghé thăm. Đây thực sự là điểm
                  đến ưa thích của tôi cho bữa ăn nhanh chất lượng cao!"
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/dsoj3y7wu/image/upload/v1741669142/j3wh7flkptqezocjuxer.jpg"
                    alt=""
                    className="w-12 h-12 bg-gray-200 rounded-full mr-4 object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900">Nguyễn Thị Ánh</h4>
                    <p className="text-gray-600 text-sm">
                      Khách hàng thân thiết
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <SupportChat />
        <PageFooter />
      </div>
    </>
  );
}
