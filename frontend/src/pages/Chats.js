import React, { Fragment, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Components";

export const Chats = () => {
   const navigator = useNavigate();
   const [user, setUser] = useState(false);

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (user === null) {
         navigator("/");
      }
      setUser(true);
   }, [navigator]);
   return (
      <Fragment>
         <Suspense fallback="loading...">
            <div className="">{user ? <Navbar /> : ""}</div>
         </Suspense>
      </Fragment>
   );
};
