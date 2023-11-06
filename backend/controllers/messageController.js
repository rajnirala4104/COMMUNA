const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Message = require("../models/messagesModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
   const { content, chatId } = req.body;
   if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.status(StatusCodes.BAD_REQUEST);
   }

   let newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
   };

   try {
      let message = await Message.create(newMessage);

      message = await message.populate("sender", "name pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
         path: "chat.users",
         select: "name pic email",
      });
      await Chat.findByIdAndUpdate(req.body.chatId, {
         latestMessage: message,
      });

      res.json(message);
   } catch (error) {
      res.status(StatusCodes.BAD_REQUEST);
      throw new Error(error.message);
   }
});

const allMessages = asyncHandler(async (req, res) => {
   try {
      const message = await Message.find({ chat: req.params.chatId })
         .populate("sender", "name pic email")
         .populate("chat");
      res.json(message);
   } catch (error) {
      res.status(StatusCodes.BAD_GATEWAY);
      throw new Error(error.message);
   }
});

module.exports = { sendMessage, allMessages };
