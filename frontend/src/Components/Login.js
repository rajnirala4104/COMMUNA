import React, { Fragment, Suspense, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHelp } from "../api/servces";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext } from "../context";

export const Login = () => {
   const [userLoginEmail, setUserLoginEmail] = useState(null);
   const [userLoginPassword, setUserLoginPassword] = useState(null);
   const [showPassword, setShowPassword] = useState(false);
   const naviator = useNavigate();
   const { fetchAgain, setFetchAgain } = ChatState();

   const submitHandler = async () => {
      if (!userLoginEmail || !userLoginPassword) {
         alert("invailid email and password");
         return;
      }
      try {
         const { data } = await loginHelp(userLoginEmail, userLoginPassword);
         localStorage.setItem("userInfo", JSON.stringify(data));
         naviator("/chats");
         setFetchAgain(!fetchAgain);
         window.location.reload();
      } catch (e) {
         // console.log(userLoginEmail, userLoginPassword);
         alert("Oops!! something went wrong..");
      }
   };

   const { themeColor } = useContext(ThemeContext);

   return (
      <Fragment>
         <Suspense fallback="loading...">
            <div
               onKeyDown={(e) => (e.key === "Enter" ? submitHandler() : "")}
               className="cardContent my-5 flex justify-evenly items-start flex-col w-[80%] h-[100%]"
            >
               <div className="w-72 my-4">
                  <div className="relative h-10 w-full min-w-[200px]">
                     <input
                        className={`peer h-full w-full rounded-[7px] border  border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-gray-600 outline outline-0 transition-all placeholder-shown:border 
                        
                        ${
                           themeColor === "blue"
                              ? "placeholder-shown:border-blue-200"
                              : ""
                        } ${
                           themeColor === "green"
                              ? "placeholder-shown:border-green-200"
                              : ""
                        } ${
                           themeColor === "purple"
                              ? "placeholder-shown:border-purple-200"
                              : ""
                        }${
                           themeColor === "black"
                              ? "placeholder-shown:border-gray-200"
                              : ""
                        }
                        ${
                           themeColor === "orange"
                              ? "placeholder-shown:border-orange-200"
                              : ""
                        }
                        
                        
                        
                        
                        
                        ${
                           themeColor === "blue"
                              ? "placeholder-shown:border-t-blue-200"
                              : ""
                        } ${
                           themeColor === "green"
                              ? "placeholder-shown:border-t-green-200"
                              : ""
                        } ${
                           themeColor === "purple"
                              ? "placeholder-shown:border-t-purple-200"
                              : ""
                        }${
                           themeColor === "black"
                              ? "placeholder-shown:border-t-gray-200"
                              : ""
                        }
                        ${
                           themeColor === "orange"
                              ? "placeholder-shown:border-t-orange-200"
                              : ""
                        }
                        
                        
                        focus:border-2 ${
                           themeColor === "blue" ? "focus:border-blue-500" : ""
                        } ${
                           themeColor === "green"
                              ? "focus:border-green-500"
                              : ""
                        }${
                           themeColor === "orange"
                              ? "focus:border-orange-500"
                              : ""
                        } ${
                           themeColor === "purple"
                              ? "focus:border-purple-500"
                              : ""
                        }${
                           themeColor === "black" ? "focus:border-gray-500" : ""
                        } focus:border-t-transparent focus:outline-0 disabled:border-0`}
                        placeholder=" "
                        value={userLoginEmail || ""}
                        onChange={(e) => setUserLoginEmail(e.target.value)}
                     />
                     <label
                        className={`before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-orange-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-orange-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-orange-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight 
                        
                        ${
                           themeColor === "blue"
                              ? "peer-focus:text-blue-500"
                              : ""
                        }
                        ${
                           themeColor === "orange"
                              ? "peer-focus:text-orange-500"
                              : ""
                        } ${
                           themeColor === "green"
                              ? "peer-focus:text-green-500"
                              : ""
                        } ${
                           themeColor === "purple"
                              ? "peer-focus:text-purple-500"
                              : ""
                        }${
                           themeColor === "black"
                              ? "peer-focus:text-gray-500"
                              : ""
                        }
                        
                        peer-focus:before:border-t-2 peer-focus:before:border-l-2 ${
                           themeColor === "blue"
                              ? "peer-focus:before:border-blue-500 "
                              : ""
                        } ${
                           themeColor === "green"
                              ? "peer-focus:before:border-green-500 "
                              : ""
                        } ${
                           themeColor === "purple"
                              ? "peer-focus:before:border-purple-500 "
                              : ""
                        }
                        ${
                           themeColor === "orange"
                              ? "peer-focus:before:border-orange-500 "
                              : ""
                        }
                        ${
                           themeColor === "black"
                              ? "peer-focus:before:border-gray-500 "
                              : ""
                        } 
                        
                        peer-focus:after:border-t-2 peer-focus:after:border-r-2
                        
                        ${
                           themeColor === "blue"
                              ? "peer-focus:after:border-blue-500 "
                              : ""
                        } ${
                           themeColor === "green"
                              ? "peer-focus:after:border-green-500 "
                              : ""
                        } ${
                           themeColor === "orange"
                              ? "peer-focus:after:border-orange-500 "
                              : ""
                        } 
                        
                        ${
                           themeColor === "purple"
                              ? "peer-focus:after:border-purple-500 "
                              : ""
                        }${
                           themeColor === "black"
                              ? "peer-focus:after:border-gray-500"
                              : ""
                        }peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-orange-gray-500`}
                     >
                        Email Id
                     </label>
                  </div>
               </div>
               <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem] my-4">
                  <input
                     type={showPassword ? "text" : "password"}
                     className={`peer h-full w-full rounded-[7px] border border-orange-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-gray-600 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-orange-gray-200 placeholder-shown:border-t-orange-gray-200 focus:border-2   ${
                        themeColor === "blue" ? "focus:border-blue-500" : ""
                     } ${
                        themeColor === "green" ? "focus:border-green-500" : ""
                     } ${
                        themeColor === "orange" ? "focus:border-orange-500" : ""
                     } ${
                        themeColor === "purple" ? "focus:border-purple-500" : ""
                     }${
                        themeColor === "black" ? "focus:border-gray-500" : ""
                     } focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-orange-gray-50`}
                     placeholder=" "
                     onChange={(e) => setUserLoginPassword(e.target.value)}
                     required
                  />
                  <button
                     className={`!absolute right-1 top-1 z-10 select-none rounded   ${
                        themeColor === "blue" ? "bg-blue-400" : ""
                     } ${themeColor === "green" ? "bg-green-400" : ""} ${
                        themeColor === "orange" ? "bg-orange-400" : ""
                     } ${themeColor === "purple" ? "bg-purple-400" : ""}${
                        themeColor === "black" ? "bg-gray-400" : ""
                     }
                      py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-orange-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none`}
                     type="button"
                     data-ripple-light="true"
                     onClick={() => setShowPassword(!showPassword)}
                  >
                     {showPassword ? "Hide" : "Show"}
                  </button>
                  <label
                     className={`before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-orange-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-orange-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-orange-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight 
                        
                        ${
                           themeColor === "blue"
                              ? "peer-focus:text-blue-500"
                              : ""
                        } ${
                        themeColor === "green"
                           ? "peer-focus:text-green-500"
                           : ""
                     } ${
                        themeColor === "orange"
                           ? "peer-focus:text-orange-500"
                           : ""
                     } ${
                        themeColor === "purple"
                           ? "peer-focus:text-purple-500"
                           : ""
                     }${
                        themeColor === "black" ? "peer-focus:text-gray-500" : ""
                     }
                        
                        peer-focus:before:border-t-2 peer-focus:before:border-l-2 ${
                           themeColor === "blue"
                              ? "peer-focus:before:border-blue-500 "
                              : ""
                        } ${
                        themeColor === "green"
                           ? "peer-focus:before:border-green-500 "
                           : ""
                     }${
                        themeColor === "orange"
                           ? "peer-focus:before:border-orange-500 "
                           : ""
                     }
                      ${
                         themeColor === "purple"
                            ? "peer-focus:before:border-purple-500 "
                            : ""
                      }${
                        themeColor === "black"
                           ? "peer-focus:before:border-gray-500 "
                           : ""
                     } 
                        
                        peer-focus:after:border-t-2 peer-focus:after:border-r-2
                        
                        ${
                           themeColor === "blue"
                              ? "peer-focus:after:border-blue-500 "
                              : ""
                        } 
                        ${
                           themeColor === "orange"
                              ? "peer-focus:after:border-orange-500 "
                              : ""
                        }
                        ${
                           themeColor === "green"
                              ? "peer-focus:after:border-green-500 "
                              : ""
                        } ${
                        themeColor === "purple"
                           ? "peer-focus:after:border-purple-500 "
                           : ""
                     }${
                        themeColor === "black"
                           ? "peer-focus:after:border-gray-500"
                           : ""
                     }peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-orange-gray-500`}
                  >
                     Password
                  </label>
               </div>
               <div
                  className="-mt-4 mb-5 cursor-pointer"
                  onClick={() =>
                     alert("Sorry!!.. we haven't made this functionality")
                  }
               >
                  <span
                     className={`  ${
                        themeColor === "blue" ? "text-sm text-blue-600" : ""
                     }
                     ${themeColor === "orange" ? "text-sm text-orange-600" : ""}
                     ${
                        themeColor === "green" ? "text-sm text-green-600" : ""
                     } ${
                        themeColor === "purple" ? "text-sm text-purple-600" : ""
                     }${themeColor === "black" ? "text-sm text-gray-600" : ""}
                        `}
                  >
                     Forgote Password
                  </span>
               </div>
               <div className="submit w-full flex justify-center items-center">
                  <button
                     className={`middle none center rounded-lg   ${
                        themeColor === "blue" ? allThemeColors.blue.bg500 : ""
                     } ${
                        themeColor === "orange"
                           ? allThemeColors.orange.bg500
                           : ""
                     } ${
                        themeColor === "green" ? allThemeColors.green.bg500 : ""
                     } ${
                        themeColor === "purple"
                           ? allThemeColors.purple.bg500
                           : ""
                     }${
                        themeColor === "black" ? allThemeColors.black.bg500 : ""
                     }
                      py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg   ${
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
                        themeColor === "black" ? "hover:shadow-gray-500/40" : ""
                     }
                      focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                     data-ripple-light="true"
                     onClick={() => submitHandler()}
                  >
                     Login
                  </button>
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};
