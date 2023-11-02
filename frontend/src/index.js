import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ChatProvider from "./context/ChatProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <ChatProvider>
      <Suspense>
         <App />
      </Suspense>
   </ChatProvider>
);
