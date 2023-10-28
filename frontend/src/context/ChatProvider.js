import { createContext, useContext, useEffect, useState } from "react";
const chatContext = createContext();

const ChatProvider = ({ children }) => {
   const [allUsers, setAllUsers] = useState();
   useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
      }
      setAllUsers(userInfo);
   }, []);

   return (
      <chatContext.Provider value={{ allUsers, setAllUsers }}>
         {children}
      </chatContext.Provider>
   );
};

export const ChatState = () => {
   return useContext(chatContext);
};

export default ChatProvider;
