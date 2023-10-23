import React, {
   Fragment,
   Suspense,
   createContext,
   useEffect,
   useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
   ChatingSection,
   Navbar,
   SearchPopup,
   UsersChatWith,
} from "../Components";
import { SearchPopupContext } from "../context/SearchPopupContext";

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

   const [isPopupOn, setIsPopupOn] = useState(false);
   return (
      <Fragment>
         <Suspense fallback="loading...">
            <SearchPopupContext.Provider value={{ isPopupOn, setIsPopupOn }}>
               {user ? (
                  <Fragment>
                     {isPopupOn ? <SearchPopup /> : ""}
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
