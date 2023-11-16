import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import {
   capitalize,
   getSenderName,
   getUserImage,
} from "../Config/ChatNameLogics";
import { getAllTheChat } from "../api/servces/chats";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import {
   ChatState,
   GroupChatPopup,
   SearchPopupContext,
   ThemeContext,
} from "../context";

export const UsersChatWith = () => {
   const { themeColor } = useContext(ThemeContext);

   const { _user, chat, setChat, selectedChat, setSelectedChat, fetchAgain } =
      ChatState();

   const fetchChats = async () => {
      try {
         const { data } = await getAllTheChat(_user.token);
         setChat(data);
      } catch (e) {
         console.log("Oops!! something went wron fetchChats function");
      }
   };

   useEffect(() => {
      fetchChats();
   }, [fetchAgain]);

   // console.log(chat);
   const { setIsPopupOn } = useContext(SearchPopupContext);
   const { setGroupChatPopup } = useContext(GroupChatPopup);

   return (
      <Fragment>
         <section
            className={`${
               selectedChat ? "hidden" : ""
            } lg:inline lg:w-[30%] w-[100%] relative overflow-y-auto h-full overflow-x-hidden ${
               themeColor === "green" ? allThemeColors.green.bg100 : ""
            }
               ${themeColor === "blue" ? allThemeColors.blue.bg100 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg100 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg100 : ""}
               ${themeColor === "black" ? allThemeColors.black.bg100 : ""}`}
         >
            <div
               className={`sticky top-[0%] h-12 flex justify-center items-center ${
                  themeColor === "blue" ? allThemeColors.blue.bg500 : ""
               } ${
                  themeColor === "orange" ? allThemeColors.orange.bg500 : ""
               } ${themeColor === "green" ? allThemeColors.green.bg500 : ""} ${
                  themeColor === "purple" ? allThemeColors.purple.bg500 : ""
               }${themeColor === "black" ? allThemeColors.black.bg500 : ""}`}
            >
               <span className="text-2xl">All Chats</span>
            </div>
            <div className="chatContainer">
               {chat
                  ? chat.map((singleDataObject, key) => (
                       <Fragment key={key}>
                          <div
                             onClick={() => setSelectedChat(singleDataObject)}
                             className={`${
                                themeColor === "green"
                                   ? allThemeColors.green.bg200
                                   : ""
                             }
                     ${themeColor === "blue" ? allThemeColors.blue.bg200 : ""}
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
                        themeColor === "black" ? allThemeColors.black.bg200 : ""
                     } flex items-center ${
                                themeColor === "green" ? "border-green-300" : ""
                             }
                     ${themeColor === "blue" ? "border-blue-300" : ""}
                     ${themeColor === "purple" ? "border-purple-300" : ""}
                     ${themeColor === "orange" ? "border-orange-300" : ""}
                     ${themeColor === "black" ? "border-gray-300" : ""} p-2
                           ${
                              selectedChat === singleDataObject
                                 ? `${
                                      themeColor === "green"
                                         ? allThemeColors.green.bg400
                                         : ""
                                   }
                              ${
                                 themeColor === "blue"
                                    ? allThemeColors.blue.bg400
                                    : ""
                              }
                              ${
                                 themeColor === "purple"
                                    ? allThemeColors.purple.bg400
                                    : ""
                              }
                              ${
                                 themeColor === "orange"
                                    ? allThemeColors.orange.bg400
                                    : ""
                              }
                              ${
                                 themeColor === "black"
                                    ? allThemeColors.black.bg400
                                    : ""
                              }`
                                 : ""
                           } cursor-pointer border-b ${
                                themeColor === "green"
                                   ? "hover:bg-green-300"
                                   : ""
                             }
                           ${themeColor === "blue" ? "hover:bg-blue-300" : ""}
                           ${
                              themeColor === "purple"
                                 ? "hover:bg-purple-300"
                                 : ""
                           }
                           ${
                              themeColor === "orange"
                                 ? "hover:bg-orange-300"
                                 : ""
                           }
                           ${themeColor === "black" ? "hover:bg-gray-300" : ""}
                        `}
                          >
                             <img
                                src={getUserImage(singleDataObject, _user)}
                                alt="Communa"
                                className="rounded-full w-12"
                             />
                             <div className="content flex flex-col mx-2">
                                <span className="">
                                   {singleDataObject.isGroup
                                      ? singleDataObject.chatName
                                      : capitalize(
                                           getSenderName(
                                              _user,
                                              singleDataObject.users
                                           )
                                        )}
                                </span>
                                <span className="text-[12px]">
                                   <i>Latest Message...</i>
                                </span>
                             </div>
                          </div>
                       </Fragment>
                    ))
                  : "Nothing to show here.."}
            </div>
            <div className=" flex fixed lg:top-[37rem] lg:left-[7%] top-[89%] left-[69%]">
               <button
                  onClick={() => setIsPopupOn(true)}
                  className={`py-2 px-3 ${
                     themeColor === "blue" ? allThemeColors.blue.bg500 : ""
                  } ${
                     themeColor === "orange" ? allThemeColors.orange.bg500 : ""
                  } ${
                     themeColor === "green" ? allThemeColors.green.bg500 : ""
                  } ${
                     themeColor === "purple" ? allThemeColors.purple.bg500 : ""
                  }${
                     themeColor === "black" ? allThemeColors.black.bg500 : ""
                  } rounded-md ${
                     themeColor === "blue" ? "hover:bg-blue-400" : ""
                  } ${themeColor === "orange" ? "hover:bg-orange-400" : ""} ${
                     themeColor === "green" ? "hover:bg-green-400" : ""
                  } ${themeColor === "purple" ? "hover:bg-purple-400" : ""}${
                     themeColor === "black" ? "hover:bg-gray-400" : ""
                  }`}
               >
                  Chat
               </button>

               <button
                  onClick={() => {
                     setGroupChatPopup(true);
                  }}
                  className={`py-2 px-3 mx-2 ${
                     themeColor === "blue" ? allThemeColors.blue.bg500 : ""
                  } ${
                     themeColor === "orange" ? allThemeColors.orange.bg500 : ""
                  } ${
                     themeColor === "green" ? allThemeColors.green.bg500 : ""
                  } ${
                     themeColor === "purple" ? allThemeColors.purple.bg500 : ""
                  }${
                     themeColor === "black" ? allThemeColors.black.bg500 : ""
                  } rounded-md ${
                     themeColor === "blue" ? "hover:bg-blue-400" : ""
                  } ${themeColor === "orange" ? "hover:bg-orange-400" : ""} ${
                     themeColor === "green" ? "hover:bg-green-400" : ""
                  } ${themeColor === "purple" ? "hover:bg-purple-400" : ""}${
                     themeColor === "black" ? "hover:bg-gray-400" : ""
                  }`}
               >
                  Create Group
               </button>
            </div>
         </section>
      </Fragment>
   );
};
