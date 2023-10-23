import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { SearchPopupContext } from "../context/SearchPopupContext";
import { ThemeColorsO } from "./ThemeColorsO";

export const Navbar = () => {
   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   // console.log(userInfo);

   const { themeColor } = useContext(ThemeContext);
   const { isPopupOn, setIsPopupOn } = useContext(SearchPopupContext);
   return (
      <Fragment>
         <nav
            className={`sticky inset-0 z-10 flex justify-between items-center h-max w-full max-w-full rounded-none ${
               themeColor === "green" ? allThemeColors.green.bg500 : ""
            }
               ${themeColor === "blue" ? allThemeColors.blue.bg500 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg500 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg500 : ""}
               ${
                  themeColor === "black" ? allThemeColors.black.bg500 : ""
               } bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4 `}
         >
            <div className="logo">
               <Link to={"/"} className=" text-xl font-medium text-black">
                  COMMUNA
               </Link>
            </div>
            <div className="searchBar flex justify-center items-center">
               <input
                  className={`outline-none mx-1 ${
                     themeColor === "green" ? allThemeColors.green.bg200 : ""
                  }
                  ${themeColor === "blue" ? allThemeColors.blue.bg200 : ""}
                  ${themeColor === "purple" ? allThemeColors.purple.bg200 : ""}
                  ${themeColor === "orange" ? allThemeColors.orange.bg200 : ""}
                  ${
                     themeColor === "black" ? allThemeColors.black.bg200 : ""
                  } placeholder-gray-600 text-slate-800 shadow-md px-3 py-1 rounded-md w-[55vh]`}
                  type="text"
                  placeholder="Search..."
                  onClick={() => setIsPopupOn(!isPopupOn)}
               />
               <ThemeColorsO />
            </div>
            <div className="logedUserInfo flex justify-between items-center">
               <span className="text-slate-900 px-2">{userInfo.name}</span>
               <div className="userPic">
                  <img
                     className="w-[3rem] rounded-full cursor-pointer"
                     src={userInfo.pic}
                     alt="communa"
                  />
               </div>
            </div>
         </nav>
      </Fragment>
   );
};
