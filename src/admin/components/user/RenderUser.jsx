import { useCallback } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash, FaUser } from "react-icons/fa";

export default function RenderUser({ data, handleDelete, handleEdit }) {
  const renderUserRow = useCallback((user, index) => (
    <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6 text-center">{index + 1}</td>
      <td className="py-4 px-6">
        <div className="flex items-center">
          {user?.avata ? (
            <img
              src={user.avata}
              alt={user.username}
              className="w-10 h-10 object-cover rounded-full border shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <FaUser size={16} />
            </div>
          )}
        </div>
      </td>
      <td className="py-4 px-6 font-medium">{user.username}</td>
      <td className="py-4 px-6 text-gray-600">{user.email}</td>
      <td className="py-4 px-6 text-center">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
            user.role
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.role ? "Hoạt động" : "Khóa"}
        </span>
      </td>
      <td className="py-4 px-6 text-gray-600 text-center">{user.created_at}</td>
      <td className="py-4 px-6">
        <div className="flex gap-2 justify-center">
          <button
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            onClick={() => handleEdit(user)}
            title="Chỉnh sửa"
          >
            <FaEdit size={16} />
          </button>
          <button
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            onClick={() => handleDelete(user.id)}
            title="Xóa"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      {data?.length > 0 ? (
        data.map((user, index) => renderUserRow(user, index))
      ) : (
        <tr>
          <td colSpan="8" className="py-8 text-center text-gray-500">
            <div className="flex flex-col items-center">
              <FaUser size={32} className="text-gray-300 mb-2" />
              <p>Không có người dùng nào</p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

RenderUser.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      avata: PropTypes.string,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      role: PropTypes.bool.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};
