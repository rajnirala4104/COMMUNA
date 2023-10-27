const { createContext, useState, useContext, useEffect } = require("react");

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
   return useContext(ChatProvider);
};

export default ChatProvider;
