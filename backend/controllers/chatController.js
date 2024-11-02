const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");

// This function checks if a chat exists between the current user and the specified user, and creates a new chat if it does not exist.
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
         res.status(StatusCodes.BAD_REQUEST);
         throw new ApiError(StatusCodes.BAD_REQUEST, e.message);
      }
   }
});

// This function fetches all the chats of the current user
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
            res.status(StatusCodes.OK).send(populatedResults);
         });
   } catch (e) {
      // If any error occurs, throw an error with its message
      throw new ApiError(StatusCodes.BAD_REQUEST, e.message);
   }
});

// This function creates a new group chat
const createGroupChat = expressAsyncHandler(async (req, res) => {

   // Step-1: get the data from req.body
   const { users, name } = req.body;

   // Step-2: check if all the fields are mandatory
   if (!users || !name) {
      return res.status(StatusCodes.BAD_REQUEST).send({
         message: "please fill all the feilds"
      });
   }

   // Step-3: parse the users object
   let Users = JSON.parse(users);

   // Step-4: check if the number of users is less than 2
   if (Users.length < 2) {
      return res.status(StatusCodes.BAD_REQUEST).send({
         message: "More than 2 users are required to form a group chat"
      });
   }

   // Step-5: add the current user to the group chat
   Users.push(req.user);

   // Step-6: create the group chat
   try {
      const groupChat = await Chat.create({
         chatName: name,
         users: Users,
         isGroup: true,
         groupAdmin: req.user,
      });

      // Step-7: populate the group chat with users and group admin
      const fullGroupChat = await Chat.findOne({
         _id: groupChat._id,
      })
         .populate("users", "-password")
         .populate("groupAdmin", "-password");

      // Step-8: return the response with the group chat data
      res.status(StatusCodes.OK).send(fullGroupChat);
   } catch (e) {
      // Step-9: handle the error
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error(e.message);
   }

});

// This function renames a group chat
const renameGroup = expressAsyncHandler(async (req, res) => {
   // Step-1: get the chatId and chatName from the req.body
   const { chatId, chatName } = req.body;

   // Step-2: check if the chatId and chatName are provided
   if (!chatId || !chatName) {
      return res.status(StatusCodes.BAD_REQUEST).send({
         message: "Please provide the chatId and chatName"
      });
   }

   // Step-3: update the chat name
   try {
      const updatedChat = await Chat.findByIdAndUpdate(
         chatId,
         { chatName },
         { new: true }
      );

      // Step-4: check if the chat is found
      if (!updatedChat) {
         return res.status(StatusCodes.NOT_FOUND).send({
            message: "Chat not found"
         });
      }

      // Step-5: populate the chat with users and group admin
      const fullUpdatedChat = await Chat.findOne({
         _id: updatedChat._id,
      })
         .populate("users", "-password")
         .populate("groupAdmin", "-password");

      // Step-6: return the response with the updated chat
      res.json(fullUpdatedChat);
   } catch (e) {
      // Step-7: handle the error
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error(e.message);
   }
});

// This function adds a user to a group
const addToGroup = expressAsyncHandler(async (req, res) => {
   // Extract chatId and userId from the request body
   const { chatId, userId } = req.body;

   // Step-1: Add the user to the group chat
   const added = await Chat.findByIdAndUpdate(
      chatId,
      {
         // Add userId to the users array
         $push: { users: userId },
      },
      { new: true } // Return the updated document
   )
      // Step-2: Populate users and group admin fields excluding passwords
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

   // Step-3: Check if the chat is found
   if (!added) {
      // If not found, send a 404 response
      res.status(StatusCodes.NOT_FOUND);
      throw new Error("Chat Not Found");
   } else {
      // If found, return the updated chat
      res.json(added);
   }
});

// This function removes a user from a group
const removeFromGroup = expressAsyncHandler(async (req, res) => {
   // Extract chatId and userId from the request body
   const { chatId, userId } = req.body;
   
   // Remove the user from the group chat
   const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
         // Pull userId from the users array
         $pull: { users: userId },
      },
      { new: true } // Return the updated document
   )
      // Populate users and group admin fields excluding passwords
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

   // Check if the chat is found
   if (!removed) {
      // If not found, send a 404 response
      res.status(StatusCodes.NOT_FOUND);
      throw new Error("Chat Not Found");
   } else {
      // If found, return the updated chat
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
