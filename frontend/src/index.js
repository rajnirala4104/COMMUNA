import { ChakraProvider } from "@chakra-ui/react";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChatProvider } from "./context/ChatProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <ChakraProvider>
      <ChatProvider>
         <Suspense fallback="loading...">
            <App />
         </Suspense>
      </ChatProvider>
   </ChakraProvider>
);
