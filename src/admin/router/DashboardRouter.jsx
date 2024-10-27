import { Route, Routes, Navigate } from "react-router-dom";

import HomePage from "../components/page/HomePage";

export default function RouterDom() {
  return (
    <div>
      <Routes>
        <Route path="/admin/dashboard" element={<HomePage />} />
      </Routes>
    </div>
  );
}
