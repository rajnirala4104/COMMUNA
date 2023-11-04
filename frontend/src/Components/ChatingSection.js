import React, { Fragment, Suspense, useContext } from "react";
import { capitalize, getSenderName } from "../Config/ChatNameLogics";
import { allImages } from "../assets/images";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext, UsersProfilePopupProvider } from "../context";

export const ChatingSection = () => {
   const { themeColor } = useContext(ThemeContext);

   const { selectedChat, _user } = ChatState();

   const { setUsersProfilePopupOn } = useContext(UsersProfilePopupProvider);
   // console.log(selectedChat);

   return (
      <Fragment>
         <Suspense fallback="loading..">
            <Fragment>
               {selectedChat ? (
                  <section className="w-full h-full border-l border-gray-500">
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
                           <div
                              onClick={() => {
                                 setUsersProfilePopupOn(true);
                              }}
                              className="chatPic cursor-pointer"
                           >
                              <img
                                 className="w-10 rounded-full"
                                 src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
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
                        </div>
                        <div
                           className={`chatingMainSection w-full h-full  ${
                              themeColor === "green"
                                 ? allThemeColors.green.bg100
                                 : ""
                           }
               ${themeColor === "blue" ? allThemeColors.blue.bg100 : ""}
               ${themeColor === "purple" ? allThemeColors.purple.bg100 : ""}
               ${themeColor === "orange" ? allThemeColors.orange.bg100 : ""}
               ${themeColor === "black" ? allThemeColors.black.bg100 : ""}`}
                        ></div>
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
                              type="text"
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
               ${themeColor === "black" ? "hover:bg-gray-400" : ""}`}
                           >
                              <i className="fa-solid fa-paper-plane"></i>
                           </button>
                        </div>
                     </div>
                  </section>
               ) : (
                  <div
                     className="w-full h-full"
                     style={{
                        background: `url(${allImages.defaultChatSectionBg})`,
                     }}
                  ></div>
               )}
            </Fragment>
         </Suspense>
      </Fragment>
   );
};
