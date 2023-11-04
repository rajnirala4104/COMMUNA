import React, { Fragment, Suspense, useContext } from "react";
import { DotSvg, allImages } from "../assets/images";
import { ChatState, ThemeContext } from "../context";

export const GroupSelectedUserBox = (props) => {
   const { themeColor } = useContext(ThemeContext);
   const { selectedChat, _user } = ChatState();

   console.log(selectedChat.groupAdmin.email);
   console.log(props.userObject.email);

   return (
      <Fragment>
         <Suspense fallback="loading..">
            <div
               className={`cursor-pointer selectedUserBox mx-1 flex justify-between relative border  ${
                  themeColor === "blue" ? "border-blue-600" : ""
               } ${themeColor === "orange" ? "border-orange-600" : ""} ${
                  themeColor === "green" ? "border-green-600" : ""
               } ${themeColor === "purple" ? "border-purple-600" : ""}${
                  themeColor === "black" ? "border-gray-600" : ""
               } 
               
               ${themeColor === "blue" ? "hover:bg-blue-300" : ""} ${
                  themeColor === "orange" ? "hover:bg-orange-300" : ""
               } ${themeColor === "green" ? "hover:bg-green-300" : ""} ${
                  themeColor === "purple" ? "hover:bg-purple-300" : ""
               }${themeColor === "black" ? "hover:bg-gray-300" : ""}
               rounded-md px-4 py-2`}
            >
               <div className="flex justify-between items-center">
                  {selectedChat.groupAdmin.email === props.userObject.email ? (
                     // <img src={{ DotSvg }} alt="Oops!!" />
                     <span className="w-2 h-2 mx-2 bg-red-500 rounded-full"></span>
                  ) : (
                     ""
                  )}
                  <span className="">{props.userObject.name}</span>
               </div>
               <div className="px-2">
                  <span
                     onClick={() => props.closeHandlerFucntion()}
                     className={`absolute cursor-pointer my-auto left-[90%]`}
                  >
                     <i
                        className={`fa-solid fa-x text-gray-800 text-[12px] -mx-2`}
                     ></i>
                  </span>
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};
