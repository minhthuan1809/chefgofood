import { useEffect, useState, useRef } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import {
  getChatAdminDetail,
  getChatAdminRender,
  sendMessageAdmin,
} from "../../../service/server/messger_admin";
import Cookies from "js-cookie";

const ChatMessages = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const intervalRef = useRef(null);
  const messagesEndRef = useRef(null);
  const apiKey = Cookies.get("admin_apikey");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getChatAdminRender();

      setUsers(data.users);
    };
    fetchUsers();
  });

  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        const { data } = await getChatAdminDetail(selectedUser.id);
        setMessages(data.messages);
        scrollToBottom();
      };
      fetchMessages();

      intervalRef.current = setInterval(async () => {
        const { data } = await getChatAdminDetail(selectedUser.id);
        setMessages(data.messages);
      }, 2000);

      return () => clearInterval(intervalRef.current);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //gửi tin nhắn
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const data = await sendMessageAdmin(selectedUser, message, apiKey);

      setMessage("");
      console.log(data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // thống báo tin nhắn chưa đọc
  function CheckNotification(user) {
    if (user.status.unread_count < 1) return null;
    return (
      <span className="bg-[#b17741] text-white rounded-full px-2 py-1 text-xs">
        {user.status.unread_count}
      </span>
    );
  }
  return (
    <div className="flex h-full bg-gray-100">
      {/* User list */}
      <div className="w-1/4 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Support Messages</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                selectedUser?.id === user.id ? "bg-[#b17741]" : ""
              }`}
            >
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{user.username}</span>
                  <CheckNotification status={user} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 border-b bg-white">
              <h3 className="font-semibold">{selectedUser.username}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.sender_type === "admin"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender_type === "admin"
                        ? "bg-[#b17741] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs mt-1 block opacity-70">
                      {message.created_at}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter message..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-[#b17741]"
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[#b17741] text-white p-2 rounded-lg hover:bg-[#b17741]"
                >
                  <HiOutlinePaperAirplane className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Chọn một cuộc hội thoại để bắt đầu
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
