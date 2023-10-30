import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { getSenderName } from "../Config/ChatNameLogics";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext } from "../context";
import { UserBox } from "./UserBox";

export const UsersChatWith = () => {
   const { themeColor } = useContext(ThemeContext);
   const [loaggedUser, setLoaggedUser] = useState();

   const { _user, set_user, chat, setChat, selectedChat, setSelectedChat } =
      ChatState();

   const fetchChats = async () => {
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${_user.token}`,
            },
         };

         const { data } = await axios.get("/api/chat", config);
         // console.log(data);
         setChat(data);
      } catch (e) {
         alert("Oops!! something went wron fetchChats function");
      }
   };

   useEffect(() => {
      setLoaggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
   }, []);

   // console.log(selectedChat);
   return (
      <Fragment>
         <section
            className={`w-[30%] overflow-y-auto h-full ${
               themeColor === "green" ? allThemeColors.green.bg100 : ""
            }
               ${themeColor === "blue" ? allThemeColors.blue.bg100 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg100 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg100 : ""}
               ${themeColor === "black" ? allThemeColors.black.bg100 : ""}`}
         >
            <div className="chatContainer">
               {chat.map((singleDataObject, key) => (
                  <Fragment key={key}>
                     <div
                        onClick={() => setSelectedChat(singleDataObject)}
                        className={`
                           ${
                              selectedChat === singleDataObject
                                 ? "bg-red-500"
                                 : "black"
                           } cursor-pointer
                        `}
                     >
                        {singleDataObject.isGroup
                           ? singleDataObject.chatName
                           : getSenderName(_user, singleDataObject.users)}
                     </div>
                  </Fragment>
               ))}
            </div>
         </section>
      </Fragment>
   );
};
