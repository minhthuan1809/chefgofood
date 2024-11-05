import React, { useState, useEffect } from "react";
import { HiPencilAlt, HiTrash, HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux";
import { getdecentralization } from "../../../service/server/decentralization/render";
import { useNavigate } from "react-router-dom";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { decentralizationDelete } from "../../../service/server/decentralization/delete";
import Loading from "../../../components/util/Loading";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import ModelDecentralization from "../model_decentralization/ModelDecentralization";
const Decentralization = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showPassword, setShowPassword] = useState(null);
  const apikey = useSelector((state) => state.loginAdmin.apikey_dashboard);
  const [admins, setAdmins] = useState([]);
  const cookies = Cookies.get("admin_apikey");

  const fetchData = async () => {
    console.log("cookies", cookies);
    const data = await getdecentralization(apikey);
    setAdmins(data.data.admins);
  };
  useEffect(() => {
    fetchData();
  }, [apikey]);

  const handleAdd = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEdit = (admin) => {
    setEditingUser(admin);
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      toast.dismiss();
      const result = await decentralizationDelete(userId);
      if (result.success) {
        toast.success("Xóa thành công !");
        fetchData();
      } else {
        toast.error("Lỗi xóa !");
      }
    }
  };
  if (!admins) {
    <Loading />;
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Phân quyền</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <HiPlus /> Thêm mới
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mật khẩu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quyền hạn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                note
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-20 py-4">
                  Chưa có tài khoản nào
                </td>
              </tr>
            ) : (
              admins.map((admin, index) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {admin.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span>
                        {showPassword === admin.id
                          ? admin.password
                          : "••••••••"}
                      </span>
                      <button
                        onClick={() =>
                          setShowPassword(
                            showPassword === admin.id ? null : admin.id
                          )
                        }
                        className="ml-2  hover:text-blue-900"
                      >
                        {showPassword === admin.id ? (
                          <BiSolidHide size={20} />
                        ) : (
                          <BiSolidShow size={20} />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.time}</td>
                  <td className="px-6 py-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            admin.decentralization
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        <span>Phân quyền</span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            admin.discount ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span>Giảm giá</span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            admin.layout ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span>Giao diện</span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            admin.mess ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span>Tin nhắn</span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            admin.order ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span>Đơn hàng</span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            admin.product ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span>Sản phẩm</span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            admin.statistics ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span>Thống kê</span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            admin.user ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></span>
                        <span>Người dùng</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <HiPencilAlt className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <HiTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{admin.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <ModelDecentralization
          user={editingUser}
          onClose={() => setShowModal(false)}
          refetch={fetchData}
        />
      )}
    </div>
  );
};

export default Decentralization;
