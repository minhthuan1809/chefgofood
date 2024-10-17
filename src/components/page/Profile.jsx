import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaEdit, FaMapMarkerAlt, FaPhone, FaCamera } from "react-icons/fa";
import Nav from "../header/Nav";

export default function Profile() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [updatedAt, setUpdatedAt] = useState(user?.updated_at || "");
  const [userId, setUserId] = useState(user?.sub || "");
  const [address, setAddress] = useState("Nhà 41 ngõ 66, Kim Chung, Hà Nội");
  const [phone, setPhone] = useState("0123456789");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(user?.picture || "");

  useEffect(() => {
    async function fetchToken() {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        console.log(token);
      }
    }
    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleSave = () => {
    console.log("Đã lưu thông tin người dùng:", {
      name,
      email,
      updatedAt,
      userId,
      address,
      phone,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <header>
        <Nav />
      </header>
      <div className="bg-gray-100 min-h-screen pt-[6rem]">
        <div className="max-w-4xl mx-auto pt-16 px-4">
          {isAuthenticated ? (
            <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-8 group">
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      src={profilePicture}
                      alt={name}
                    />
                    <label
                      htmlFor="profilePicture"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    >
                      <FaCamera className="text-white text-3xl" />
                    </label>
                    <input
                      id="profilePicture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-6 text-gray-800">
                      {name}
                    </h1>
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Tên
                        </label>
                        <input
                          id="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                          value={email}
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="updatedAt"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          Ngày tạo
                        </label>
                        <input
                          id="updatedAt"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                          value={updatedAt}
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="userId"
                          className="block mb-2 text-sm font-medium text-gray-700"
                        >
                          ID Người dùng
                        </label>
                        <input
                          id="userId"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                          value={userId}
                          readOnly
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleSave}
                      className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-8">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                      Thông tin liên hệ
                    </h2>
                    <button
                      onClick={() => setIsDialogOpen(true)}
                      className="ml-3 p-2 text-blue-500 hover:text-blue-700 transition duration-200"
                    >
                      <FaEdit size={20} />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-blue-500" />
                    <span className="text-gray-700">{address}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-3 text-blue-500" />
                    <span className="text-gray-700">{phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center bg-white p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-gray-800">
                Bạn chưa đăng nhập
              </h2>
            </div>
          )}
        </div>
        {/* moda */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Chỉnh sửa thông tin liên hệ
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="newAddress"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Địa chỉ mới
                  </label>
                  <input
                    id="newAddress"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPhone"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Số điện thoại mới
                  </label>
                  <input
                    id="newPhone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-200"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    console.log("Đã cập nhật thông tin liên hệ");
                    setIsDialogOpen(false);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
