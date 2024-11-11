import { ENDPOINTS } from "../constants";
import { http } from "../http";

export const createGroup = async (userToken, info) => {
   const config = {
      "Content-type": "application/json",
      headers: {
         Authorization: `Bearer ${userToken}`,
      },
   };

   return http.post(ENDPOINTS.createGroup, info, config);
};
