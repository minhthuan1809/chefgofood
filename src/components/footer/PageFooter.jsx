/* eslint-disable react/prop-types */
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
import { getUiFooter } from "../../service/ui/ui_footer";
import { useNavigate } from "react-router";

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

const DynamicIcon = ({ iconName, className }) => {
  if (!iconName) return null;

  const libraryPrefix = iconName.slice(0, 2);

  // Lấy thư viện icon tương ứng
  const IconLibrary = IconLibraries[libraryPrefix];

  if (!IconLibrary) return null;

  // Lấy component icon từ thư viện
  const IconComponent = IconLibrary[iconName];

  return IconComponent ? <IconComponent className={className} /> : null;
};

export default function PageFooter() {
  const [footer, setFooter] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getFooter = async () => {
      const res = await getUiFooter();
      if (!res?.ok) {
        navigate("/error");
        return;
      }
      setFooter(res);
    };
    getFooter();
  }, []);

  if (!footer && footer !== Array) {
    navigate("/error");
    return null;
  }

  const { companyInfo, contactSection, socialMedia, footerLinks, newsletter } =
    footer;

  return (
    <footer className="bg-slate-800 text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info Section */}
          <div className="space-y-8">
            <h2 className="text-5xl font-extrabold italic">
              {companyInfo.name}
            </h2>
            <p className="text-lg">{companyInfo.description}</p>
            <div className="flex space-x-6">
              {socialMedia.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  className="text-white hover:text-blue-600 transition-colors duration-300"
                >
                  <DynamicIcon iconName={social.icon} className="h-8 w-8 " />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">{contactSection.title}</h3>
            <ul className="space-y-4">
              {contactSection.items
                .filter((item) => item.type !== "header")
                .map((item) => (
                  <li key={item.id} className="flex items-center space-x-3">
                    <DynamicIcon iconName={item.icon} className="h-6 w-6" />
                    {item.type === "email" ? (
                      <a
                        href={`mailto:${item.content}`}
                        className="hover:underline"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <span>{item.content}</span>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">{newsletter.title}</h3>
            <p>{newsletter.description}</p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder={newsletter.placeholder_text}
                className="px-4 py-3 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors duration-300"
              >
                {newsletter.button_text}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-white border-opacity-20">
          <div className="flex flex-wrap justify-between items-center">
            <p>{companyInfo.copyright_text}</p>
            <nav className="flex space-x-6 text-sm">
              {footerLinks.map((link) => (
                <a key={link.id} href={link.url} className="hover:underline">
                  {link.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
