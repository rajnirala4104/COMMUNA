import React, { Fragment, Suspense, useContext } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ThemeContext } from "../context";

export const Loading = () => {
   const { themeColor } = useContext(ThemeContext);

   return (
      <Fragment>
         <Suspense>
            <div className="container flex justify-center items-center">
               <div
                  className={`border ${
                     themeColor === "green" ? allThemeColors.green.bg100 : ""
                  }
               ${themeColor === "blue" ? allThemeColors.blue.bg100 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg100 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg100 : ""}
               ${
                  themeColor === "black" ? allThemeColors.black.bg300 : ""
               } shadow rounded-md p-4 max-w-sm w-full mx-auto`}
               >
                  <div className="animate-pulse flex space-x-4">
                     <div
                        className={`rounded-full ${
                           themeColor === "green"
                              ? allThemeColors.green.bg300
                              : ""
                        }
               ${themeColor === "blue" ? allThemeColors.blue.bg300 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg300 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg300 : ""}
               ${
                  themeColor === "black" ? allThemeColors.black.bg300 : ""
               } h-10 w-10`}
                     ></div>
                     <div className="flex-1 space-y-6 py-1">
                        <div
                           className={`h-2 ${
                              themeColor === "green"
                                 ? allThemeColors.green.bg300
                                 : ""
                           }
               ${themeColor === "blue" ? allThemeColors.blue.bg300 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg300 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg300 : ""}
               ${
                  themeColor === "black" ? allThemeColors.black.bg300 : ""
               } rounded`}
                        ></div>
                        <div className="space-y-3">
                           <div className="grid grid-cols-3 gap-4">
                              <div
                                 className={`h-2 ${
                                    themeColor === "green"
                                       ? allThemeColors.green.bg300
                                       : ""
                                 }
               ${themeColor === "blue" ? allThemeColors.blue.bg300 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg300 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg300 : ""}
               ${
                  themeColor === "black" ? allThemeColors.black.bg300 : ""
               } rounded col-span-2`}
                              ></div>
                              <div
                                 className={`h-2 ${
                                    themeColor === "green"
                                       ? allThemeColors.green.bg300
                                       : ""
                                 }
               ${themeColor === "blue" ? allThemeColors.blue.bg300 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg300 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg300 : ""}
               ${
                  themeColor === "black" ? allThemeColors.black.bg300 : ""
               } rounded col-span-1`}
                              ></div>
                           </div>
                           <div
                              className={`h-2 ${
                                 themeColor === "green"
                                    ? allThemeColors.green.bg300
                                    : ""
                              }
               ${themeColor === "blue" ? allThemeColors.blue.bg300 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg300 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg300 : ""}
               ${
                  themeColor === "black" ? allThemeColors.black.bg300 : ""
               } rounded`}
                           ></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};
