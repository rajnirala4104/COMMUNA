import axios from "axios";
import React, {
   Fragment,
   Suspense,
   useContext,
   useEffect,
   useState,
} from "react";
import ScrollableFeed from "react-scrollable-feed";
import io from "socket.io-client";
import "../CSS/utils.css";
import {
   capitalize,
   getSenderName,
   getUserImage,
} from "../Config/ChatNameLogics";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext, UsersProfilePopupProvider } from "../context";
import { Conversation } from "./Conversation";

const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare;

export const ChatingSection = () => {
   const { themeColor } = useContext(ThemeContext);
   const {
      selectedChat,
      _user,
      setSelectedChat,
      notification,
      setNotification,
      fetchAgain,
      setFetchAgain,
   } = ChatState();
   const { setUsersProfilePopupOn } = useContext(UsersProfilePopupProvider);

   const [loading, setLoading] = useState(false);
   const [newMessage, setNewMessage] = useState();
   const [messages, setMessages] = useState([]);
   const [socketConnected, setSocketConnected] = useState(false);
   const [isTyping, setIsTyping] = useState(false);
   const [typing, setTyping] = useState(false);

   useEffect(() => {
      socket = io(ENDPOINT);
      socket.emit("setup", _user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
   }, []);

   const typingHandler = (e) => {
      setNewMessage(e.target.value);

      if (!socketConnected) {
         return;
      }
      if (!typing) {
         setTyping(true);
         socket.emit("typing", selectedChat._id);
      }
      let lastTypingTime = new Date().getTime();

      let timerRange = 3000;
      setTimeout(() => {
         let timeNow = new Date().getTime();
         let timeDiff = timeNow - lastTypingTime;

         if (timeDiff >= timerRange && typing) {
            socket.emit("stop typing", selectedChat._id);
            setTyping(false);
         }
      }, timerRange);
   };

   const fetchMessages = async () => {
      if (!selectedChat) {
         return;
      }
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${_user.token}`,
            },
         };
         setLoading(true);
         const { data } = await axios.get(
            `/api/message/${selectedChat._id}`,
            config
         );
         setMessages(data);
         setLoading(false);
         socket.emit("join chat", selectedChat._id);
      } catch (error) {
         console.log("something went wrong in fetch message function");
      }
   };

   useEffect(() => {
      fetchMessages();
      selectedChatCompare = selectedChat;
   }, [selectedChat]);

   useEffect(() => {
      socket.on("message recieved", (newMessageRecieved) => {
         if (
            !selectedChatCompare ||
            selectedChatCompare._id !== newMessageRecieved.chat._id
         ) {
            if (!notification.includes(newMessageRecieved)) {
               setNotification([newMessageRecieved, ...notification]);
               setFetchAgain(!fetchAgain);
            }
         } else {
            setMessages([...messages, newMessageRecieved]);
         }
      });
   });

   const sendMessage = async (e) => {
      if (e.key === "Enter" && newMessage) {
         try {
            setLoading(true);
            const config = {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${_user.token}`,
               },
            };

            setNewMessage("");
            const { data } = await axios.post(
               "/api/message",
               {
                  content: newMessage,
                  chatId: selectedChat._id,
               },
               config
            );

            socket.emit("new message", data);

            setMessages([...messages, data]);
            setLoading(false);
         } catch (error) {
            alert("Something went wrong in send message fungtion ");
            console.log(error);
         }
      }
   };

   return (
      <Fragment>
         <Suspense fallback="loading..">
            <Fragment>
               {selectedChat ? (
                  <section className=" w-full lg:h-[88.2vh] border-l border-gray-500">
                     <div className="chatingArea w-full h-full flex justify-between flex-col mb-1">
                        <div
                           className={`upperPart flex items-center  h-[4rem] px-2
                  
                   
               ${themeColor === "green" ? allThemeColors.green.bg300 : ""}
               ${themeColor === "blue" ? allThemeColors.blue.bg300 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg300 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg300 : ""}
               ${themeColor === "black" ? allThemeColors.black.bg300 : ""}
                  
                  `}
                        >
                           {" "}
                           <div
                              onClick={() => setSelectedChat(null)}
                              className={`cursor-pointer backBtn w-[2rem] h-[2rem] rounded-full flex justify-center items-center`}
                           >
                              <i className="fa-solid fa-arrow-left"></i>
                           </div>
                           <div
                              onClick={() => {
                                 setUsersProfilePopupOn(true);
                              }}
                              className="chatPic cursor-pointer"
                           >
                              <img
                                 className="w-10 rounded-full"
                                 src={getUserImage(selectedChat, _user)}
                                 alt=""
                              />
                           </div>
                           <div className="userName mx-2">
                              <span>
                                 {selectedChat.isGroup
                                    ? selectedChat.chatName
                                    : capitalize(
                                         getSenderName(
                                            _user,
                                            selectedChat.users
                                         )
                                      )}
                              </span>
                           </div>
                           <div>
                              {selectedChat.isGroup ? (
                                 ""
                              ) : (
                                 <Fragment>
                                    {isTyping ? (
                                       <Fragment>
                                          {newMessage ? (
                                             ""
                                          ) : (
                                             <span className="text-red-600">
                                                typing..
                                             </span>
                                          )}
                                       </Fragment>
                                    ) : (
                                       ""
                                    )}
                                 </Fragment>
                              )}
                           </div>
                        </div>

                        <div
                           style={{
                              overflowY: "auto",
                              scrollbarWidth: "none",
                           }}
                           className={`chatingMainSection  h-full items-end  flex w-full ${
                              themeColor === "green"
                                 ? allThemeColors.green.bg200
                                 : ""
                           }
               ${themeColor === "blue" ? allThemeColors.blue.bg200 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg200 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg200 : ""}
               ${themeColor === "black" ? allThemeColors.black.bg200 : ""}`}
                        >
                           {loading ? (
                              <span className="m-auto">loading..</span>
                           ) : (
                              <ScrollableFeed className="w-full px-2">
                                 {messages.length !== 0 ? (
                                    messages.map((singleMessage, key) => (
                                       <Fragment key={key}>
                                          <Conversation
                                             message={singleMessage}
                                          />
                                       </Fragment>
                                    ))
                                 ) : (
                                    <dir className=" w-full h-full flex justify-center items-center">
                                       <span className="text-2xl">
                                          Here is no past conversation
                                       </span>
                                    </dir>
                                 )}
                              </ScrollableFeed>
                           )}
                        </div>

                        <div
                           className={`lowerPart flex items-center  h-16  ${
                              themeColor === "green"
                                 ? allThemeColors.green.bg300
                                 : ""
                           }
               ${themeColor === "blue" ? allThemeColors.blue.bg300 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg300 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg300 : ""}
               ${
                  themeColor === "black" ? allThemeColors.black.bg300 : ""
               } px-2`}
                        >
                           <input
                              id="messageInput"
                              onKeyDown={(e) => sendMessage(e)}
                              onChange={(e) => typingHandler(e)}
                              type="text"
                              // defaultValue={newMessage}
                              className={`w-full h-10  ${
                                 themeColor === "green"
                                    ? allThemeColors.green.bg200
                                    : ""
                              }
                        ${
                           themeColor === "blue"
                              ? allThemeColors.blue.bg200
                              : ""
                        }
                        ${
                           themeColor === "purple"
                              ? allThemeColors.purple.bg200
                              : ""
                        }
                        ${
                           themeColor === "orange"
                              ? allThemeColors.orange.bg200
                              : ""
                        }
                        ${
                           themeColor === "black"
                              ? allThemeColors.black.bg200
                              : ""
                        } placeholder:text-gray-700 outline-none px-2 rounded-md`}
                              placeholder="Message.."
                           />
                           <button
                              onClick={() => sendMessage()}
                              className={` ${
                                 themeColor === "green"
                                    ? allThemeColors.green.bg300
                                    : ""
                              }
               ${themeColor === "blue" ? allThemeColors.blue.bg300 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg300 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg300 : ""}
               ${
                  themeColor === "black" ? allThemeColors.black.bg300 : ""
               } px-5 mx-1 py-2 rounded-md 
                ${themeColor === "green" ? "hover:bg-green-400" : ""}
               ${themeColor === "blue" ? "hover:bg-blue-400" : ""}
               ${themeColor === "purple" ? "hover:bg-purple-400" : ""}
               ${themeColor === "orange" ? "hover:bg-orange-400" : ""}
                              ${
                                 themeColor === "black"
                                    ? "hover:bg-gray-400"
                                    : ""
                              }`}
                           >
                              <i className="fa-solid fa-paper-plane"></i>
                           </button>
                        </div>
                     </div>
                  </section>
               ) : (
                  <div
                     className={` ${
                        selectedChat ? "" : "hidden"
                     } lg:flex chatingMainSection w-full  h-full justify-center items-center border-l border-black ${
                        themeColor === "green" ? allThemeColors.green.bg200 : ""
                     }
      ${themeColor === "blue" ? allThemeColors.blue.bg200 : ""}
      ${themeColor === "purple" ? allThemeColors.purple.bg200 : ""}
      ${themeColor === "orange" ? allThemeColors.orange.bg200 : ""}
                     ${
                        themeColor === "black" ? allThemeColors.black.bg200 : ""
                     }`}
                  >
                     <span
                        className={`text-4xl  ${
                           themeColor === "blue" ? "text-blue-900" : ""
                        }
                  ${themeColor === "purple" ? "text-purple-800" : ""}
                  ${themeColor === "orange" ? "text-orange-800" : ""}
                  ${themeColor === "black" ? "text-gray-800" : ""}
                  ${themeColor === "green" ? "text-green-800" : ""}`}
                     >
                        Click on user to start chatting..
                     </span>
                  </div>
               )}
            </Fragment>
         </Suspense>
      </Fragment>
   );
};
