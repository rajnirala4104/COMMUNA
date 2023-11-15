import { Fragment, Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import {
   GroupChatPopup,
   ProfilPicProvider,
   ThemeContext,
   UsersProfilePopupProvider,
} from "./context";
import { NotificationPopupProvider } from "./context/NotificationPopupProvider";
import { _ROUTER } from "./router";

function App() {
   const [themeColor, setThemeColor] = useState("orange");
   const [profilePopupOn, setProfilePopupOn] = useState(false);

   const [groupChatPopup, setGroupChatPopup] = useState(false);
   const [userProfilePopupOn, setUsersProfilePopupOn] = useState(false);
   const [noficationPopup, setNotificationPopup] = useState(false);
   return (
      <Fragment>
         <Suspense fallback="loading...">
            <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
               <NotificationPopupProvider.Provider
                  value={{ noficationPopup, setNotificationPopup }}
               >
                  <ProfilPicProvider.Provider
                     value={{ profilePopupOn, setProfilePopupOn }}
                  >
                     <GroupChatPopup.Provider
                        value={{ groupChatPopup, setGroupChatPopup }}
                     >
                        <UsersProfilePopupProvider.Provider
                           value={{
                              userProfilePopupOn,
                              setUsersProfilePopupOn,
                           }}
                        >
                           <RouterProvider router={_ROUTER} />
                        </UsersProfilePopupProvider.Provider>
                     </GroupChatPopup.Provider>
                  </ProfilPicProvider.Provider>
               </NotificationPopupProvider.Provider>
            </ThemeContext.Provider>
         </Suspense>
      </Fragment>
   );
}

export default App;
