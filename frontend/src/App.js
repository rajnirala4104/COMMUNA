import { Fragment, Suspense, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeContext } from "./context";
import { _ROUTER } from "./router";

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
