import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { BsChatDots, BsX, BsSend } from "react-icons/bs";
import { toast } from "react-toastify";

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { isAuthenticated } = useAuth0();
  const toggleChatWindow = () => {
    toast.dismiss();
    isAuthenticated
      ? setIsOpen(!isOpen)
      : toast.info("Bạn cần đăng nhập để được hỗ trợ");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[350px] h-[500px] bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="flex flex-row items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <BsChatDots size={20} />
              <h3 className="font-semibold">Hỗ trợ trực tuyến</h3>
            </div>
            <button
              className="p-1 hover:bg-blue-700 rounded-full transition-colors"
              onClick={toggleChatWindow}
            >
              <BsX size={20} />
            </button>
          </div>

          <div className="p-4 h-[380px] overflow-y-auto">
            <div className="bg-gray-100 p-3 rounded-lg inline-block">
              Chào bạn, chúng tôi có thể giúp gì cho bạn?
            </div>
          </div>

          <div className="p-2 border-t border-gray-200">
            <div className="flex items-center w-full gap-2">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <BsSend size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="animate-ping h-14 w-14 rounded-full bg-blue-600 opacity-75 absolute"></div>
          <button
            onClick={toggleChatWindow}
            className="z-10 h-14 w-14 relative outline-none rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <BsChatDots size={24} />
          </button>

          <span className="absolute -top-2 -right-2 z-20 items-center justify-center rounded-full text-sm font-bold text-white bg-red-500 w-6 h-6 flex">
            2
          </span>
        </div>
      )}
    </div>
  );
}
