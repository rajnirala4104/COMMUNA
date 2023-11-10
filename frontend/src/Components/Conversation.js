import React, { Fragment, useContext } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext } from "../context";

export const Conversation = (props) => {
   const { themeColor } = useContext(ThemeContext);
   const { _user, selectedChat } = ChatState();
   // console.log(props.message);
   return (
      <Fragment>
         <div className=" conversation my-1 w-full ">
            {/* opposite user message */}
            {props.message.sender._id !== _user._id ? (
               <div className="oppositeUserMessage flex items-start flex-col">
                  <span
                     className={` flex flex-col  ${
                        themeColor === "green" ? allThemeColors.green.bg50 : ""
                     }
${themeColor === "blue" ? allThemeColors.blue.bg50 : ""}
${themeColor === "purple" ? allThemeColors.purple.bg50 : ""}
${themeColor === "orange" ? allThemeColors.orange.bg50 : ""}
${
   themeColor === "black" ? allThemeColors.black.bg50 : ""
} rounded-md px-3 py-2 mx-1  

${themeColor === "green" ? "text-green-900" : ""}
${themeColor === "blue" ? "text-blue-900" : ""}
${themeColor === "purple" ? "text-purple-900" : ""}
${themeColor === "orange" ? "text-orange-900" : ""}
${themeColor === "black" ? "text-gray-900" : ""} 


`}
                  >
                     <span
                        className={`text-[10px] ${
                           themeColor === "green" ? "text-green-700" : ""
                        }
${themeColor === "blue" ? "text-blue-700" : ""}
${themeColor === "purple" ? "text-purple-700" : ""}
${themeColor === "orange" ? "text-orange-700" : ""}
${themeColor === "black" ? "text-gray-700" : ""}   `}
                     >
                        {selectedChat.isGroup ? props.message.sender.name : ""}
                     </span>
                     {props.message.content}
                  </span>
               </div>
            ) : (
               ""
            )}

            {/* logged user message */}
            {props.message.sender._id === _user._id ? (
               <div className="loggedUserMessage flex flex-col items-start float-right my-1">
                  <span
                     className={` flex flex-col  ${
                        themeColor === "green" ? allThemeColors.green.bg400 : ""
                     }
${themeColor === "blue" ? allThemeColors.blue.bg400 : ""}
${themeColor === "purple" ? allThemeColors.purple.bg400 : ""}
${themeColor === "orange" ? allThemeColors.orange.bg400 : ""}
${
   themeColor === "black" ? allThemeColors.black.bg400 : ""
} rounded-md px-3 py-2 mx-1  


`}
                  >
                     <span
                        className={`text-[10px] ${
                           themeColor === "green" ? "text-green-950" : ""
                        }
${themeColor === "blue" ? "text-blue-950" : ""}
${themeColor === "purple" ? "text-purple-950" : ""}
${themeColor === "orange" ? "text-orange-950" : ""}
${themeColor === "black" ? "text-gray-950" : ""}   `}
                     >
                        {selectedChat.isGroup
                           ? "You"
                           : props.message.sender.name}
                     </span>
                     {props.message.content}
                  </span>
               </div>
            ) : (
               ""
            )}
         </div>
      </Fragment>
   );
};
