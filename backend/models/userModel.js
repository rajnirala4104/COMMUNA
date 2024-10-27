const { genSalt, hash, compare } = require("bcryptjs");
const mongoose = require("mongoose");

const UserModel = mongoose.Schema(
   {
      name: { type: String, required: true, lowercase: true },
      email: {
         type: String,
         required: [true, "Please Fill all the Fields."],
         unique: true,
      },
      password: { type: String, required: true },
      pic: {
         type: String,
         default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
   },
   { timestamps: true }
);

UserModel.pre("save", async function (next) {
  try {
     if (this.isModified("password")) { 
        const salt = await genSalt(20);
        this.password = await hash(this.password, salt);
     }
     return next();
  } catch (error) {
      next(error)
  }
});

UserModel.methods.matchPassword = async function (enteredPassword) { 
   return await compare(enteredPassword, this.password);
}
 
const User = mongoose.model("User", UserModel);
module.exports = User;
