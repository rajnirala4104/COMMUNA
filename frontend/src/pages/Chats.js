import React, {
   Fragment,
   Suspense,
   useContext,
   useEffect,
   useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
   ChatingSection,
   CreateGroupPopup,
   Navbar,
   SearchPopup,
   UsersChatWith,
   UsersProfilePopup,
} from "../Components";
import {
   ChatState,
   GroupChatPopup,
   UsersProfilePopupProvider,
} from "../context";
import { SearchPopupContext } from "../context/SearchPopupContext";

export const Chats = () => {
   const navigator = useNavigate();
   const [isUser, setIsUser] = useState(false);
   const { _user, fetchAgain } = ChatState();

   useEffect(() => {
      if (!_user) {
         navigator("/");
      }
      setIsUser(true);
   }, [fetchAgain]);

   const [isPopupOn, setIsPopupOn] = useState(false);
   const { groupChatPopup } = useContext(GroupChatPopup);
   const { userProfilePopupOn } = useContext(UsersProfilePopupProvider);

   return (
      <Fragment>
         <Suspense fallback="loading...">
            <SearchPopupContext.Provider value={{ isPopupOn, setIsPopupOn }}>
               {isUser && (
                  <Fragment>
                     {isPopupOn && <SearchPopup />}
                     {groupChatPopup && <CreateGroupPopup />}
                     {userProfilePopupOn && <UsersProfilePopup />}
                     <Navbar />
                     <div className="flex justify-between w-full h-[88vh]">
                        <UsersChatWith />
                        <ChatingSection />
                     </div>
                  </Fragment>
               )}
            </SearchPopupContext.Provider>
         </Suspense>
      </Fragment>
   );
};
