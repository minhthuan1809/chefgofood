/* eslint-disable no-unused-vars */
import React from "react";
import RouterDom from "./router/RouterDom";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const { isLoading } = useAuth0();

  return (
    <div>
      {isLoading ? (
        <div className="absolute inset-0 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <RouterDom />
      )}
    </div>
  );
}
