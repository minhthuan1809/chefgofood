import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as CiIcons from "react-icons/ci";
import * as DiIcons from "react-icons/di";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TiIcons from "react-icons/ti";
import * as VscIcons from "react-icons/vsc";
import * as WiIcons from "react-icons/wi";
import { getUiStep } from "../../../service/ui/ui_home_step";

const IconLibraries = {
  Fa: FaIcons,
  Ai: AiIcons,
  Bi: BiIcons,
  Bs: BsIcons,
  Ci: CiIcons,
  Di: DiIcons,
  Fi: FiIcons,
  Gi: GiIcons,
  Go: GoIcons,
  Gr: GrIcons,
  Hi: HiIcons,
  Im: ImIcons,
  Io: IoIcons,
  Io5: Io5Icons,
  Md: MdIcons,
  Ri: RiIcons,
  Si: SiIcons,
  Ti: TiIcons,
  Vsc: VscIcons,
  Wi: WiIcons,
};

const DynamicIcon = ({ iconName, size = 24, className }) => {
  if (!iconName) return null;

  const libraryPrefix = iconName.slice(0, 2);
  const IconLibrary = IconLibraries[libraryPrefix];

  if (!IconLibrary) return null;

  const IconComponent = IconLibrary[iconName];
  return IconComponent ? (
    <IconComponent size={size} className={className} />
  ) : null;
};

const OrderingSteps = () => {
  const [steps, setSteps] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function getStep() {
      const response = await getUiStep();
      // Find the title step (step_number 0)
      const titleStep = response.steps.find((s) => s.step_number === "0");
      setTitle(titleStep?.title || "Các bước đặt món tại FASTFOOT");

      // Filter out step 0 and sort remaining steps
      const contentSteps = response.steps
        .filter((s) => s.step_number !== "0")
        .sort((a, b) => parseInt(a.order_number) - parseInt(b.order_number));

      setSteps(contentSteps);
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
