import { IoMdTrash } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaLink } from "react-icons/fa6";
import { useState } from "react";
import { getUpdateProfile } from "../../../service/updatePrrofile";
let dataLoca = JSON.parse(localStorage.getItem("apikey"));

export default function Profile() {
  const profile = useSelector((state) => state.profile.profile);
  const [newName, setNewName] = useState(profile.username);
  const [newUrl, setNewUrl] = useState(profile.avata);
  async function handleOnChange() {
    const newData = { avata: newUrl, username: newName };
    const data = await getUpdateProfile(newData, dataLoca, profile.id);
    console.log(data);
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Thông tin người dùng */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Thông tin người dùng
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 shadow-md">
            <IoMdTrash />
            Xóa tài khoản
          </button>
        </div>

        <div className="flex flex-col items-center mb-4">
          <img
            src={profile.avata}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover mb-4 border-4 border-gray-300"
          />
          <div className="flex items-center w-full">
            <FaLink size={20} className="mr-2" />
            <input
              value={newUrl}
              onChange={(e) => {
                setNewUrl(e.target.value);
              }}
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Nhập url hình ảnh... "
            />
          </div>
        </div>
      </div>

      {/* Thay đổi thông tin */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Thay đổi thông tin
        </h2>
        <input
          value={newName}
          type="text"
          onChange={(e) => setNewName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          placeholder="Nhập tên mới"
        />
        <p className="text-gray-600 mb-4">
          Email:
          <span className="font-medium text-gray-800 break-all">
            {profile.email}
          </span>
        </p>
        <button
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
          onClick={handleOnChange}
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}
