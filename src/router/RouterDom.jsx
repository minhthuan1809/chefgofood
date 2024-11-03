import { Route, Routes, Navigate } from "react-router-dom";

import Error from "./Error";
import Products from "../components/page/Products";
import Discount from "../components/page/Discount";
import History from "../components/page/History";
import Account from "../components/page/Account";
import About from "../components/page/About";
import Cart from "../components/page/Cart";
import HomePage from "../components/page/HomePage";
import DetailProduct from "../components/page/DetailProduct";
import ErrorSyteam from "./ErrorSyteam";

export default function RouterDom() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account">
          <Route index element={<Navigate to="/account/profile" replace />} />
          <Route path=":url" element={<Account />} />
        </Route>

        <Route path="/history" element={<History />} />
        <Route path="/detail/:name/:id" element={<DetailProduct />} />
        <Route path="/abouts" element={<About />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/discount" element={<Discount />} />
        <Route path="/food" element={<Products />} />
        <Route path="*" element={<Error />} />
        <Route path="/error" element={<ErrorSyteam />} />
      </Routes>
    </div>
  );
}
