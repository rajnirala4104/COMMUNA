import { ENDPOINTS } from "../constants";
import { http } from "../http";

export const searchU = (userToken, query) => {
   const config = {
      headers: {
         Authorization: `Bearer ${userToken}`,
      },
   };

   return http.get(`${ENDPOINTS.searchUser}=${query}`, config);
};
