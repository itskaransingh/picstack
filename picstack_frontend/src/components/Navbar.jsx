import React from "react";
import { IoMdAdd, IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { userls } from "../utils/lsuserdata";

const Navbar = ({ term, setterm, user }) => {
  const navigate=useNavigate()
  return (
    <div className="py-5 ">
      <div className="flex justify-center md:gap-3 gap-1 px-2 items-center">
        <div className="w-[90%] flex  bg-white rounded-md p-2">
          <div>
            <IoIosSearch fontSize={22} />
          </div>
          <input
            type="text"
            className="w-full outline-none border-none pl-3"
            placeholder="Search..."
            onFocus={()=>navigate('/search')}
            value={term}
            onChange={(e)=>(setterm(e.target.value))}
          />
        </div>
        <Link to={`/userprofile/${user?._id}`}>
          <div className="hidden md:block">
            <img src={user?.pp} alt="user" className="h-10 rounded-md" />
          </div>
        </Link>
        <Link to={"/addpost"}>
          {" "}
          <div className="bg-black text-white h-10 flex justify-center items-center w-10 rounded-md cursor-pointer">
            <IoMdAdd />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
