import { Fragment, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { _ROUTER } from "./router";

function App() {
   return (
      <Fragment>
         <Suspense fallback="loading...">
            <RouterProvider router={_ROUTER} />
         </Suspense>
      </Fragment>
   );
}

export default App;
