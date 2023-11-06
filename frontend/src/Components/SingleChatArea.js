import React, { Fragment, Suspense, useContext } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext } from "../context";

export const SingleChatArea = () => {
   const { themeColor } = useContext(ThemeContext);

   const { _user, selectedChat, setSelectedChat } = ChatState();

   return (
      <Fragment>
         <Suspense fallback="loadin..">
            <div
               className={`chatingMainSection w-full h-full  ${
                  themeColor === "green" ? allThemeColors.green.bg100 : ""
               }
               ${themeColor === "blue" ? allThemeColors.blue.bg100 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg100 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg100 : ""}
               ${themeColor === "black" ? allThemeColors.black.bg100 : ""}`}
            ></div>
         </Suspense>
      </Fragment>
   );
};
