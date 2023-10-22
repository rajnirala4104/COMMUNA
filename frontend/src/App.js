import { Fragment, Suspense, createContext, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { _ROUTER } from "./router";

export const ThemeContext = createContext();
function App() {
   const [themeColor, setThemeColor] = useState("purple");
   return (
      <Fragment>
         <Suspense fallback="loading...">
            <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
               <RouterProvider router={_ROUTER} />
            </ThemeContext.Provider>
         </Suspense>
      </Fragment>
   );
}

export default App;
