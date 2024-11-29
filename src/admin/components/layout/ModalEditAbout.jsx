import React, { useState, useEffect } from "react";
import { FaUtensils, FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fixBodyUiAbout } from "../../../service/server/layout/api_about_admin";
import { toast } from "react-toastify";

export default function ModalEditAbout({
  modalEdit,
  setModalEdit,
  dataEdit,
  setRefetch,
}) {
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(<FaUtensils />);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);

  // Synchronize state with dataEdit when modal opens
  useEffect(() => {
    if (modalEdit && dataEdit) {
      setDescription(dataEdit.description || "");
      setIcon(dataEdit.icon || <FaUtensils />);
      setId(dataEdit.id || "");
      setName(dataEdit.name || "");
    }
  }, [modalEdit, dataEdit]);

  const handleSave = async () => {
    toast.dismiss();
    setLoadingBtn(true);
    const response = await fixBodyUiAbout(
      {
        name,
        description,
        icon,
      },
      id
    );
    if (response.ok) {
      setRefetch((prev) => !prev);
      toast.success("Cập nhật thành công");
    } else {
      toast.error("Cập nhật thất bại");
    }
    setLoadingBtn(false);
    handleCancel();
  };

  const handleCancel = () => {
    setModalEdit(false);
  };

  // Don't render if modal is not open
  if (!modalEdit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Sửa Thông Tin</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Tên Món Ăn
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên món ăn"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="icon"
          >
            Icon{" "}
            <Link
              to="https://react-icons.github.io/react-icons/"
              target="_blank"
              className="text-xs text-gray-500"
            >
              (https://react-icons.github.io/react-icons/)
            </Link>
          </label>
          <input
            id="icon"
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Nhập tên icon"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Mô Tả Món Ăn
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả chi tiết"
            rows="4"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition flex items-center"
          >
            <FaTimes className="mr-2" /> Hủy
          </button>
          <button
            disabled={loadingBtn}
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center"
          >
            <FaCheck className="mr-2" />{" "}
            {loadingBtn ? "Đang cập nhật..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
