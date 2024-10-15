/* eslint-disable no-unused-vars */
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../components/page/Home";
import Error from "./Error";

export default function RouterDom() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
