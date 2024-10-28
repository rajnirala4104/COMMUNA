const User = require("../models/userModel");
const generateToken = require("../configs/generateToken");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");

const registieredUser = asyncHandler(async (req, res) => {
   // 1. Get the data from req.body
   const { name, email, password, pic } = req.body;

   // 2. check if all the fields are mandatory
   if (!name || !email || !password) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "All fields are mandatory");
   }

   // 3. check if the user already exists
   const userExists = await User.findOne({ email });

   if (userExists) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "User Already Exists");
   }

   // 4. create a new user
   const user = await User.create({ name, email, password, pic });

   // 5. check if the user is created successfully
   if (!user) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Registration Failed");
   }

   // 6. return the response with the user data
   return res.status(StatusCodes.CREATED).json(
      new ApiResponse(
         StatusCodes.CREATED,
         "Registration Successful",
         {
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
            token: generateToken(user._id),
         }
      )
   );
});

const authUser = asyncHandler(async (req, res) => {
   // Step 1: get the email and password from the req.body
   const { email, password } = req.body;

   // Step 2: fetch the user from the database based on email
   const user = await User.findOne({ email });

   // Step 3: check if the user exists
   if (!user) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Email");
   }

   // Step 4: check if the password is valid
   const isPasswordTrue = await user.matchPassword(password); // this will return Boolean

   if (!isPasswordTrue) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Password");
   }

   // Step 5: return the response with the user data
   return res.status(StatusCodes.OK).json(
      new ApiResponse(
         StatusCodes.OK,
         "Login Successful",
         {
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            pic: user.pic,
            token: generateToken(user._id),
         }
      )
   );
});

const searchUserController = asyncHandler(async (req, res) => {
   // Step 1: prepare the keyword obj
   const keyword = req.query.search
      ? {
           $or: [
              { name: { $regex: req.query.search, $options: "i" } },
              { email: { $regex: req.query.search, $options: "i" } },
           ],
        }
      : {};

   // Step 2: exclude the current user
   const users = await User.find({ ...keyword, _id: { $ne: req.user._id } })
      .select("-password");

   // Step 3: return the response with the user data
   res.send(users);
});

module.exports = { registieredUser, authUser, searchUserController };
