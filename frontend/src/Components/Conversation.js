import React, { Fragment, useContext } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext } from "../context";
import { getTimeFromMongoData } from "../utils";

export const Conversation = (props) => {
   const { themeColor } = useContext(ThemeContext);
   const { _user } = ChatState();
   return (
      <Fragment>
         <div className=" conversation  my-1 w-full  flex flex-col justify-between items-center">
            {/* opposite user message */}
            {props.message.sender._id !== _user._id ? (
               <div className="w-[100%]">
                  <div className="oppositeUserMessage flex items-start flex-col w-[75%] lg:w-[50%] float-left">
                     <span
                        className={` flex flex-col  ${
                           themeColor === "green"
                              ? allThemeColors.green.bg50
                              : ""
                        }
                              ${
                                 themeColor === "blue"
                                    ? allThemeColors.blue.bg50
                                    : ""
                              }
                              ${
                                 themeColor === "purple"
                                    ? allThemeColors.purple.bg50
                                    : ""
                              }
                              ${
                                 themeColor === "orange"
                                    ? allThemeColors.orange.bg50
                                    : ""
                              }
                              ${
                                 themeColor === "black"
                                    ? allThemeColors.black.bg50
                                    : ""
                              } rounded-md px-3 py-2 mx-1  

                              ${themeColor === "green" ? "text-green-900" : ""}
                              ${themeColor === "blue" ? "text-blue-900" : ""}
                              ${
                                 themeColor === "purple"
                                    ? "text-purple-900"
                                    : ""
                              }
                              ${
                                 themeColor === "orange"
                                    ? "text-orange-900"
                                    : ""
                              }
                              ${themeColor === "black" ? "text-gray-900" : ""} 


`}
                     >
                        <span
                           className={`select-none text-[10px] ${
                              themeColor === "green" ? "text-green-700" : ""
                           }
                           ${themeColor === "blue" ? "text-blue-700" : ""}
                           ${themeColor === "purple" ? "text-purple-700" : ""}
                           ${themeColor === "orange" ? "text-orange-700" : ""}
                           ${themeColor === "black" ? "text-gray-700" : ""}   `}
                        >
                           {props.message.sender.name}
                        </span>
                        <span className="">{props.message.content}</span>
                        <span className="text-[10px] opacity-70 select-none -mb-1">
                           {getTimeFromMongoData(props.message.createdAt)}
                        </span>
                     </span>
                  </div>
               </div>
            ) : (
               ""
            )}

            {/* logged user message */}
            {props.message.sender._id === _user._id ? (
               <div className="w-[100%]">
                  <div className="loggedUserMessage  flex justify-end flex-col w-[50%] items-end  my-1 float-right">
                     <span
                        className={` flex flex-col  ${
                           themeColor === "green"
                              ? allThemeColors.green.bg400
                              : ""
                        }
                           ${
                              themeColor === "blue"
                                 ? allThemeColors.blue.bg400
                                 : ""
                           }
                           ${
                              themeColor === "purple"
                                 ? allThemeColors.purple.bg400
                                 : ""
                           }
                           ${
                              themeColor === "orange"
                                 ? allThemeColors.orange.bg400
                                 : ""
                           }
                           ${
                              themeColor === "black"
                                 ? allThemeColors.black.bg400
                                 : ""
                           } rounded-md px-3 py-2 mx-1  


`}
                     >
                        <span
                           className={`text-[10px] ${
                              themeColor === "green" ? "text-green-950" : ""
                           }
                              ${themeColor === "blue" ? "text-blue-950" : ""}
                              ${
                                 themeColor === "purple"
                                    ? "text-purple-950"
                                    : ""
                              }
                              ${
                                 themeColor === "orange"
                                    ? "text-orange-950"
                                    : ""
                              }
                              ${
                                 themeColor === "black" ? "text-gray-950" : ""
                              }   `}
                        >
                           {props.message.sender._id === _user._id ? "You" : ""}
                        </span>
                        <span>{props.message.content}</span>
                        <span className="text-[10px] opacity-70 select-none -mb-1">
                           {getTimeFromMongoData(props.message.createdAt)}
                        </span>
                     </span>
                  </div>
               </div>
            ) : (
               ""
            )}
         </div>
      </Fragment>
   );
};
