import React, { Fragment, Suspense } from "react";

export const GroupSelectedUserBox = (props) => {
   return (
      <Fragment>
         <Suspense fallback="loading..">
            <div className="selectedUserBox mx-1 flex justify-between relative border border-orange-600 hover:bg-orange-300 rounded-md px-4 py-2">
               <span className="">{props.userObject.name}</span>
               <div className="px-2">
                  <span
                     onClick={() => props.closeHandlerFucntion()}
                     className="absolute cursor-pointer my-auto left-[90%]"
                  >
                     <i className="fa-solid fa-x text-gray-800 text-[12px] -mx-2"></i>
                  </span>
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};
