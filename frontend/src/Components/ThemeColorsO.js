import React, { Fragment, Suspense, useContext } from "react";
import { ThemeContext } from "../context";

export const ThemeColorsO = () => {
   const { setThemeColor } = useContext(ThemeContext);

   const setThemeColorToLocalStorage = (themeColor) => { 
      localStorage.setItem("themeColor", JSON.stringify(themeColor))
   }

   return (
      <Fragment>
         <Suspense fallback={<span className="font-mono text-2xl">loading..</span>}>
            <div className="flex w-44 justify-between my-1">
               <div
                  className="bg-orange-300 w-[1.5rem] h-[1.5rem] rounded-full cursor-pointer border border-gray-500"
                  onClick={() => {
                     setThemeColor("orange")
                     setThemeColorToLocalStorage("orange")}
                  }
               ></div>
               <div
                  className="bg-green-300 w-[1.5rem] h-[1.5rem] rounded-full cursor-pointer border border-gray-500"
                  onClick={() => {
                     setThemeColor("green")
                     setThemeColorToLocalStorage("green")}
                  }
               ></div>
               <div
                  className="bg-blue-300 w-[1.5rem] h-[1.5rem] rounded-full cursor-pointer border border-gray-500"
                  onClick={() => {
                     setThemeColor("blue")
                     setThemeColorToLocalStorage("blue")}
                  }
               ></div>
               <div
                  className="bg-purple-300 w-[1.5rem] h-[1.5rem] rounded-full cursor-pointer border border-gray-500"
                  onClick={() => {
                     setThemeColor("purple")
                     setThemeColorToLocalStorage("purple")}
                  }
               ></div>
               <div
                  className="bg-gray-300 w-[1.5rem] h-[1.5rem] rounded-full cursor-pointer border border-gray-500"
                  onClick={() => {
                     setThemeColor("black")
                     setThemeColorToLocalStorage("black")}
                  }
               ></div>
            </div>
         </Suspense>
      </Fragment>
   );
};
