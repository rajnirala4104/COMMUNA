import React, { Fragment, useContext } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ThemeContext } from "../context/ThemeProvider";
import { UserBox } from "./UserBox";

export const UsersChatWith = () => {
   const { themeColor } = useContext(ThemeContext);

   return (
      <Fragment>
         <section
            className={`w-[30%] h-full ${
               themeColor === "green" ? allThemeColors.green.bg100 : ""
            }
               ${themeColor === "blue" ? allThemeColors.blue.bg100 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg100 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg100 : ""}
               ${themeColor === "black" ? allThemeColors.black.bg100 : ""}`}
         >
            <UserBox />
            <UserBox />
            <UserBox />
            <UserBox />
            <UserBox />
         </section>
      </Fragment>
   );
};
