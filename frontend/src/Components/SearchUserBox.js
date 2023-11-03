import React, { Fragment, useContext } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { SearchPopupContext, ThemeContext } from "../context";

export const SearchUserBox = (props) => {
   const { themeColor } = useContext(ThemeContext);
   const { setIsPopupOn } = useContext(SearchPopupContext);

   return (
      <Fragment>
         <div
            onClick={() => {
               props.handleChat();
               setIsPopupOn(false);
            }}
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
               <img className="w-10 rounded-full" src={props.pic} alt="" />
            </div>
            <div className="flex flex-col ml-1">
               <span>{props.name}</span>
               <span className="text-[13px]">
                  <i>
                     <strong>Email:</strong> {props.email}
                  </i>
               </span>
            </div>
         </div>
      </Fragment>
   );
};
