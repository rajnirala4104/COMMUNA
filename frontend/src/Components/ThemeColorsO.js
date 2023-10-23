import React, { Fragment, Suspense, useContext } from "react";
import { ThemeContext } from "../App";

export const ThemeColorsO = () => {
   const { setThemeColor } = useContext(ThemeContext);
   return (
      <Fragment>
         <Suspense fallback="loading..">
            <div className="flex w-44 justify-between my-1">
               <div
                  className="bg-orange-300 w-[1.5rem] h-[1.5rem] rounded-full cursor-pointer border border-gray-500"
                  onClick={() => setThemeColor("orange")}
               ></div>
               <div
                  className="bg-green-300 w-[1.5rem] h-[1.5rem] rounded-full cursor-pointer border border-gray-500"
                  onClick={() => setThemeColor("green")}
               ></div>
               <div
                  className="bg-blue-300 w-[1.5rem] h-[1.5rem] rounded-full cursor-pointer border border-gray-500"
                  onClick={() => setThemeColor("blue")}
               ></div>
               <div
                  className="bg-purple-300 w-[1.5rem] h-[1.5rem] rounded-full cursor-pointer border border-gray-500"
                  onClick={() => setThemeColor("purple")}
               ></div>
               <div
                  className="bg-gray-300 w-[1.5rem] h-[1.5rem] rounded-full cursor-pointer border border-gray-500"
                  onClick={() => setThemeColor("black")}
               ></div>
            </div>
         </Suspense>
      </Fragment>
   );
};
