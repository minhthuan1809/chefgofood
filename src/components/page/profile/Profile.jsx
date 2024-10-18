import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import Nav from "../../header/Nav";
export default function Profile() {
  return (
    <div>
      <header>
        <Nav />
      </header>
      <div>
        <div className="w-[5rem] h-[5rem] w-[6rem] rounded-full">
          <img
            className="w-full h-full"
            src="https://images.pexels.com/photos/10752181/pexels-photo-10752181.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
          />
        </div>
        <h1>thuans</h1>
      </div>
      <div className="flex items-center gap-2">
        <FaRegUser size={20} />
        <p>Cập nhật tài khoản</p>
        <FaChevronRight />
      </div>
    </div>
  );
}
