import axios from "axios";
import React, { Fragment, Suspense, useContext, useState } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, ThemeContext, UsersProfilePopupProvider } from "../context";
import { GroupSelectedUserBox } from "./GroupSelectedUserBox";
import { SearchUserBox } from "./SearchUserBox";

export const GroupProfile = () => {
   const {
      _user,
      chat,
      setChat,
      selectedChat,
      setSelectedChat,
      fetchAgain,
      setFetchAgain,
   } = ChatState();
   const [newName, setNewName] = useState();
   const [selectedUsers, setSelectedUsers] = useState([]);
   const { themeColor } = useContext(ThemeContext);
   const { setUsersProfilePopupOn } = useContext(UsersProfilePopupProvider);

   const [searchResults, setSearchResults] = useState([]);
   const [searchText, setSearchText] = useState("");
   const [loading, setLoading] = useState(false);

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
         setFetchAgain(!fetchAgain);
         setSelectedChat(data);
         setUsersProfilePopupOn(false);
      } catch (e) {
         console.log(
            "something went worng in uopdateGroupNameHandler function"
         );
      }
   };

   const removeFromGroup = async (UserId, userObj) => {
      let wantDelete;
      if (userObj._id === _user._id) {
         wantDelete = window.confirm("Do you want to Leave this Group");
      } else {
         wantDelete = window.confirm(`do you want to remove ${userObj.name} `);
      }
      if (wantDelete) {
         try {
            const config = {
               headers: {
                  Authorization: `Bearer ${_user.token}`,
               },
            };
            const { data } = axios.put(
               `/api/chat/groupremove`,
               { chatId: selectedChat._id, userId: UserId },
               config
            );

            userObj._id === _user._id
               ? setSelectedChat()
               : setSelectedChat(data);

            setUsersProfilePopupOn(false);
            setFetchAgain(!fetchAgain);
         } catch (e) {
            console.log("something went worng in removFromGroup function");
         }
      }
   };

   const handleSearch = async (query) => {
      setSearchText(query);
      if (!query) {
         return;
      }
      try {
         setLoading(true);
         const config = {
            headers: {
               Authorization: `Bearer ${_user.token}`,
            },
         };

         const { data } = await axios.get(
            `/api/user?search=${searchText}`,
            config
         );
         setSearchResults(data);
         setLoading(false);
      } catch (error) {
         console.log("error : ", error);
      }
   };

   const addToGroup = async (userObj) => {
      if (selectedChat.users.find((u) => u._id === userObj._id)) {
         alert("user is alredy in group");
         return;
      }

      try {
         setLoading(true);
         const config = {
            headers: {
               Authorization: `Bearer ${_user.token}`,
            },
         };

         const { data } = await axios.put(
            "/api/chat/groupadd",
            {
               chatId: selectedChat._id,
               userId: userObj._id,
            },
            config
         );

         setSelectedChat(data);
         setFetchAgain(!fetchAgain);
         setLoading(false);
      } catch (e) {
         alert("something went wrong in add to group function");
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
               <div className="groupTitle my-3 mb-5">
                  <h1
                     className={`text-4xl  ${
                        themeColor === "blue" ? "text-blue-900" : ""
                     }
                  ${themeColor === "purple" ? "text-purple-800" : ""}
                  ${themeColor === "orange" ? "text-orange-800" : ""}
                  ${themeColor === "black" ? "text-gray-800" : ""}
                  ${themeColor === "green" ? "text-green-800" : ""}`}
                  >
                     {selectedChat.chatName}
                  </h1>
               </div>

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
                     ? selectedChat.users.map((userObj, i) => (
                          <Fragment key={i}>
                             <GroupSelectedUserBox
                                userObject={userObj}
                                closeHandlerFucntion={() =>
                                   removeFromGroup(userObj._id, userObj)
                                }
                             />
                          </Fragment>
                       ))
                     : selectedChat.users.map((userObj, i) => (
                          <Fragment key={i}>
                             <GroupSelectedUserBox
                                userObject={userObj}
                                closeHandlerFucntion={() =>
                                   userObj.email === _user.email
                                      ? removeFromGroup(userObj._id, userObj)
                                      : alert(
                                           "You can't remove this user because you are not admin"
                                        )
                                }
                             />
                          </Fragment>
                       ))}
               </div>
               <div className="search">
                  {selectedChat.groupAdmin._id === _user._id ? (
                     <Fragment>
                        <div className="flex justify-center items-center my-3 relative">
                           <input
                              onChange={(e) => handleSearch(e.target.value)}
                              className={`outline-none mx-1 py-2  ${
                                 themeColor === "green"
                                    ? allThemeColors.green.bg200
                                    : ""
                              }
                  ${themeColor === "blue" ? allThemeColors.blue.bg200 : ""}
                  ${themeColor === "purple" ? allThemeColors.purple.bg200 : ""}
                  ${themeColor === "orange" ? allThemeColors.orange.bg200 : ""}
                  ${
                     themeColor === "black" ? allThemeColors.black.bg200 : ""
                  } placeholder-gray-600 text-slate-800 shadow-md px-3 py-1 rounded-md w-[55vh]`}
                              type="text"
                              placeholder="Add Members"
                           />
                        </div>

                        <div className="searchResults flex flex-col">
                           {loading ? (
                              <span className="mx-auto my-3">Loading..</span>
                           ) : (
                              searchResults
                                 ?.slice(0, 4)
                                 .map((singleUserObject, key) => (
                                    <Fragment key={key}>
                                       <SearchUserBox
                                          {...singleUserObject}
                                          handleChat={() =>
                                             addToGroup(singleUserObject)
                                          }
                                       />
                                    </Fragment>
                                 ))
                           )}
                        </div>
                     </Fragment>
                  ) : (
                     <div className="my-5">
                        <span
                           onClick={() => removeFromGroup(_user._id, _user)}
                           className={`py-2 middle none center rounded-lg cursor-pointer  ${
                              themeColor === "blue"
                                 ? allThemeColors.blue.bg500
                                 : ""
                           } ${
                              themeColor === "orange"
                                 ? allThemeColors.orange.bg500
                                 : ""
                           } ${
                              themeColor === "green"
                                 ? allThemeColors.green.bg500
                                 : ""
                           } ${
                              themeColor === "purple"
                                 ? allThemeColors.purple.bg500
                                 : ""
                           }${
                              themeColor === "black"
                                 ? allThemeColors.black.bg500
                                 : ""
                           }
             py-2 px-6 mx-2 font-sans text-xs font-bold 
             uppercase text-white transition-all hover:shadow-lg   ${
                themeColor === "blue" ? "hover:shadow-blue-500/40" : ""
             } ${themeColor === "green" ? "hover:shadow-green-500/40" : ""} ${
                              themeColor === "orange"
                                 ? "hover:shadow-orange-500/40"
                                 : ""
                           } ${
                              themeColor === "purple"
                                 ? "hover:shadow-purple-500/40"
                                 : ""
                           }${
                              themeColor === "black"
                                 ? "hover:shadow-gray-500/40"
                                 : ""
                           }
                           focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                           data-ripple-light="true"
                        >
                           Leave Group
                        </span>
                     </div>
                  )}
               </div>
            </div>
         </Suspense>
      </Fragment>
   );
};
