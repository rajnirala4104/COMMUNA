import { ENDPOINTS } from "../constants";
import { http } from "../http";

export const addeTheData = (name, email, password) => {
   return http.post(
      ENDPOINTS.user,
      { name, email, password },
      {
         Headers: {
            "Content-type": "application/json",
         },
      }
   );
};
