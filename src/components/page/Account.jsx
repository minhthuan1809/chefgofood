import React, { useState, useEffect } from "react";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../header/Nav";
import Profile from "./profiles/Profiles";
import Address from "./profiles/Address";
import { useSelector } from "react-redux";
import Loading from "../util/Loading";
import Password from "./profiles/Password";
import { TbPasswordUser } from "react-icons/tb";
import SupportChat from "../messger/SupportChat";

export default function Account() {
  const navigate = useNavigate();
  const { url } = useParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state) => state.profile.profile);

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
      icon: <TbPasswordUser className="text-yellow-500" />,
      text: "Cập nhật mật khẩu",
      path: "password",
    },
  ];
  const handleNavigation = (path) => {
    setLoading(true);
    setActiveTab(path);
    navigate(`/account/${path}`);
    setLoading(false);
  };

  useEffect(() => {
    if (url && profileLinks.some((link) => link.path === url)) {
      setActiveTab(url);
    } else {
      setActiveTab("profile");
    }
  }, [url]);

  useEffect(() => {
    if (profile === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [profile]);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <Profile />;
      case "address":
        return <Address />;
      case "password":
        return <Password />;
      default:
        return <Profile />;
    }
  };

  const Render = () => {
    return (
      <div className="container mx-auto px-4 pt-[6rem]">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={profile?.avata}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-200"
                />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {profile?.username}
                </h2>
              </div>
              {profileLinks.map((link, index) => (
                <div
                  onClick={() => handleNavigation(link.path)}
                  key={index}
                  className={`flex items-center justify-between p-4 cursor-pointer rounded-lg transition-colors duration-200 shadow-sm mb-3 ${
                    activeTab === link.path
                      ? "bg-blue-100 text-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`text-lg ${
                        activeTab === link.path
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {link.icon}
                    </div>
                    <p
                      className={`font-medium ${
                        activeTab === link.path
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {link.text}
                    </p>
                  </div>
                  <MdKeyboardArrowRight
                    className={`text-lg ${
                      activeTab === link.path
                        ? "text-blue-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm fixed top-0 w-full z-10">
        <Nav />
        <SupportChat />
      </header>
      {loading ? <Loading /> : <Render />}
    </div>
  );
}
