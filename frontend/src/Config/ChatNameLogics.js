export const getSenderName = (loggedUser, userArr) => {
   return userArr[0]._id === loggedUser._id ? userArr[1].name : userArr[0].name;
};

export const getUserWholeObject = (loggedUser, userArr) => {
   return userArr[0]._id === loggedUser._id ? userArr[1] : userArr[0];
};

export const getUserImage = (singleUserObject, loaggedUser) => {
   const usersArray = singleUserObject.isGroup
      ? [
           "",
           {
              pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
           },
        ]
      : singleUserObject.users;
   const singleUser = usersArray.map((user) =>
      user._id === loaggedUser._id ? "" : user.pic
   );
   return singleUser[1];
};

export const capitalize = (str, lower = false) =>
   (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
   );

export const removeAnObjectFromAnArray = (arr, ObjectId) => {
   const finalData = arr.filter((obj) => obj._id === ObjectId);
   finalData.splice(0, 1);
};
