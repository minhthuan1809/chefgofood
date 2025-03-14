import React from "react";

export default function Layout_left(data, setSelectedUser, selectedUser) {
  console.log(data);
  return (
    <div
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
          {user.unread_count > 0 && (
            <span className="bg-[#b17741] text-white rounded-full px-2 py-1 text-xs">
              {user.unread_count}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
