import { ENDPOINTS } from "../constants";
import { http } from "../http";

export const getChats = () => {
   return http.get(ENDPOINTS.chats);
};

export const accessChatApiCall = (userToken, userId) => {
   const config = {
      "Content-type": "application/json",
      headers: {
         Authorization: `Bearer ${userToken}`,
      },
   };

   return http.post(ENDPOINTS.chats, userId, config);
};
