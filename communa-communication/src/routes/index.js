import { createBrowserRouter } from "react-router-dom";

export const _ROUTERS = createBrowserRouter([
   {
      path: "/",
      async lazy() {
         let { Root } = await import("../pages/Root");
         return { Component: Root };
      },
      children: [
         {
            path: "/",
            async lazy() {
               let { Home } = await import("../pages/Home");
               return { Component: Home };
            },
         },
      ],
   },
]);
