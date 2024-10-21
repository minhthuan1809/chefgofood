/* eslint-disable react/prop-types */
import {
  FaUtensils,
  FaClock,
  FaTruck,
  FaThumbsUp,
  FaCheckCircle,
} from "react-icons/fa";
import PageFooter from "../footer/PageFooter";
import Nav from "../header/Nav";

const FeatureCard = ({ Icon, title, description }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
    <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 mb-2 sm:mb-4" />
    <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600">{description}</p>
  </div>
);

const StandardItem = ({ text }) => (
  <li className="flex items-center mb-2">
    <FaCheckCircle className="text-green-500 mr-2" />
    <span>{text}</span>
  </li>
);

export default function About() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <div className="pt-[6rem] bg-gray-100 min-h-screen">
        <header className="bg-blue-600 text-white py-8 sm:py-16">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">
              Về Fastfood
            </h1>
            <p className="text-lg sm:text-xl">
              Thưởng thức hương vị nhanh chóng, ngon miệng
            </p>
          </div>
        </header>

        <main className="container mx-auto py-8 sm:py-16 px-4">
          <section className="mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
              Câu Chuyện Của Chúng Tôi
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto text-center">
              Fastfood được thành lập vào năm 2010 với mục tiêu mang đến cho
              khách hàng những bữa ăn ngon, nhanh chóng và tiện lợi. Chúng tôi
              cam kết sử dụng nguyên liệu tươi ngon nhất và áp dụng các quy
              trình chế biến hiện đại để đảm bảo chất lượng tuyệt vời cho mỗi
              món ăn.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-16">
            <FeatureCard
              Icon={FaUtensils}
              title="Đa Dạng Món Ăn"
              description="Từ burger đến pizza, chúng tôi có đủ loại món ăn để thỏa mãn mọi khẩu vị."
            />
            <FeatureCard
              Icon={FaClock}
              title="Phục Vụ Nhanh Chóng"
              description="Đảm bảo thời gian chờ đợi tối thiểu để bạn có thể thưởng thức bữa ăn nhanh chóng."
            />
            <FeatureCard
              Icon={FaTruck}
              title="Giao Hàng Tận Nơi"
              description="Dịch vụ giao hàng nhanh chóng và tiện lợi đến tận cửa nhà bạn."
            />
            <FeatureCard
              Icon={FaThumbsUp}
              title="Chất Lượng Đảm Bảo"
              description="Cam kết sử dụng nguyên liệu tươi ngon và quy trình chế biến an toàn."
            />
          </section>

          <section className="bg-white p-4 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
              Tiêu Chuẩn Đồ Ăn Nhanh Của Chúng Tôi
            </h2>
            <ul className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
              <StandardItem text="Sử dụng nguyên liệu tươi sạch, không chất bảo quản" />
              <StandardItem text="Quy trình chế biến đảm bảo vệ sinh an toàn thực phẩm" />
              <StandardItem text="Kiểm soát chất lượng nghiêm ngặt trước khi phục vụ" />
              <StandardItem text="Đa dạng lựa chọn cho các chế độ ăn đặc biệt" />
              <StandardItem text="Cập nhật menu thường xuyên với các món ăn mới" />
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
