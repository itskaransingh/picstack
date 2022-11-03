import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHome2Fill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { categories } from "../utils/datafromsanity";

const Sidebar = ({ toggelsidebar, user }) => {
  const handlesidebarhide = () => {
    if (toggelsidebar) toggelsidebar(false);
  };





  const isActivestyle =
    "flex font-bold items-center border-r-4 border-black gap-1 capitalize";
  const isnotActivestyle =
    "flex text-gray-500 items-center  hover:text-black gap-1 capitalize";

  return (
    <div className=" w-full z-auto  h-screen overflow-y-auto">
     <Link to={'/'}> <div className="text-2xl py-2 font-semibold " onClick={handlesidebarhide}>
        <span className="text-pink-600">Pic</span>
        <span className="text-orange-500">Stack</span>
      </div></Link>
      <div className="pt-4 flex flex-col gap-5 pl-1">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? isActivestyle : isnotActivestyle
          }
          onClick={handlesidebarhide}
        >
          <div>
            <RiHome2Fill />
          </div>
          <div className=" ">Home</div>
        </NavLink>
        <h3 className="text-base xl:text-lg text-black">Discover Categories</h3>
        <div className=" flex flex-col gap-4">
          {categories.slice(0,categories.length - 1).map((c) => (
            <NavLink
              to={`category/${c.name}`}
              className={({ isActive }) =>
                isActive ? isActivestyle : isnotActivestyle
              }
              onClick={handlesidebarhide}
              key={c.name}
            >
              <div className="h-7 w-7 rounded-full object-cover overflow-hidden"><img src={c.image} alt="" /></div>{c.name}
            </NavLink>
          ))}
        </div>
        <NavLink to={`userprofile/${user?._id}`} className="bottom-0  "
         onClick={handlesidebarhide}>
          <div className="flex items-center justify-start shadow-2xl gap-2 py-2 px-1   mb-5 w-fit bg-white rounded-md">
          <div>
            <img src={user?.pp} alt="" className="h-8 w-8 rounded-full" />
          </div>
          <p className="">{user?.userName}</p>
          <div ><IoIosArrowForward  fontSize={20} /></div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
