import React, { Fragment, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHelp } from "../api/servces";

export const Login = () => {
   const [userLoginEmail, setUserLoginEmail] = useState(null);
   const [userLoginPassword, setUserLoginPassword] = useState(null);
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const naviator = useNavigate();

   const submitHandler = async () => {
      if (!userLoginEmail || !userLoginPassword) {
         setLoading(true);
         alert("Oops!! you have to fill these all");
         setLoading(false);
         return;
      }
      try {
         const { data } = await loginHelp(userLoginEmail, userLoginPassword);
         localStorage.setItem("userInfo", JSON.stringify(data));
         setLoading(false);
         naviator("/chats");
      } catch (e) {
         alert("Oops!! something went wrong..");
      }
   };

   return (
      <Fragment>
         <Suspense fallback="loading...">
            <div className="cardContent my-5 flex justify-evenly items-start flex-col w-[80%] h-[100%]">
               <div className="w-72 my-4">
                  <div className="relative h-10 w-full min-w-[200px]">
                     <input
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-600 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "
                        value={userLoginEmail ? userLoginEmail : ""}
                        onChange={(e) => setUserLoginEmail(e.target.value)}
                     />
                     <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Email Id
                     </label>
                  </div>
               </div>
               <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem] my-4">
                  <input
                     type={showPassword ? "text" : "password"}
                     className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-gray-600 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                     placeholder=" "
                     onChange={(e) => setUserLoginPassword(e.target.value)}
                     required
                  />
                  <button
                     className="!absolute right-1 top-1 z-10 select-none rounded bg-blue-400 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                     type="button"
                     data-ripple-light="true"
                     onClick={() => setShowPassword(!showPassword)}
                  >
                     {!showPassword ? "Show" : "Hide"}
                  </button>
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                     Password
                  </label>
               </div>
               <div
                  className="-mt-4 mb-5 cursor-pointer"
                  onClick={() =>
                     alert("Sorry!!.. we haven't made this functionality")
                  }
               >
                  <span className="text-sm text-blue-600">
                     Forgote Password
                  </span>
               </div>
               <div className="submit w-full flex justify-center items-center">
                  <button
                     className="middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                     data-ripple-light="true"
                     onClick={submitHandler}
                  >
                     Login
                  </button>
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};
