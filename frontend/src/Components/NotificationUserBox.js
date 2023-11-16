import React, { Fragment, Suspense, useContext } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext } from "../context";
import { NotificationPopupProvider } from "../context/NotificationPopupProvider";

export const NotificationUserBox = (props) => {
   const { themeColor } = useContext(ThemeContext);
   const { setSelectedChat, notification, setNotification } = ChatState();
   const { setNotificationPopup } = useContext(NotificationPopupProvider);

   return (
      <Fragment>
         <Suspense fallback={"loading.."}>
            <div
               className={`${themeColor === "green" ? "hover:bg-green-400" : ""}
               ${themeColor === "blue" ? "hover:bg-blue-400" : ""}
               ${themeColor === "purple" ? "hover:bg-purple-400" : ""}
               ${themeColor === "orange" ? "hover:bg-orange-400" : ""}
               ${
                  themeColor === "black" ? "hover:bg-gray-400" : ""
               } box flex justify-between my-2 mx-2 px-2 py-1 ${
                  themeColor === "green" ? allThemeColors.green.bg300 : ""
               }
               ${themeColor === "blue" ? allThemeColors.blue.bg300 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg300 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg300 : ""}
               ${
                  themeColor === "black" ? allThemeColors.black.bg300 : ""
               } rounded-md`}
            >
               <div
                  onClick={() => {
                     setSelectedChat(props.chat);
                     setNotificationPopup(false);
                     setNotification(
                        notification.filter((n) => n._id !== props._id)
                     );
                  }}
                  className="flex justify-between w-full"
               >
                  <div className="flex justify-start items-center ">
                     <div className="pic">
                        <img
                           className="w-10 rounded-full"
                           src={props.sender.pic}
                           alt=""
                        />
                     </div>
                     <div className="flex flex-col ml-1 ">
                        <span>
                           {props.chat.isGroup ? (
                              <div className="flex justify-start items-center">
                                 <span className="text-[13px] w-[15px] h-[15px] rounded-full bg-red-400 flex justify-center items-center mr-1">
                                    G
                                 </span>
                                 {props.chat.chatName}
                              </div>
                           ) : (
                              props.sender.name
                           )}
                        </span>
                        <span className="text-[13px]">
                           {props.chat.isGroup ? (
                              <Fragment>
                                 <span>
                                    <strong>{props.sender.name}: </strong>
                                    <i> {props.content}</i>
                                 </span>
                              </Fragment>
                           ) : (
                              <Fragment>
                                 <span>
                                    <strong>Message: </strong>{" "}
                                    <i>{props.content}</i>
                                 </span>
                              </Fragment>
                           )}
                        </span>
                     </div>
                  </div>
               </div>
               <div className={`z-10 flex justify-center items-center`}>
                  <button
                     onClick={() =>
                        setNotification(
                           notification.filter((n) => n._id !== props._id)
                        )
                     }
                     className={`px-3 py-1 rounded-md ${
                        themeColor === "green" ? allThemeColors.green.bg400 : ""
                     }
               ${themeColor === "blue" ? allThemeColors.blue.bg400 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg400 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg400 : ""}
               ${themeColor === "black" ? allThemeColors.black.bg400 : ""}
               
               ${themeColor === "green" ? "hover:bg-green-300" : ""}
               ${themeColor === "blue" ? "hover:bg-blue-300" : ""}
               ${themeColor === "purple" ? "hover:bg-purple-300" : ""}
               ${themeColor === "orange" ? "hover:bg-orange-300" : ""}
               ${themeColor === "black" ? "hover:bg-gray-300" : ""}
               
               `}
                  >
                     Read
                  </button>
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};
