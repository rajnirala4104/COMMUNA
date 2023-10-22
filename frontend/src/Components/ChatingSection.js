import React, { Fragment, Suspense } from "react";

export const ChatingSection = () => {
   return (
      <Fragment>
         <Suspense fallback="loading..">
            <section className="w-full h-full border-l border-orange-900">
               <div className="chatingArea w-full h-full flex justify-between flex-col mb-1">
                  <div className="upperPart flex items-center bg-orange-400 h-[4rem] px-2">
                     <div className="chatPic">
                        <img
                           className="w-10 rounded-full"
                           src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                           alt=""
                        />
                     </div>
                     <div className="userName mx-2">
                        <span>User Name</span>
                     </div>
                  </div>
                  <div className="chatingMainSection w-full h-full  bg-orange-100"></div>
                  <div className="lowerPart flex items-center  h-16 bg-orange-400 px-2">
                     <input
                        type="text"
                        className="w-full h-10 bg-orange-200 placeholder:text-gray-700 outline-none px-2 rounded-md"
                        placeholder="Message.."
                     />
                     <button className="bg-orange-400 px-5 mx-1 py-2 rounded-md hover:bg-orange-300">
                        <i className="fa-solid fa-paper-plane"></i>
                     </button>
                  </div>
               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};
