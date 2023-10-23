import React, { Fragment, useContext } from "react";
import { ThemeContext } from "../App";
import { allThemeColors } from "../constants/ThemeColorsConstants";

export const UserBox = () => {
   const { themeColor } = useContext(ThemeContext);
   return (
      <Fragment>
         <div
            className={`${themeColor === "green" ? "hover:bg-green-400" : ""}
               ${themeColor === "blue" ? "hover:bg-blue-400" : ""}
               ${themeColor === "purple" ? "hover:bg-purple-400" : ""}
               ${themeColor === "orange" ? "hover:bg-orange-400" : ""}
               ${
                  themeColor === "black" ? "hover:bg-gray-400" : ""
               } box flex justify-start my-2 mx-2 px-2 py-1 ${
               themeColor === "green" ? allThemeColors.green.bg300 : ""
            }
               ${themeColor === "blue" ? allThemeColors.blue.bg300 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg300 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg300 : ""}
               ${
                  themeColor === "black" ? allThemeColors.black.bg300 : ""
               } rounded-md`}
         >
            <div className="pic">
               <img
                  className="w-10 rounded-full"
                  src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  alt=""
               />
            </div>
            <div className="flex flex-col ml-1">
               <span>User Name</span>
               <span className="text-[13px]">
                  <i>last message</i>
               </span>
            </div>
         </div>
      </Fragment>
   );
};
