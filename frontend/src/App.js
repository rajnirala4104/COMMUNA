import { Fragment, Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { GroupChatPopup, ProfilPicProvider, ThemeContext } from "./context";
import { _ROUTER } from "./router";

function App() {
   const [themeColor, setThemeColor] = useState("orange");
   const [profilePopupOn, setProfilePopupOn] = useState(false);

   const [groupChatPopup, setGroupChatPopup] = useState(false);

   return (
      <Fragment>
         <Suspense fallback="loading...">
            <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
               <ProfilPicProvider.Provider
                  value={{ profilePopupOn, setProfilePopupOn }}
               >
                  <GroupChatPopup.Provider
                     value={{ groupChatPopup, setGroupChatPopup }}
                  >
                     <RouterProvider router={_ROUTER} />
                  </GroupChatPopup.Provider>
               </ProfilPicProvider.Provider>
            </ThemeContext.Provider>
         </Suspense>
      </Fragment>
   );
}

export default App;
