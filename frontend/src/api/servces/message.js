const { ENDPOINTS } = require("../constants");
const { http } = require("../http");

export const fetchMessagesApiCall = (loggerUserToken, selectedChatId) => {
   const config = {
      headers: {
         Authorization: `Bearer ${loggerUserToken}`,
      },
   };

   return http.get(`/api/message/${selectedChatId}`, config);
};

export const sendMessageApiCall = (loggerUserToken, postData) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${loggerUserToken}`,
      },
   };

   return http.post(ENDPOINTS.sendMessageRoute, postData, config);
};
