import { Fragment, Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ProfilPicProvider, ThemeContext } from "./context";
import { _ROUTER } from "./router";

function App() {
   const [themeColor, setThemeColor] = useState("orange");
   const [profilePopupOn, setProfilePopupOn] = useState(false);
   return (
      <Fragment>
         <Suspense fallback="loading...">
            <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
               <ProfilPicProvider.Provider
                  value={{ profilePopupOn, setProfilePopupOn }}
               >
                  <RouterProvider router={_ROUTER} />
               </ProfilPicProvider.Provider>
            </ThemeContext.Provider>
         </Suspense>
      </Fragment>
   );
}

export default App;
