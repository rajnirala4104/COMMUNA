import React, { Fragment } from "react";
import { UserBox } from "./UserBox";

export const UsersChatWith = () => {
   return (
      <Fragment>
         <section className="w-[30%] h-full bg-orange-100">
            <UserBox />
            <UserBox />
            <UserBox />
            <UserBox />
            <UserBox />
         </section>
      </Fragment>
   );
};
