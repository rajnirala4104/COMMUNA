const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const UserModel = mongoose.Schema(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      pic: {
         type: String,
         default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
   },
   { timestamps: true }
);

UserModel.methods.SimilarPassword = async (enteredPassword) => {
   return await bcrypt.compare(enteredPassword, this.password);
};

UserModel.pre("save", async (next) => {
   if (!this.isModified) {
      next();
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserModel);
module.exports = User;
