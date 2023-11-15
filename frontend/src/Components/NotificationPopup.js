import React, { Fragment, Suspense, useContext } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext } from "../context";
import { NotificationPopupProvider } from "../context/NotificationPopupProvider";
import { NotificationUserBox } from "./NotificationUserBox";
import { UserBox } from "./UserBox";

export const NotificationPopup = () => {
   const { themeColor } = useContext(ThemeContext);
   const { noficationPopup, setNotificationPopup } = useContext(
      NotificationPopupProvider
   );

   const { fetchAgain, setFetchAgain, notification, setNotification, _user } =
      ChatState();
   console.log(notification);
   return (
      <Fragment>
         <Suspense>
            <section className="z-20 w-full h-full bg-[rgba(128,126,126,0.3)] backdrop-blur-md absolute top-0 flex justify-center items-center">
               <div
                  className={`lg:w-[50%] w-[80%] rounded-md flex flex-col bg p-4 
               
               ${themeColor === "blue" ? allThemeColors.blue.bg100 : ""}
                  ${themeColor === "purple" ? allThemeColors.purple.bg100 : ""}
                  ${themeColor === "orange" ? allThemeColors.orange.bg100 : ""}
                  ${themeColor === "black" ? allThemeColors.black.bg100 : ""}
                  ${themeColor === "green" ? allThemeColors.green.bg100 : ""}
               `}
               >
                  <div className="flex justify-center items-center my-3 relative">
                     <span
                        onClick={() => {
                           setNotificationPopup(false);
                        }}
                        className="absolute -top-7 left-[98%] my-3 cursor-pointer"
                     >
                        <i className="fa-solid fa-x text-gray-600 text-[15px]"></i>
                     </span>
                  </div>
                  <div className="notifications">
                     {notification
                        ? notification.map((notifi, i) => {
                             return (
                                <Fragment key={i}>
                                   <div className="flex flex-col justify-center ">
                                      <NotificationUserBox {...notifi} />
                                   </div>
                                </Fragment>
                             );
                          })
                        : ""}
                  </div>
               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};
