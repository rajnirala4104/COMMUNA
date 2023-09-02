import { ChakraProvider } from "@chakra-ui/react";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <ChakraProvider>
         <Suspense fallback="loading...">
            <App />
         </Suspense>
      </ChakraProvider>
   </React.StrictMode>
);
