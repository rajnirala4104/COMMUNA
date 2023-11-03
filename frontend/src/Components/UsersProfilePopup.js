import React, { Fragment, useContext } from "react";
import {
   capitalize,
   getSenderName,
   getUserWholeObject,
} from "../Config/ChatNameLogics";
import { ChatState, UsersProfilePopupProvider } from "../context";

export const UsersProfilePopup = () => {
   const { selectedChat, _user } = ChatState();
   const { setUsersProfilePopupOn } = useContext(UsersProfilePopupProvider);

   return (
      <Fragment>
         <section
            className="absolute flex flex-col justify-center  items-center backdrop-blur-sm w-full h-[100%] "
            style={{ background: "rgba(0,0,0,0.5)", zIndex: 30 }}
         >
            {selectedChat.isGroup ? (
               <span className="text-4xl text-white">
                  {capitalize(selectedChat.chatName)}
                  <br />
                  <a href="/">close</a>
               </span>
            ) : (
               <div className="content p-4 relative flex flex-col justify-center items-center">
                  <span
                     onClick={() => {
                        setUsersProfilePopupOn(false);
                     }}
                     className="absolute top-0 left-[90%] my-3 cursor-pointer"
                  >
                     <i className="fa-solid fa-x text-white text-[20px]"></i>
                  </span>
                  <img
                     src={getUserWholeObject(_user, selectedChat.users).pic}
                     className="bg-white w-[70%] rounded-full saturate-100"
                     alt="Raj Nirala"
                  />
                  <div
                     className={`flex my-2 flex-col justify-center items-center bg-orange-200 px-4 py-2 rounded-md`}
                  >
                     <span className=" text-2xl">
                        {capitalize(getSenderName(_user, selectedChat.users))}
                     </span>
                     <span className=" text-sm">
                        <i>
                           {getUserWholeObject(_user, selectedChat.users).email}
                        </i>
                     </span>
                  </div>
               </div>
            )}
         </section>
      </Fragment>
   );
};
