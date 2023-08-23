import { Fragment, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { _ROUTERS } from "./routes";

function App() {
   return (
      <Fragment>
         <Suspense fallback="Loading...">
            <RouterProvider router={_ROUTERS} />
         </Suspense>
      </Fragment>
   );
}

export default App;
