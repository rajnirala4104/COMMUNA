import { createBrowserRouter } from "react-router-dom";
import { Chats, Home, Root } from "../pages";

export const _ROUTER = createBrowserRouter([
   {
      path: "/",
      element: <Root />,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/chats",
            element: <Chats />,
         },
      ],
   },
]);
