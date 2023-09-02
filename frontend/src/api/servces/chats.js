import { ENDPOINTS } from "../constants";
import { http } from "../http";

export const getChats = () => {
   return http.get(ENDPOINTS.chats);
};

export const getSingleChatUseingID = (id) => {
   return http.get(`${ENDPOINTS.chats}/id`);
};
