import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { capitalize } from "../Config/ChatNameLogics";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ProfilPicProvider, ThemeContext } from "../context";
import { SearchPopupContext } from "../context/SearchPopupContext";
import { ProfilePopup } from "./ProfilePopup";
import { ThemeColorsO } from "./ThemeColorsO";

export const Navbar = () => {
   const { _user } = ChatState();
   const { themeColor } = useContext(ThemeContext);
   const { isPopupOn, setIsPopupOn } = useContext(SearchPopupContext);
   const { profilePopupOn, setProfilePopupOn } = useContext(ProfilPicProvider);
   return (
      <Fragment>
         {profilePopupOn ? <ProfilePopup /> : ""}
         <nav
            className={`sticky inset-0 z-10 flex lg:flex-row  
            lg:justify-between lg:items-center  w-full max-w-full rounded-none 
            ${themeColor === "green" ? allThemeColors.green.bg500 : ""}
               ${themeColor === "blue" ? allThemeColors.blue.bg500 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg500 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg500 : ""}
               ${themeColor === "black" ? allThemeColors.black.bg500 : ""} 
               bg-opacity-80 py-2 px-4 text-white shadow-md backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4 `}
         >
            <div className=" flex flex-col lg:flex-row lg:justify-between lg:items-center justify-center  w-full max-w-full rounded-none">
               <div className="logo">
                  <Link to={"/"} className=" text-xl font-medium text-black">
                     COMMUNA
                  </Link>
               </div>
               <div className="searchBar flex justify-start lg:justify-center items-center">
                  <input
                     className={`outline-none hidden lg:inline mx-1 
                  ${themeColor === "green" ? allThemeColors.green.bg200 : ""}
                  ${themeColor === "blue" ? allThemeColors.blue.bg200 : ""}
                  ${themeColor === "purple" ? allThemeColors.purple.bg200 : ""}
                  ${themeColor === "orange" ? allThemeColors.orange.bg200 : ""}
                  ${themeColor === "black" ? allThemeColors.black.bg200 : ""}
                   placeholder-gray-600 text-slate-800 shadow-md px-3 py-1 rounded-md w-[55vh]`}
                     type="text"
                     placeholder="Search..."
                     onClick={() => setIsPopupOn(!isPopupOn)}
                  />
                  <ThemeColorsO />
               </div>
               <div className="logedUserInfo hidden lg:flex justify-between items-center">
                  <div className="flex justify-between items-center">
                     <span className="text-slate-900 px-2">
                        {capitalize(_user.name)}
                     </span>
                     <div
                        className="userPic"
                        onClick={() => setProfilePopupOn(!profilePopupOn)}
                     >
                        <img
                           className="w-[3rem] rounded-full cursor-pointer"
                           src={_user.pic}
                           alt="communa"
                        />
                     </div>
                  </div>
                  <div className="notifiBell mx-4 flex ">
                     <i className="fa-solid fa-bell text-2xl hover:text-gray-300 cursor-pointer"></i>
                     <span className="w-[20px] h-[20px] rounded-full bg-red-500 flex justify-center items-center">
                        4
                     </span>
                  </div>
               </div>
            </div>

            <div className="logedUserInfo  flex  lg:hidden justify-center items-center">
               <div className="flex flex-col-reverse justify-between items-center">
                  <span className="text-slate-900 w-24 text-[12px] text-center">
                     {capitalize(_user.name)}
                  </span>
                  <div
                     className="userPic"
                     onClick={() => setProfilePopupOn(!profilePopupOn)}
                  >
                     <img
                        className="w-[3rem] rounded-full cursor-pointer"
                        src={_user.pic}
                        alt="communa"
                     />
                  </div>
               </div>
               <div className="notifiBell ">
                  <i className="fa-solid fa-bell text-2xl hover:text-gray-300 cursor-pointer"></i>
               </div>
            </div>
         </nav>
      </Fragment>
   );
};
