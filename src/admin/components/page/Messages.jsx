import React, { useState } from "react";
import { HiOutlinePaperAirplane, HiOutlineUserCircle } from "react-icons/hi2";

export default function Messages() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");

  // Giả lập danh sách người dùng và tin nhắn
  const users = [
    { id: 1, name: "Nguyễn Văn A", unread: 2 },
    { id: 2, name: "Trần Thị B", unread: 0 },
    { id: 3, name: "Lê Văn C", unread: 1 },
  ];

  const messages = [
    {
      id: 1,
      userId: 1,
      content: "Xin chào admin",
      sender: "user",
      time: "10:30",
    },
    {
      id: 2,
      userId: 1,
      content: "Tôi cần hỗ trợ về đơn hàng",
      sender: "user",
      time: "10:31",
    },
    {
      id: 3,
      userId: 1,
      content: "Vâng, tôi có thể giúp gì cho bạn?",
      sender: "admin",
      time: "10:32",
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Xử lý gửi tin nhắn ở đây
    setMessage("");
  };

  return (
    <div className="flex h-full bg-gray-100">
      {/* Danh sách người dùng */}
      <div className="w-1/4 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Tin nhắn hỗ trợ</h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                selectedUser?.id === user.id ? "bg-blue-50" : ""
              }`}
            >
              <HiOutlineUserCircle className="w-10 h-10 text-gray-400" />
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{user.name}</span>
                  {user.unread > 0 && (
                    <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                      {user.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Khu vực chat */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 border-b bg-white">
              <h3 className="font-semibold">{selectedUser.name}</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages
                .filter((m) => m.userId === selectedUser.id)
                .map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 ${
                      message.sender === "admin"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "admin"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      <p>{message.content}</p>
                      <span className="text-xs mt-1 block opacity-70">
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="p-4 bg-white border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                  <HiOutlinePaperAirplane className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Chọn một cuộc trò chuyện để bắt đầu
          </div>
        )}
      </div>
    </div>
  );
}
