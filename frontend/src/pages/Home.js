import React, { Fragment, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginNdSignup } from "../Components";

export const Home = () => {
   const navigator = useNavigate();

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (user) {
         // console.log(user);
         navigator("/chats");
      }
   }, [navigator]);

   return (
      <Fragment>
         <Suspense fallback={"loading"}>
            <div className="h-[100vh]">
               <LoginNdSignup />
            </div>
         </Suspense>
      </Fragment>
   );
};
