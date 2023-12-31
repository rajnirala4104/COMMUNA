import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ProfilPicProvider, ThemeContext } from "../context";

export const ProfilePopup = () => {
   // const user = JSON.parse(localStorage.getItem("userInfo"));
   const { _user } = ChatState();
   const { setProfilePopupOn } = useContext(ProfilPicProvider);
   const navigator = useNavigate();
   const { themeColor } = useContext(ThemeContext);
   return (
      <Fragment>
         <section
            className="absolute flex flex-col justify-center  items-center backdrop-blur-sm w-full h-[100%] "
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 30 }}
         >
            <div className="content p-4 relative  flex justify-center items-center">
               <span
                  onClick={() => setProfilePopupOn(false)}
                  className="absolute top-0 left-[90%] my-3 cursor-pointer"
               >
                  <i className="fa-solid fa-x text-white text-[20px]"></i>
               </span>
               <img
                  src={_user.pic}
                  className="bg-white w-[70%] rounded-full saturate-100"
                  alt="Raj Nirala"
               />
            </div>
            <div className="btns flex ">
               <span
                  onClick={() =>
                     alert("We have not created this functionality")
                  }
                  className={`px-3 cursor-pointer py-2 mx-5 text-xl rounded-md ${
                     themeColor === "blue" ? allThemeColors.blue.bg400 : ""
                  }
                  ${themeColor === "purple" ? allThemeColors.purple.bg400 : ""}
                  ${themeColor === "orange" ? allThemeColors.orange.bg400 : ""}
                  ${themeColor === "black" ? allThemeColors.black.bg400 : ""}
                  ${themeColor === "green" ? allThemeColors.green.bg400 : ""}`}
               >
                  Profile
               </span>
               <span
                  onClick={() => {
                     localStorage.removeItem("userInfo");
                     navigator("/");
                  }}
                  className={`px-3 cursor-pointer py-2 text-xl rounded-md ${
                     themeColor === "blue" ? allThemeColors.blue.bg400 : ""
                  }
                  ${themeColor === "purple" ? allThemeColors.purple.bg400 : ""}
                  ${themeColor === "orange" ? allThemeColors.orange.bg400 : ""}
                  ${themeColor === "black" ? allThemeColors.black.bg400 : ""}
                  ${themeColor === "green" ? allThemeColors.green.bg400 : ""}`}
               >
                  Logout
               </span>
            </div>
         </section>
      </Fragment>
   );
};
