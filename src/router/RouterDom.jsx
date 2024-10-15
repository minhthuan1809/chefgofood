/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../components/page/Home";
import Error from "./Error";
import Profile from "../components/page/Profile";

export default function RouterDom() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
