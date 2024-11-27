import React from "react";
import { setHomeStep } from "../../../service/server/layout/Trademark";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ModalEditStep({
  isModalOpen,
  setCloseModal,
  editingStep,
  setFcSteps,
}) {
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    try {
      const formData = new FormData(e.target);
      const updatedStep = {
        step_number: formData.get("step_number"),
        title: formData.get("title"),
        description: formData.get("description"),
        icon: formData.get("icon"),
        order_number: formData.get("order_number"),
      };
      const response = await setHomeStep(updatedStep, editingStep.id);
      if (response.ok) {
        toast.success("Cập nhật thành công");
        setCloseModal(false);
        setFcSteps((prev) => !prev);
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Chỉnh sửa bước</h3>
              <button
                onClick={() => setCloseModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitEdit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="step_number"
                  defaultValue={editingStep?.step_number}
                  className="border-2 p-2 border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingStep?.title}
                  className="border-2 p-2 border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  defaultValue={editingStep?.description}
                  rows="3"
                  className="border-2 p-2 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Icon
                  </label>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to="https://react-icons.github.io/react-icons/"
                  >
                    <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
                      (https://react-icons.github.io/react-icons/)
                    </span>
                  </Link>
                </div>
                <input
                  type="text"
                  name="icon"
                  defaultValue={editingStep?.icon}
                  className="border-2 p-2 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Thứ tự hiển thị
                </label>
                <input
                  type="number"
                  name="order_number"
                  defaultValue={editingStep?.order_number}
                  className="border-2 p-2 mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setCloseModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
