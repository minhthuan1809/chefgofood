import { IoMdTrash } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { FaLink, FaUserEdit } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { getDelete, getUpdateProfile } from "../../../service/Profile_Client";
import { useNavigate } from "react-router";
import { apikeyRedux } from "../../../redux/action/client/profile";
import { getProfile } from "../../../redux/middlewares/client/addProfile";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const apiKey = useSelector((state) => state.login.apikey);

  const [newName, setNewName] = useState(profile?.username);
  const [newUrl, setNewUrl] = useState(profile?.avata);
  const [isEditing, setIsEditing] = useState(false);

  async function handleSaveChanges() {
    if (window.confirm("Bạn có muốn lưu những thay đổi này?")) {
      try {
        const newData = { avata: newUrl, username: newName };
        const data = await getUpdateProfile(newData, profile?.id);
        if (data?.success) {
          toast.success("Cập nhật thông tin thành công!");
          await dispatch(getProfile(apiKey));
          setIsEditing(false);
        } else {
          toast.error("Cập nhật thất bại!");
        }
      } catch (error) {
        console.error("Lỗi cập nhật:", error);
        toast.error("Đã xảy ra lỗi khi cập nhật thông tin!");
      }
    }
  }

  async function handleDelete() {
    if (
      window.confirm(
        "Bạn có chắc muốn xóa tài khoản này? Hành động này không thể hoàn tác."
      )
    ) {
      try {
        const response = await getDelete(apiKey);
        if (!response.ok) {
          toast.error("Xóa tài khoản thất bại!");
          return;
        }

        if (response.success) {
          dispatch(apikeyRedux(null, false));
          localStorage.removeItem("apikey");
          navigate("/");
          toast.success("Tài khoản của bạn đã được xóa thành công!");
        } else {
          toast.error("Xóa tài khoản thất bại!");
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi xóa tài khoản!");
        console.log(error);
      }
    }
  }

  if (!profile) {
    return (
      <div className=" bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
          <div className="flex justify-center items-center h-32">
            <p className="text-lg text-gray-500">
              Không tìm thấy thông tin người dùng
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-[#b17741] to-amber-500 rounded-t-xl p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Hồ sơ cá nhân</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#b17741] rounded-lg hover:bg-amber-50 transition duration-200 shadow-md"
            >
              <FaUserEdit />
              {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa hồ sơ"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-b-xl shadow-md overflow-hidden">
          <div className="relative">
            <div className="h-24 bg-gradient-to-r from-[#b17741] to-amber-500"></div>
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative group">
                <img
                  src={profile.avata || "/default-avatar.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaLink size={24} className="text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-20 px-6 pb-8">
            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL hình ảnh
                  </label>
                  <div className="flex items-center w-full">
                    <FaLink size={20} className="text-gray-400 mr-2" />
                    <input
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b17741] shadow-sm"
                      placeholder="Nhập URL hình ảnh..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên người dùng
                  </label>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b17741] shadow-sm"
                    placeholder="Nhập tên mới"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="p-3 bg-amber-50 rounded-lg text-gray-700">
                    {profile.email}
                  </p>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSaveChanges}
                    className="flex-1 px-4 py-3 bg-[#b17741] text-white rounded-lg hover:bg-amber-700 transition duration-200 shadow-md"
                  >
                    Lưu thay đổi
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 shadow-md"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile.username}
                  </h2>
                  <p className="text-gray-500">{profile.email}</p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-amber-800">
                        Tên người dùng
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {profile.username}
                      </p>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-amber-800">
                        Email
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900 break-all">
                        {profile.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-2 px-4 py-2 w-full bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-200 border border-red-200"
                  >
                    <IoMdTrash />
                    Xóa tài khoản
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
