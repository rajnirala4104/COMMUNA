import axios from "axios";
import React, { Fragment, Suspense, useContext, useState } from "react";
import { UserBox } from "../Components";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ThemeContext } from "../context";
import { SearchPopupContext } from "../context/SearchPopupContext";

export const SearchPopup = () => {
   const [searchText, setSearchText] = useState();
   const [searchResult, setSearchResult] = useState();
   const { themeColor } = useContext(ThemeContext);
   const { setIsPopupOn } = useContext(SearchPopupContext);

   const user = JSON.parse(localStorage.getItem("userInfo"));
   const searchHandler = async () => {
      if (!searchText) {
         alert("Abye Kuchh likhega tabhi to kuchh milega..");
      }

      try {
         const config = {
            headers: {
               Authorization: `Bearer ${user.token}`,
            },
         };
         const { data } = await axios.get(
            `/api/user?search=${searchText}`,
            config
         );

         setSearchResult(data);
      } catch (e) {}
   };

   return (
      <Fragment>
         <Suspense>
            <section className="z-20 w-full h-full bg-[rgba(128,126,126,0.3)] backdrop-blur-md absolute top-0 flex justify-center items-center">
               <div
                  className={`w-[50%] rounded-md flex flex-col bg p-4 
               
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
                           setIsPopupOn(false);
                        }}
                        className="absolute -top-7 left-[98%] my-3 cursor-pointer"
                     >
                        <i className="fa-solid fa-x text-gray-600 text-[15px]"></i>
                     </span>
                     <input
                        onChange={(e) => setSearchText(e.target.value)}
                        className={`outline-none mx-1 py-2  ${
                           themeColor === "green"
                              ? allThemeColors.green.bg200
                              : ""
                        }
                  ${themeColor === "blue" ? allThemeColors.blue.bg200 : ""}
                  ${themeColor === "purple" ? allThemeColors.purple.bg200 : ""}
                  ${themeColor === "orange" ? allThemeColors.orange.bg200 : ""}
                  ${
                     themeColor === "black" ? allThemeColors.black.bg200 : ""
                  } placeholder-gray-600 text-slate-800 shadow-md px-3 py-1 rounded-md w-[55vh]`}
                        type="text"
                        placeholder="Search..."
                     />
                     <span
                        onClick={() => searchHandler()}
                        className={`middle none center rounded-lg cursor-pointer  ${
                           themeColor === "blue"
                              ? allThemeColors.blue.bg500
                              : ""
                        } ${
                           themeColor === "orange"
                              ? allThemeColors.orange.bg500
                              : ""
                        } ${
                           themeColor === "green"
                              ? allThemeColors.green.bg500
                              : ""
                        } ${
                           themeColor === "purple"
                              ? allThemeColors.purple.bg500
                              : ""
                        }${
                           themeColor === "black"
                              ? allThemeColors.black.bg500
                              : ""
                        }
                      py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:shadow-lg   ${
                         themeColor === "blue" ? "hover:shadow-blue-500/40" : ""
                      } ${
                           themeColor === "green"
                              ? "hover:shadow-green-500/40"
                              : ""
                        } ${
                           themeColor === "orange"
                              ? "hover:shadow-orange-500/40"
                              : ""
                        } ${
                           themeColor === "purple"
                              ? "hover:shadow-purple-500/40"
                              : ""
                        }${
                           themeColor === "black"
                              ? "hover:shadow-gray-500/40"
                              : ""
                        }
                      focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                        data-ripple-light="true"
                     >
                        Search
                     </span>
                  </div>
                  <div className="searchedUser overflow-y-auto h-[20rem]">
                     {searchResult ? (
                        searchResult.map((singleObject, i) => (
                           <Fragment key={i}>
                              <UserBox {...singleObject} />
                           </Fragment>
                        ))
                     ) : (
                        <div className="flex justify-center items-center my-2">
                           <span className="text-red-400">
                              Nothing To Show Here..
                           </span>
                        </div>
                     )}
                  </div>
               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};