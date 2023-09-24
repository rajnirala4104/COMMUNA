import React, { Fragment, useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";

export const LoginNdSignup = () => {
   const [login, setLogin] = useState(true);

   return (
      <Fragment>
         <section className="w-full h-[99vh] flex justify-center bg-blue-300">
            <div className="container w-full flex justify-center items-start mt-20">
               <div className="card w-96 flex justify-between items-center flex-col rounded-md bg-white">
                  <div className="btns flex justify-between items-center w-[99.9%]">
                     <button
                        onClick={() => setLogin(true)}
                        className={`${
                           login ? "bg-blue-400" : "border"
                        } w-full outline-none py-4 px-5 my-0`}
                     >
                        Log In
                     </button>
                     <button
                        className={`${
                           !login ? "bg-blue-400" : "border"
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
