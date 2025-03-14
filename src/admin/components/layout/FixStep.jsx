import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";

import { getUiStep } from "../../../service/ui/ui_home_step";
import { DynamicIcon } from "../../../components/util/iconLibraries";

export default function FixStep({ setCloseModal, setEditingStep, fcSteps }) {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    toast.dismiss();
    const fetchSteps = async () => {
      try {
        const response = await getUiStep();
        const titleStep = response.steps.find((s) => s.step_number === "0");

        const contentSteps = response.steps
          .filter((s) => s.step_number !== "0")
          .sort((a, b) => parseInt(a.order_number) - parseInt(b.order_number));

        setSteps(contentSteps);
      } catch (error) {
        console.error("Failed to fetch steps:", error);
      }
    };
    fetchSteps();
  }, [fcSteps]);

  return (
    <div className="bg-white/80 backdrop-blur-lg p-6 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Các bước đặt món
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step) => (
          <div key={step.id} className="relative group">
            <div className="bg-white p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 h-full shadow-sm hover:shadow-md">
              <div className="flex items-start space-x-4">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
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
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
                <button
                  className="text-blue-600 hover:text-blue-800 transition-all duration-300 hover:bg-blue-50 p-2 rounded-full"
                  onClick={() => {
                    setCloseModal(true);
                    setEditingStep(step);
                  }}
                >
                  <MdModeEditOutline size={24} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
