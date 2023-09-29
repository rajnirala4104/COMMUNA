import React, { Fragment, Suspense } from "react";
import { LoginNdSignup } from "../Components";

export const Home = () => {
   const localData = JSON.parse(localStorage.getItem("userInfo"));
   // console.log(localData);

   return (
      <Fragment>
         <Suspense fallback={"loading"}>
            {localData ? <h1>Hello {localData.name}</h1> : <LoginNdSignup />}
         </Suspense>
      </Fragment>
   );
};
