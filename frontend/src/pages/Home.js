import React, { Fragment, Suspense } from "react";
import { LoginNdSignup } from "../Components";

export const Home = () => {
   return (
      <Fragment>
         <Suspense fallback={"loading"}>
            <LoginNdSignup />
         </Suspense>
      </Fragment>
   );
};
