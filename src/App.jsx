/* eslint-disable no-unused-vars */
import React from "react";
import RouterDom from "./router/RouterDom";
import SupportChat from "./components/messger/SupportChat";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <div>
      <RouterDom />

      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}
