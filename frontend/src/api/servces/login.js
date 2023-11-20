import { ENDPOINTS } from "../constants";
import { http } from "../http";

export const loginHelp = (email, password) => {
   // console.log(email, password);
   return http.post(
      ENDPOINTS.login,
      { email, password },
      {
         Headers: {
            "Content-Type": "application/json",
         },
      }
   );
};
