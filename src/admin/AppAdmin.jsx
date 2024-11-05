/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { PiVectorThreeFill } from "react-icons/pi";
import Dashboard from "./components/page/Dashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDecentralization } from "../redux/middlewares/admin/decentralization";
import AdminSidebar from "./components/AdminSidebar";
import { HiMagnifyingGlass } from "react-icons/hi2";
import Error from "../router/Error";
import { toast } from "react-toastify";
import Decentralization from "./components/page/Decentralization";
import Cookies from "js-cookie";
import Messages from "./components/page/Messages";
import Setting from "./components/page/Setting";
import Sale from "./components/page/Sale";
const AppAdmin = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [page, setPage] = useState(null);
  const dispatch = useDispatch();
  const dataDecentralization = useSelector(
    (state) => state.decentralization.DecentralizationReducer_dashboard
  );
  const navigate = useNavigate();
  const { url } = useParams();
  const apikey_cookies = Cookies.get("admin_apikey");
  const menuItems = [
    {
      path: "dashboard",
      page: <Dashboard />,
    },
    { path: "decentralization", page: <Decentralization /> },
    { path: "messages", page: <Messages /> },
    { path: "settings", page: <Setting /> },
    { path: "discounts", page: <Sale /> },
  ];
  useEffect(() => {
    async function fetchData() {
      const data = await dispatch(getDecentralization(apikey_cookies));

      if (!data.ok) {
        toast.dismiss();
        Cookies.remove("admin_apikey");
        toast.info("Bạn cần đăng nhập lại ");
        navigate("/admin/dashboard/login");
      }
    }
    fetchData();
  }, [dispatch, url]);

  useEffect(() => {
    const matchedItem = menuItems.find((item) => item.path === url);
    if (matchedItem) {
      setActiveItem(url);
      setPage(matchedItem.page);
    } else {
      setPage(<Error />);
    }
  }, [url]);
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white h-full shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Admin Dashboard
          </h2>
          <div className="flex items-center space-x-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5aZnsestsA7FsrvvOF-dFwvfNJx1VphgRRISfSQDYV1lzclKTTCu5wnFuUKXDpLq6FUM&usqp=CAU"
              alt="Ảnh đại diện"
              className="w-10 h-10 rounded-full ring-2 ring-blue-500"
            />
            <div>
              <h3 className="font-medium">{dataDecentralization?.username}</h3>
              <p className="text-sm text-gray-500">
                {dataDecentralization?.email}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="relative">
            <HiMagnifyingGlass
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <nav className="p-4 flex-1 overflow-y-auto">
          <AdminSidebar />
        </nav>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">{page}</div>
    </div>
  );
};

export default AppAdmin;
