import { useEffect, useState } from "react";
import { getUiAbout } from "../../service/ui/ui_about";
import PageFooter from "../footer/PageFooter";
import Nav from "../header/Nav";
import PropTypes from "prop-types";
import { DynamicIcon } from "../util/iconLibraries";
import SupportChat from "../messger/SupportChat";

const FeatureCard = ({ iconName, title, description }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
    <DynamicIcon
      iconName={iconName}
      size={50}
      className="text-blue-600 mb-2 sm:mb-4"
    />
    <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600">{description}</p>
  </div>
);

const StandardItem = ({ text, iconName = "TiTick" }) => (
  <li className="flex items-center mb-2">
    <DynamicIcon
      iconName={iconName}
      size={20}
      className="text-green-500 mr-2"
    />
    <span>{text}</span>
  </li>
);

StandardItem.propTypes = {
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string,
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
      <header>
        <Nav />
        <SupportChat />
      </header>
      <div className="pt-[6rem] bg-gray-100 min-h-screen">
        <header className="bg-blue-600 text-white py-8 sm:py-16">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">
              {headerInfo.name}
            </h1>
            <p className="text-lg sm:text-xl">{headerInfo.description}</p>
          </div>
        </header>

        <main className="container mx-auto py-8 sm:py-16 px-4">
          <section className="mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
              {storyInfo.name}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto text-center">
              {storyInfo.description}
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-16">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                iconName={feature.icon}
                title={feature.name}
                description={feature.description}
              />
            ))}
          </section>

          <section className="bg-white p-4 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
              {standardsTitle}
            </h2>
            <ul className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
              {standards.map((standard) => (
                <StandardItem
                  key={standard.id}
                  text={standard.name}
                  iconName={standard.icon}
                />
              ))}
            </ul>
          </section>
        </main>

        <footer>
          <PageFooter />
        </footer>
      </div>
    </>
  );
}
