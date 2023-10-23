import React, { Fragment, useContext, useState } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ThemeContext } from "../context";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { ThemeColorsO } from "./ThemeColorsO";

export const LoginNdSignup = () => {
   const [login, setLogin] = useState(true);

   const { themeColor } = useContext(ThemeContext);

   return (
      <Fragment>
         <section
            className={`w-full h-full overflow-hidden items-center flex justify-center ${
               themeColor === "blue" ? allThemeColors.blue.bg300 : ""
            } ${themeColor === "green" ? allThemeColors.green.bg300 : ""} ${
               themeColor === "purple" ? allThemeColors.purple.bg300 : ""
            }${themeColor === "black" ? allThemeColors.black.bg300 : ""} ${
               themeColor === "orange" ? allThemeColors.orange.bg300 : ""
            }`}
         >
            <div className="container w-full h-full flex justify-center items-center flex-col ">
               <ThemeColorsO />
               <div
                  className={`card w-96 flex justify-between items-center flex-col rounded-md bg-white`}
               >
                  <div className="btns flex justify-between items-center w-[99.9%]">
                     <button
                        onClick={() => setLogin(true)}
                        className={`w-full${
                           login
                              ? ` ${
                                   themeColor === "green"
                                      ? allThemeColors.green.bg400
                                      : ""
                                } ${
                                   themeColor === "purple"
                                      ? allThemeColors.purple.bg400
                                      : ""
                                } ${
                                   themeColor === "black"
                                      ? allThemeColors.black.bg400
                                      : ""
                                }${
                                   themeColor === "orange"
                                      ? allThemeColors.orange.bg400
                                      : ""
                                } ${
                                   themeColor === "blue"
                                      ? allThemeColors.blue.bg400
                                      : ""
                                }`
                              : "border"
                        } w-full outline-none py-4 px-5 my-0`}
                     >
                        Log In
                     </button>
                     <button
                        className={`${
                           login
                              ? "border"
                              : `${
                                   themeColor === "blue"
                                      ? allThemeColors.blue.bg400
                                      : ""
                                } ${
                                   themeColor === "green"
                                      ? allThemeColors.green.bg400
                                      : ""
                                } ${
                                   themeColor === "purple"
                                      ? allThemeColors.purple.bg400
                                      : ""
                                }${
                                   themeColor === "black"
                                      ? allThemeColors.black.bg400
                                      : ""
                                }${
                                   themeColor === "orange"
                                      ? allThemeColors.orange.bg400
                                      : ""
                                }`
                        } w-full outline-none py-4 px-5 my-0`}
                        onClick={() => setLogin(false)}
                     >
                        Sign Up
                     </button>
                  </div>
                  {login ? <Login /> : <Signup />}
               </div>
            </div>
         </section>
      </Fragment>
   );
};
