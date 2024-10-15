import React from "react";
import Nav from "../components/header/Nav";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="w-full">
        <Nav />
      </header>
      <main className="mt-[5rem]">
        <h1 className="text-4xl text-center font-bold text-red-600">
          404 - Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          The page you are looking for does not exist.
        </p>
      </main>
    </div>
  );
}
