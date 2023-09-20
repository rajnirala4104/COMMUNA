const mongoose = require("mongoose");

const UserModel = mongoose.Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      pic: {
         type: String,
         required: true,
         default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
   },
   { timestemps: true }
);

const User = mongoose.model("User", UserModel);
module.exports = User;
