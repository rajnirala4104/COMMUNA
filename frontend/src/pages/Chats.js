import React, { Fragment, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Components";

export const Chats = () => {
   const navigator = useNavigate();

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(user);
      if (!user) {
         navigator("/");
      }
   }, [navigator]);
   return (
      <Fragment>
         <Suspense fallback="loading...">
            <div className="">
               <Navbar />
            </div>
         </Suspense>
      </Fragment>
   );
};
