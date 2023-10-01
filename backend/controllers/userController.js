const User = require("../models/userModel");
const generateToken = require("../configs/generateToken");
const asyncHandler = require("express-async-handler");

const registieredUser = asyncHandler(async (req, res) => {
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

const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });

   // ------ bug ------
   // ---- && (await user.SimilarPassword(password)) ------
   if (user) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         password: user.password,
         pic: user.pic,
         token: generateToken(user._id),
      });
   } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
   }
});

// ------- /api/user?search=pulkit
const allUsers = asyncHandler(async (req, res) => {
   const keyword = req.query.search
      ? {
           $or: [
              { name: { $regex: req.query.search, $options: "i" } },
              { email: { $regex: req.query.search, $options: "i" } },
           ],
        }
      : {};

   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
   res.send(users);
});

module.exports = { registieredUser, authUser, allUsers };
