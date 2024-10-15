import { useAuth0 } from "@auth0/auth0-react";
import Nav from "../header/Nav";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [updatedAt, setUpdatedAt] = useState(user ? user.updated_at : "");
  const [userId, setUserId] = useState(user ? user.sub : "");

  async function thuan() {
    console.log(await getAccessTokenSilently());
  }
  useEffect(() => {
    thuan();
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleSave = () => {
    // Lưu thông tin người dùng tại đây
    console.log("Saved User Info:", { name, email, updatedAt, userId });
  };

  return (
    <div>
      <header>
        <Nav />
      </header>
      <div className="mt-[7rem] w-4/5 m-auto bg-white shadow-md rounded-lg p-6">
        {isAuthenticated ? (
          <div className="flex items-start">
            <div className="mr-6">
              <div className="border w-[18rem] h-[18rem] rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={user.picture}
                  alt={user.name}
                />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold mb-4">{user.name}</h1>
              <div className="mb-4">
                <label className="block text-gray-700">Tên:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Gmail:</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ngày tạo:</label>
                <input
                  type="text"
                  value={updatedAt}
                  disabled
                  className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">ID:</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                  readOnly
                />
              </div>
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Lưu
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-xl">Bạn chưa đăng nhập</h2>
          </div>
        )}
      </div>
    </div>
  );
}
