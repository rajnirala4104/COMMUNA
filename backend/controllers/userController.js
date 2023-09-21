const expressAsynHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../configs/generateToken");
const expressAsyncHandler = require("express-async-handler");

const registieredUser = expressAsynHandler(async (req, res) => {
   const { name, email, password, pic } = req.body;

   if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
   }

   const userExists = await User.findOne({ email });
   if (userExists) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
   }

   const user = await User.create({
      name,
      email,
      password,
      pic,
   });
   if (user) {
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         pic: user.pic,
         token: generateToken(user._id),
      });
   } else {
      res.status(400);
      throw new Error("Oops!! User not Found");
   }
});

// ------ bug ------
const authUser = expressAsyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const userx = await User.findOne({ email });
   if (userx && (await userx.SimilarPassword(password))) {
      res.json({
         _id: userx._id,
         name: userx.name,
         email: userx.email,
         password: userx.password,
         pic: userx.pic,
         token: generateToken(userx._id),
      });
   } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
   }
});

module.exports = { registieredUser, authUser };
