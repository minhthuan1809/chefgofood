import { useEffect, useState } from "react";
import { getUiStep } from "../../../service/ui/ui_home_step";
import { DynamicIcon } from "../../util/iconLibraries";

const OrderingSteps = () => {
  const [steps, setSteps] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function getStep() {
      try {
        const response = await getUiStep();
        const titleStep = response.steps.find((s) => s.step_number === "0");
        setTitle(titleStep?.title || "Các bước đặt món tại FASTFOOT");

        const contentSteps = response.steps
          .filter((s) => s.step_number !== "0")
          .sort((a, b) => parseInt(a.order_number) - parseInt(b.order_number));

        setSteps(contentSteps);
      } catch (error) {
        console.error("Failed to fetch steps:", error);
      }
    }
    getStep();
  }, []);

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-[95rem] w-[95%] mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">
          {title}
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-y-12 gap-x-6 lg:gap-x-20">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connecting lines - visible only on medium and larger screens */}
              {index % 2 === 0 && index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-10 lg:-right-20 w-10 lg:w-20 h-0.5 bg-[#b17741]" />
              )}

              {index < steps.length - 2 && (
                <div className="hidden md:block absolute left-1/2 top-full w-0.5 h-12 bg-[#b17741]" />
              )}

              {/* Mobile connecting line */}
              {index !== steps.length - 1 && (
                <div className="md:hidden absolute left-1/2 top-full w-0.5 h-8 bg-[#b17741]" />
              )}

              <div className="bg-white p-4 md:p-6 rounded-lg border-2 border-[#b17741] hover:border-[#b17741] transition-all duration-300 h-full shadow-sm hover:shadow-md">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  {/* Icon container */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-[#b17741] rounded-full flex items-center justify-center text-white">
                      <DynamicIcon
                        iconName={step.icon}
                        size={24}
                        className="text-white"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm font-bold text-[#b17741] border-2 border-[#b17741] group-hover:border-[#b17741]">
                      {step.step_number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderingSteps;
