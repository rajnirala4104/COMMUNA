import React, { Fragment, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
   ChatingSection,
   Navbar,
   SearchPopup,
   UsersChatWith,
} from "../Components";
import { ChatState } from "../context";
import { SearchPopupContext } from "../context/SearchPopupContext";

export const Chats = () => {
   const navigator = useNavigate();
   const [isUser, setIsUser] = useState(false);
   const { _user } = ChatState();

   useEffect(() => {
      if (_user === null) {
         navigator("/");
      }
      setIsUser(true);
   }, [navigator]);

   const [isPopupOn, setIsPopupOn] = useState(false);
   return (
      <Fragment>
         <Suspense fallback="loading...">
            <SearchPopupContext.Provider value={{ isPopupOn, setIsPopupOn }}>
               {isUser ? (
                  <Fragment>
                     {isPopupOn ? <SearchPopup /> : <></>}
                     <Navbar />
                     <div className="flex justify-between w-full h-[87vh]">
                        <UsersChatWith />
                        <ChatingSection />
                     </div>
                  </Fragment>
               ) : (
                  ""
               )}
            </SearchPopupContext.Provider>
         </Suspense>
      </Fragment>
   );
};
