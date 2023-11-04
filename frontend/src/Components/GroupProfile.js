import axios from "axios";
import React, { Fragment, Suspense, useContext, useState } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext, UsersProfilePopupProvider } from "../context";
import { GroupSelectedUserBox } from "./GroupSelectedUserBox";

export const GroupProfile = () => {
   const { _user, chat, setChat, selectedChat } = ChatState();
   const [newName, setNewName] = useState();
   const { themeColor } = useContext(ThemeContext);
   const { setUsersProfilePopupOn } = useContext(UsersProfilePopupProvider);

   console.log(selectedChat);

   const updateGroupNameHandler = async () => {
      if (!newName) {
         alert("You've to Write something..");
      }
      try {
         const config = {
            headers: {
               Authorization: `Bearer ${_user.token}`,
            },
         };
         const { data } = axios.put(
            `/api/chat/rename/`,
            { chatId: selectedChat._id, chatName: newName },
            config
         );
         setUsersProfilePopupOn(false);
      } catch (e) {
         console.log(
            "something went worng in uopdateGroupNameHandler function"
         );
      }
   };
   return (
      <Fragment>
         <Suspense fallback={"loading.."}>
            <div
               className={`w-[50%] rounded-md flex justify-center items-center flex-col bg p-4 relative
               
               ${themeColor === "blue" ? allThemeColors.blue.bg100 : ""}
                  ${themeColor === "purple" ? allThemeColors.purple.bg100 : ""}
                  ${themeColor === "orange" ? allThemeColors.orange.bg100 : ""}
                  ${themeColor === "black" ? allThemeColors.black.bg100 : ""}
                  ${themeColor === "green" ? allThemeColors.green.bg100 : ""}
               `}
            >
               <div className="px-2">
                  <span
                     onClick={() => {
                        setUsersProfilePopupOn(false);
                     }}
                     className="absolute cursor-pointer my-auto left-[95%] top-2"
                  >
                     <i className="fa-solid fa-x text-gray-800 text-[12px] -mx-2"></i>
                  </span>
               </div>
               <div className="my-3">
                  <input
                     onChange={(e) => setNewName(e.target.value)}
                     className="px-2 py-1 rounded-md focus:outline-none"
                     type="text"
                     placeholder="Change - Group Name"
                     defaultValue={selectedChat.chatName}
                  />
                  <span
                     onClick={() => updateGroupNameHandler()}
                     className={`middle none center rounded-lg cursor-pointer  ${
                        themeColor === "blue" ? allThemeColors.blue.bg500 : ""
                     } ${
                        themeColor === "orange"
                           ? allThemeColors.orange.bg500
                           : ""
                     } ${
                        themeColor === "green" ? allThemeColors.green.bg500 : ""
                     } ${
                        themeColor === "purple"
                           ? allThemeColors.purple.bg500
                           : ""
                     }${
                        themeColor === "black" ? allThemeColors.black.bg500 : ""
                     }
                      py-2 px-6 mx-2 font-sans text-xs font-bold uppercase text-white transition-all hover:shadow-lg   ${
                         themeColor === "blue" ? "hover:shadow-blue-500/40" : ""
                      } ${
                        themeColor === "green"
                           ? "hover:shadow-green-500/40"
                           : ""
                     } ${
                        themeColor === "orange"
                           ? "hover:shadow-orange-500/40"
                           : ""
                     } ${
                        themeColor === "purple"
                           ? "hover:shadow-purple-500/40"
                           : ""
                     }${
                        themeColor === "black" ? "hover:shadow-gray-500/40" : ""
                     }
                      focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                     data-ripple-light="true"
                  >
                     Update Name
                  </span>
               </div>
               <div className="flex ">
                  {_user.email === selectedChat.groupAdmin.email
                     ? selectedChat.users.map((userObj) => (
                          <Fragment key={userObj._id}>
                             <GroupSelectedUserBox
                                userObject={userObj}
                                closeHandlerFucntion={() =>
                                   console.log("remove this user: ", {
                                      userObj,
                                   })
                                }
                             />
                          </Fragment>
                       ))
                     : selectedChat.users.map((userObj) => (
                          <Fragment key={userObj._id}>
                             <GroupSelectedUserBox
                                userObject={userObj}
                                closeHandlerFucntion={() =>
                                   console.log(
                                      "You can't remove this user because you are not admin"
                                   )
                                }
                             />
                          </Fragment>
                       ))}
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};
