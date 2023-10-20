import React, { Fragment } from "react";

export const UserBox = () => {
   return (
      <Fragment>
         <div className="hover:bg-orange-400 box flex justify-start my-2 mx-2 px-2 py-1 bg-orange-300 rounded-md">
            <div className="pic">
               <img
                  className="w-10 rounded-full"
                  src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  alt=""
               />
            </div>
            <div className="flex flex-col ml-1">
               <span>User Name</span>
               <span className="text-[13px]">
                  <i>last message</i>
               </span>
            </div>
         </div>
      </Fragment>
   );
};
