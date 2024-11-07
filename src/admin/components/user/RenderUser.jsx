/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash, FaEdit, FaTrash } from "react-icons/fa";

export default function RenderUser({ data, handleDelete, handleEdit }) {
  const [showPasswords, setShowPasswords] = useState({});

  const togglePassword = (userId) => {
    setShowPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const renderUserRow = useCallback(
    (user, index) => (
      <tr key={user.id} className="border-t hover:bg-gray-50">
        <td className="p-3">{index + 1}</td>
        <td className="p-3">
          <img
            src={
              user.avata ||
              "https://tse4.mm.bing.net/th?id=OIP.Zmki3GIiRk-XKTzRRlxn4QHaER&pid=Api&P=0&h=220"
            }
            alt={user.username}
            className="w-12 h-12 object-cover rounded-full border"
          />
        </td>
        <td className="p-3">{user.username}</td>
        <td className="p-3">{user.email}</td>
        <td className="p-3">
          <div className="flex items-center gap-2">
            <input
              type={showPasswords[user.id] ? "text" : "password"}
              value={user.password}
              readOnly
              className="border rounded px-2 py-1 w-[5rem]"
            />
            <button
              onClick={() => togglePassword(user.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showPasswords[user.id] ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </td>
        <td className="p-3 text-center w-[7rem]">
          <span
            className={`px-2 py-1 rounded text-sm font-medium ${
              user.role
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {user.role ? "Hoạt động" : "Khóa"}
          </span>
        </td>
        <td className="p-3 text-center">{user.created_at}</td>
        <td className="p-3 text-center">
          <div className="flex gap-2 justify-center">
            <button
              className="p-2 text-blue-600 hover:bg-blue-100 rounded"
              onClick={() => handleEdit(user)}
            >
              <FaEdit />
            </button>
            <button
              className="p-2 text-red-600 hover:bg-red-100 rounded"
              onClick={() => handleDelete(user.id)}
            >
              <FaTrash />
            </button>
          </div>
        </td>
      </tr>
    ),
    [showPasswords, handleDelete]
  );

  return (
    <>
      {data?.length > 0 ? (
        data.map((user, index) => renderUserRow(user, index))
      ) : (
        <tr>
          <td colSpan="8" className="p-4 text-center text-gray-500">
            Không có người dùng nào
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
