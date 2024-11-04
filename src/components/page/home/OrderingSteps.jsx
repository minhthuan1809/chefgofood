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
        // Find the title step (step_number 0)
        const titleStep = response.steps.find((s) => s.step_number === "0");
        setTitle(titleStep?.title || "Các bước đặt món tại FASTFOOT");

        // Filter out step 0 and sort remaining steps
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
    <section className="py-12 bg-gray-50">
      <div className="max-w-[95rem] w-[95%] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {title}
        </h2>

        <div className="relative grid grid-cols-2 gap-y-12 gap-x-20">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {index % 2 === 0 && index !== steps.length - 1 && (
                <div className="absolute top-1/2 -right-20 w-20 h-0.5 bg-blue-200" />
              )}

              {index < steps.length - 2 && (
                <div className="absolute left-1/2 top-full w-0.5 h-12 bg-blue-200" />
              )}

              <div className="bg-white p-6 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 h-full">
                <div className="flex items-start space-x-4 gap-3">
                  {/* Icon container */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <DynamicIcon
                        iconName={step.icon}
                        size={24}
                        className="text-white"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-sm font-bold text-blue-600 border-2 border-blue-200 group-hover:border-blue-400">
                      {step.step_number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
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
