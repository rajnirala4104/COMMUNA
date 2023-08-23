import { Fragment, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { SocketProvider } from "./context/socketProvider";
import { _ROUTERS } from "./routes";

function App() {
   return (
      <Fragment>
         <Suspense fallback="Loading...">
            <SocketProvider>
               <RouterProvider router={_ROUTERS} />
            </SocketProvider>
         </Suspense>
      </Fragment>
   );
}

export default App;
