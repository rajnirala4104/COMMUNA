const { createContext, useState, useContext, useEffect } = require("react");

const chatContext = createContext();

export const ChatProvider = ({ children }) => {
   const [users, setUsers] = useState();
   useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) {
         // navigator();
         console.log("userInfo is empty");
      }
      setUsers(userInfo);
   }, []);

   return (
      <chatContext.Provider value={{ users, setUsers }}>
         {children}
      </chatContext.Provider>
   );
};

export const ChatState = () => {
   return useContext(ChatProvider);
};
