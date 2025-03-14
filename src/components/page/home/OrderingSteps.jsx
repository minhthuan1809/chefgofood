import { useEffect, useState } from "react";
import { getUiStep } from "../../../service/ui/ui_home_step";
import { DynamicIcon } from "../../util/iconLibraries";

const OrderingSteps = () => {
  const [steps, setSteps] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const getStep = async () => {
      try {
        const response = await getUiStep();
        setTitle("Các bước đặt món tại CHEFGOFOOD");

        const contentSteps = response.steps
          .filter((step) => step.step_number !== "0")
          .sort((a, b) => parseInt(a.order_number) - parseInt(b.order_number));

        setSteps(contentSteps);
      } catch (error) {
        console.error("Không thể tải các bước:", error);
      }
    };
    getStep();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Phần tiêu đề */}
        <div className="text-center">
          <h2 className="text-3xl font-bold ">{title}</h2>
        </div>

        {/* Danh sách các bước */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.slice(0, 4).map((step) => (
              <div
                key={step.id}
                className="relative group transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  {/* Icon và số bước */}
                  <div className="p-8">
                    <div className="w-16 h-16 mx-auto bg-[#b17741] rounded-2xl transform -rotate-12 flex items-center justify-center mb-6 group-hover:rotate-0 transition-transform duration-300">
                      <DynamicIcon
                        iconName={step.icon}
                        size={32}
                        className="text-white transform rotate-12 group-hover:rotate-0 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 bg-[#b17741] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold">
                        {step.step_number}
                      </span>
                    </div>

                    {/* Nội dung bước */}
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Thanh trang trí dưới */}
                  <div className="h-2 bg-[#b17741] opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Hai bước cuối được căn giữa */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-8">
            <div className="lg:col-start-2 md:col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {steps.slice(4).map((step) => (
                <div
                  key={step.id}
                  className="relative group transform hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    {/* Icon và số bước */}
                    <div className="p-8">
                      <div className="w-16 h-16 mx-auto bg-[#b17741] rounded-2xl transform -rotate-12 flex items-center justify-center mb-6 group-hover:rotate-0 transition-transform duration-300">
                        <DynamicIcon
                          iconName={step.icon}
                          size={32}
                          className="text-white transform rotate-12 group-hover:rotate-0 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute top-4 right-4 w-8 h-8 bg-[#b17741] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold">
                          {step.step_number}
                        </span>
                      </div>

                      {/* Nội dung bước */}
                      <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-center text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Thanh trang trí dưới */}
                    <div className="h-2 bg-[#b17741] opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderingSteps;
