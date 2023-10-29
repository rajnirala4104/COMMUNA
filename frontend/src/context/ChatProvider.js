import { createContext, useContext, useEffect, useState } from "react";
const chatContext = createContext();

const ChatProvider = ({ children }) => {
   const [_user, set_user] = useState();
   const [chat, setChat] = useState([]);
   const [selectedChat, setSelectedChat] = useState();
   useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
      }
      set_user(userInfo);
   }, []);

   return (
      <chatContext.Provider
         value={{
            _user,
            set_user,
            chat,
            setChat,
            selectedChat,
            setSelectedChat,
         }}
      >
         {children}
      </chatContext.Provider>
   );
};

export const ChatState = () => {
   return useContext(chatContext);
};

export default ChatProvider;
