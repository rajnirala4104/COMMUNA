import { ENDPOINTS } from "../constants";
import { http } from "../http";

export const loginHelp = (email, password) => {
   return http.post(
      ENDPOINTS.login,
      { email, password },
      {
         Headers: {
            "Content-type": "application/json",
         },
      }
   );
};
