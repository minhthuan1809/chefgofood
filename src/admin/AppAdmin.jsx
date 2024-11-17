/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import Dashboard from "./components/page/Dashboard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDecentralization } from "../redux/middlewares/admin/decentralization";
import AdminSidebar from "./components/AdminSidebar";
import Error from "../router/Error";
import { toast } from "react-toastify";
import Decentralization from "./components/page/Decentralization";
import Cookies from "js-cookie";
import Messages from "./components/page/Messages";
import Setting from "./components/page/Setting";
import Sale from "./components/page/Sale";
import Product from "./components/page/Product";
import UserAdmin from "./components/page/UserAdmin";
import DiscountUser from "./components/page/DiscountUser";
import Trademark from "./components/layout/Trademark";
import HistoryDiscount from "./components/page/HistoryDiscount";
import Review from "./components/page/Review";
import Oder from "./components/page/Oder";
import OderHistory from "./components/page/OderHistory";
import Statistical from "./components/page/Statistical";

const AppAdmin = () => {
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
      id: 1,
    },
    { path: "decentralization", page: <Decentralization />, id: 2 },
    { path: "messages", page: <Messages />, id: 3 },
    { path: "settings", page: <Setting />, id: 4 },
    { path: "discounts-main", page: <Sale />, id: 5 },
    { path: "discounts-user", page: <DiscountUser />, id: 6 },
    { path: "products", page: <Product />, id: 7 },
    { path: "users", page: <UserAdmin />, id: 8 },
    { path: "title", page: <Trademark />, id: 9 },
    { path: "history-discounts", page: <HistoryDiscount />, id: 10 },
    { path: "review", page: <Review />, id: 11 },
    { path: "orders-pending", page: <Oder />, id: 13 },
    { path: "orders-history", page: <OderHistory />, id: 14 },
    { path: "stats", page: <Statistical />, id: 15 },
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
    const matchedItem = menuItems.find(
      (item) => item.path.toLowerCase() === url.toLowerCase()
    );
    if (matchedItem) {
      setPage(matchedItem.page);
    } else {
      setPage(<Error />);
    }
  }, [url]);

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white h-full shadow-lg flex flex-col">
        <div className="p-6 border-b">
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

        <nav className="p-4 flex-1 overflow-y-auto">
          <AdminSidebar />
        </nav>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">{page}</div>
    </div>
  );
};

export default AppAdmin;
