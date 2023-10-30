export const getSenderName = (loggedUser, userArr) => {
   return userArr[0]._id === loggedUser._id ? userArr[1].name : userArr[0].name;
};
