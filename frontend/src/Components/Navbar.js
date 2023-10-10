import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   return (
      <Fragment>
         <nav className="sticky inset-0 z-10 flex justify-between items-center h-max w-full max-w-full rounded-none bg-orange-500 bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4 ">
            <div className="logo">
               <Link to={"/"} className=" text-xl font-medium text-black">
                  COMMUNA
               </Link>
            </div>
            <div className="searchBar">
               <input
                  className="outline-none bg-orange-200 placeholder-gray-600 text-slate-800 shadow-md px-3 py-1 rounded-md w-[55vh]"
                  type="text"
                  placeholder="Search..."
               />
            </div>
            <div className="logedUserInfo flex justify-between items-center">
               <span className="text-slate-900 px-2">{userInfo.name}</span>
               <div className="userPic">
                  <img
                     className="w-[3rem] rounded-full cursor-pointer"
                     src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                     alt="communa"
                  />
               </div>
            </div>
         </nav>
      </Fragment>
   );
};
