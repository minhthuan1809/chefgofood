import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAddress } from "../../../redux/middlewares/addAddress";

function EditModal({ isOpen, onClose, onSave, editInfo, handleChange }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Chỉnh sửa địa chỉ
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Tên gợi nhớ:</label>
          <input
            name="name"
            value={editInfo.name || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Địa chỉ:</label>
          <input
            name="address"
            value={editInfo.address || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Số điện thoại:</label>
          <input
            name="phone"
            value={editInfo.phone || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-end">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-2 sm:mb-0 sm:mr-2"
          >
            Lưu
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Address() {
  const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const dataset = useSelector((state) => state.profileAddress.address);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getProfileAddress(profile?.id));
        if (dataset) {
          setAddresses(dataset);
        }
      } catch (error) {
        console.error("Error fetching profile address:", error);
      }
    };

    fetchData();
  }, [dispatch, profile?.id, dataset]);

  const [isEditing, setIsEditing] = useState(false);
  const [editInfo, setEditInfo] = useState({});

  const handleEditClick = (id) => {
    const addressToEdit = addresses.find((address) => address.id === id);
    setEditInfo({ ...addressToEdit });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setAddresses((prev) =>
      prev.map((address) =>
        address.id === editInfo.id ? { ...editInfo } : address
      )
    );
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Cập nhật địa chỉ</h1>

      {addresses.length === 0 ? (
        <p className="text-center text-gray-500 mb-4">Bạn chưa nhập địa chỉ</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border-collapse mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 sm:px-4 py-2 border">Tên gợi nhớ</th>
                <th className="px-2 sm:px-4 py-2 border">Địa chỉ</th>
                <th className="px-2 sm:px-4 py-2 border">Số điện thoại</th>
                <th className="px-2 sm:px-4 py-2 border">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) => (
                <tr key={address.id}>
                  <td className="px-2 sm:px-4 py-2 border">
                    {address.tengoinho}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border">
                    {address.address}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border">{address.phone}</td>
                  <td className="px-2 sm:px-4 py-2 border">
                    <button
                      onClick={() => handleEditClick(address.id)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Sửa
                    </button>
                    <button className="text-red-500 hover:underline">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end">
        <button className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
          Thêm
        </button>
      </div>

      <EditModal
        isOpen={isEditing}
        onClose={handleClose}
        onSave={handleSave}
        editInfo={editInfo}
        handleChange={handleChange}
      />
    </div>
  );
}
