import axios from "axios";
import React, { Fragment, Suspense, useContext, useState } from "react";
import { allThemeColors } from "../constants/ThemeColorsConstants";
import { ChatState, GroupChatPopup, ThemeContext } from "../context";
import { GroupSelectedUserBox } from "./GroupSelectedUserBox";
import { SearchUserBox } from "./SearchUserBox";

export const CreateGroupPopup = () => {
   // All Context
   const { themeColor } = useContext(ThemeContext);
   const { groupChatPopup, setGroupChatPopup } = useContext(GroupChatPopup);

   // All States
   const { _user, chat, setChat } = ChatState();
   const [groupChatName, setGroupChatName] = useState();
   const [selectedUsers, setSelectedUsers] = useState([]);
   const [searchResults, setSearchResults] = useState([]);
   const [searchText, setSearchText] = useState("");
   const [loading, setLoading] = useState(false);

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

   // console.log(selectedUsers);

   const handlerSubmit = () => {};
   return (
      <Fragment>
         <Suspense fallback="loading..">
            <section
               onKeyDown={(e) => (e.key === "Enter" ? "wow" : "")}
               className="z-20 w-full h-full bg-[rgba(128,126,126,0.3)] backdrop-blur-md absolute top-0 flex justify-center items-center"
            >
               <div
                  className={`w-[50%] rounded-md flex flex-col bg p-4 
               
               ${themeColor === "blue" ? allThemeColors.blue.bg100 : ""}
                  ${themeColor === "purple" ? allThemeColors.purple.bg100 : ""}
                  ${themeColor === "orange" ? allThemeColors.orange.bg100 : ""}
                  ${themeColor === "black" ? allThemeColors.black.bg100 : ""}
                  ${themeColor === "green" ? allThemeColors.green.bg100 : ""}
               `}
               >
                  <div className="flex justify-center items-center my-3 relative">
                     <span
                        onClick={() => {
                           setGroupChatPopup(false);
                        }}
                        className="absolute -top-7 left-[98%] my-3 cursor-pointer"
                     >
                        <i className="fa-solid fa-x text-gray-600 text-[15px]"></i>
                     </span>
                     <input
                        onChange={(e) => {
                           setGroupChatName(e.target.value);
                        }}
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
                        placeholder="Group Name"
                     />
                  </div>

                  <div className="SelectedMembersContainer mx-auto my-3 flex justify-evenly">
                     {selectedUsers.map((userObject) => (
                        <Fragment key={userObject._id}>
                           <GroupSelectedUserBox
                              userObject={userObject}
                              userId={userObject._id}
                              closeHandlerFucntion={() =>
                                 console.log("close ho jayega don't warry")
                              }
                           />
                        </Fragment>
                     ))}
                  </div>

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
                                       selectedUsers.includes(singleUserObject)
                                          ? console.log(
                                               "user already added in group"
                                            )
                                          : setSelectedUsers([
                                               ...selectedUsers,
                                               singleUserObject,
                                            ])
                                    }
                                 />
                              </Fragment>
                           ))
                     )}
                  </div>

                  <div className="mx-auto my-2">
                     <span
                        onClick={() => handlerSubmit()}
                        className={`middle none center rounded-lg cursor-pointer  ${
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
                      py-3 px-6 font-sans text-xs font-bold uppercase text-white transition-all hover:shadow-lg   ${
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
                           themeColor === "black"
                              ? "hover:shadow-gray-500/40"
                              : ""
                        }
                      focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                        data-ripple-light="true"
                     >
                        Create Group
                     </span>
                  </div>
               </div>
            </section>
         </Suspense>
      </Fragment>
   );
};
