import { ENDPOINTS } from "../constants";
import { http } from "../http";

export const getChats = () => {
   return http.get(ENDPOINTS.chats);
};
