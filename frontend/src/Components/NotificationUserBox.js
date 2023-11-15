import React, { Fragment, Suspense, useContext } from "react";
import { removeAnObjectFromAnArray } from "../Config/ChatNameLogics";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext } from "../context";
import { NotificationPopupProvider } from "../context/NotificationPopupProvider";

export const NotificationUserBox = (props) => {
   const { themeColor } = useContext(ThemeContext);
   const {
      _user,
      selectedChat,
      setSelectedChat,
      notification,
      setNotification,
   } = ChatState();
   const { noficationPopup, setNotificationPopup } = useContext(
      NotificationPopupProvider
   );

   const removeMessageFromNotificationPopup = (notificationId) => {
      const updatedNotificationDataArr = notification.filter(
         (obj) => obj._id === notificationId
      );
      updatedNotificationDataArr.splice(0, 1);
      setNotification(updatedNotificationDataArr);
   };

   return (
      <Fragment>
         <Suspense fallback={"loading.."}>
            <div
               onClick={() => {
                  setSelectedChat(props.chat);
                  setNotificationPopup(false);
                  removeMessageFromNotificationPopup(props._id);
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
                  <img
                     className="w-10 rounded-full"
                     src={props.sender.pic}
                     alt=""
                  />
               </div>
               <div className="flex flex-col ml-1">
                  <span>{props.sender.name}</span>
                  <span className="text-[13px]">
                     <strong>
                        <i>{props.content}</i>
                     </strong>
                  </span>
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};
