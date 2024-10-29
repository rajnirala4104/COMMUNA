const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

const accessChat = expressAsyncHandler(async (req, res) => {
   const { userId } = req.body;

   // Step-1 Check if the user id is provided
   if (!userId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "User Id not provided");
   }

   // Step-2 Check if a chat exists between the current user and the specified user
   const isChat = await Chat.findOne({
      isGroup: false, // Ensure it is not a group chat
      users: {
         $all: [req.user._id, userId],
      },
   });

   // Step-3 Check if the chat exists
   if (isChat) {
      // Step-4 Populate the chat with user details excluding passwords
      const FullChat = await Chat.populate(isChat, {
         path: "users",
         select: "-password",
      });

      // Step-5 Populate the chat with the latest message details
      const latestMessage = await Chat.populate(FullChat, {
         path: "latestMessage",
         select: "-chat",
      });

      // Step-6 Populate the latest message with user details excluding passwords
      const finalChat = await User.populate(latestMessage, {
         path: "latestMessage.sender",
         select: "name pic email",
      });

      return res.status(StatusCodes.OK).json(
         new ApiResponse(
            StatusCodes.OK,
            "Chat Already Exists",
            finalChat
         )
      );
   } else {
      // Step-4 Create a new chat
      let chatData = {
         chatName: "sender",
         isGroup: false,
         users: [req.user._id, userId],
      };

      // Step-5 Create a new chat
      try {
         const createdChat = await Chat.create(chatData);
         const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
         );

         return res.status(StatusCodes.OK).json(
            new ApiResponse(
               StatusCodes.OK,
               "Chat Created Successfully",
               FullChat
            )
         );

      } catch (e) {
         res.status(400);
         throw new ApiError(StatusCodes.BAD_REQUEST, e.message);
      }
   }
});

const fetchChat = expressAsyncHandler(async (req, res) => {
   try {
      // Find all chats where the current user is a participant
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
         // Populate the chat with user details excluding passwords
         .populate("users", "-password")
         // Populate the chat with group admin details excluding passwords
         .populate("groupAdmin", "-password")
         // Populate the chat with the latest message details
         .populate("latestMessage")
         // Sort chats by the latest update timestamp in descending order
         .sort({ updatedAt: -1 })
         // Once the chats are fetched
         .then(async (results) => {
            // Populate the sender details of the latest message with name, pic, and email
            const populatedResults = await User.populate(results, {
               path: "latestMessage.sender",
               select: "name pic email",
            });
            // Send the populated chat data with a successful response
            res.status(200).send(populatedResults);
         });
   } catch (e) {
      // If any error occurs, throw an error with its message
      throw new ApiError(StatusCodes.BAD_REQUEST, e.message);
   }
});

const createGroupChat = expressAsyncHandler(async (req, res) => {
   if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "please fill all the feilds" });
   }

   let users = JSON.parse(req.body.users);
   if (users.length < 2) {
      return res
         .status(400)
         .send("more than 2 users are required to create a group chat");
   }
   users.push(req.user);

   try {
      const groupChat = await Chat.create({
         chatName: req.body.name,
         users: users,
         isGroup: true,
         groupAdmin: req.user,
      });

      const fullGroupChat = await Chat.findOne({
         _id: groupChat._id,
      })
         .populate("users", "-password")
         .populate("groupAdmin", "-password");

      res.status(200).send(fullGroupChat);
   } catch (e) {
      res.status(400);
      throw new Error(e.message);
   }
});

const renameGroup = expressAsyncHandler(async (req, res) => {
   const { chatId, chatName } = req.body;
   const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
   )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

   if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
   } else {
      res.json(updatedChat);
   }
});

const addToGroup = expressAsyncHandler(async (req, res) => {
   const { chatId, userId } = req.body;
   const added = await Chat.findByIdAndUpdate(
      chatId,
      {
         $push: { users: userId },
      },
      { new: true }
   )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

   if (!added) {
      res.status(404);
      throw new Error("Chat Not Found");
   } else {
      res.json(added);
   }
});

const removeFromGroup = expressAsyncHandler(async (req, res) => {
   const { chatId, userId } = req.body;
   const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
         $pull: { users: userId },
      },
      { new: true }
   )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

   if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
   } else {
      res.json(removed);
   }
});

module.exports = {
   accessChat,
   fetchChat,
   createGroupChat,
   renameGroup,
   addToGroup,
   removeFromGroup,
};
