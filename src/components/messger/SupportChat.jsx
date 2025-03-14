import { useEffect, useState, useRef } from "react";
import { BsChatDots, BsX, BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getSupportChat,
  getSupportChatCreates,
} from "../../service/messger_user";

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const statusLogin = useSelector((state) => state.login.status);
  const apiKey = useSelector((state) => state.login.apikey);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [notification, setNotification] = useState(0);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChatWindow = () => {
    toast.dismiss();
    statusLogin
      ? setIsOpen(statusLogin)
      : toast.info("Bạn cần đăng nhập để được hỗ trợ");
  };

  const fetchData = async () => {
    const data = await getSupportChat(apiKey);

    setNotification(data.unread_count);
    if (data.ok) {
      // Sắp xếp tin nhắn theo thời gian
      const sortedMessages = data.data.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      });
      setMessages(sortedMessages);
      setTimeout(scrollToBottom, 100);
    }
  };

  //gửi tin nhắn
  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
    const data = await getSupportChatCreates(apiKey, inputMessage);

    if (data.ok) {
      fetchData();
      setInputMessage("");
    }
  };

  useEffect(() => {
    if (statusLogin) {
      fetchData();
      const interval = setInterval(fetchData, 3000);
      return () => clearInterval(interval);
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[350px] h-[500px] bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="flex flex-row items-center justify-between p-4 bg-[#b17741] text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <BsChatDots size={20} />
              <h3 className="font-semibold">Hỗ trợ trực tuyến</h3>
            </div>
            <button
              className="p-1 hover:bg-[#b17741] rounded-full transition-colors"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <BsX size={20} />
            </button>
          </div>

          <div className="p-4 h-[380px] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 ${
                  msg.sender_type === "admin" ? "text-left" : "text-right"
                }`}
              >
                <div
                  className={`p-3 rounded-lg inline-block ${
                    msg.sender_type === "admin"
                      ? "bg-gray-100"
                      : "bg-[#b17741] text-white"
                  }`}
                >
                  {msg.content}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(msg.created_at).toLocaleString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t border-gray-200">
            <div className="flex items-center w-full gap-2">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                  if (e.key === "Escape") {
                    setIsOpen((prev) => !prev);
                  }
                }}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b17741]"
              />
              <button
                className="p-2 bg-[#b17741] text-white rounded-md hover:bg-[#b17741] transition-colors"
                onClick={handleSendMessage}
              >
                <BsSend size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="animate-ping h-14 w-14 rounded-full bg-[#b17741] opacity-75 absolute"></div>
          <button
            onClick={toggleChatWindow}
            className="z-10 h-14 w-14 relative outline-none rounded-full bg-[#b17741] text-white shadow-lg hover:bg-[#b17741] transition-colors flex items-center justify-center"
          >
            <BsChatDots size={24} />
          </button>
          <p className="text-xs text-gray-500 pt-3">Chat hỗ trợ</p>
          {notification > 0 && (
            <span className="absolute -top-2 -right-2 z-20 items-center justify-center rounded-full text-sm font-bold text-white bg-red-500 w-6 h-6 flex">
              {notification}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
