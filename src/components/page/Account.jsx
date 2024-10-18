import React, { useState, useEffect } from "react";
import { FaUser, FaMapMarkerAlt, FaFileInvoiceDollar } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../header/Nav";
import Profile from "./profiles/Profiles";
import Address from "./profiles/Address";
import Vat from "./profiles/Vat";
import PageFooter from "../footer/PageFooter";

export default function Account() {
  const navigate = useNavigate();
  const { url } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const profileLinks = [
    {
      icon: <FaUser className="text-blue-500" />,
      text: "Cập nhật tài khoản",
      path: "profile",
    },
    {
      icon: <FaMapMarkerAlt className="text-green-500" />,
      text: "Cập nhật địa chỉ",
      path: "address",
    },
    {
      icon: <FaFileInvoiceDollar className="text-yellow-500" />,
      text: "Cập nhật hóa đơn VAT của bạn",
      path: "vat",
    },
  ];

  useEffect(() => {
    if (url && profileLinks.some((link) => link.path === url)) {
      setActiveTab(url);
    } else {
      setActiveTab("profile");
    }
  }, [url]);

  const handleNavigation = (path) => {
    setLoading(true);
    setActiveTab(path);
    navigate(`/account/${path}`);
    setLoading(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "address":
        return <Address />;
      case "vat":
        return <Vat />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm fixed top-0 w-full z-10">
        <Nav />
      </header>

      <div className="container mx-auto px-4 pt-[6rem]">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1729158200180-dbd36cf43639?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDV8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D"
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-200"
                />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Nguyễn Minh Thuận
                </h2>
              </div>
              {profileLinks.map((link, index) => (
                <div
                  onClick={() => handleNavigation(link.path)}
                  key={index}
                  className={`flex items-center justify-between p-4 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-200 shadow-sm mb-3 bg-white ${
                    activeTab === link.path ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg">{link.icon}</div>
                    <p className="text-gray-700 font-medium">{link.text}</p>
                  </div>
                  <MdKeyboardArrowRight className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Đang tải dữ liệu...</p>
              </div>
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
