const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = expressAsyncHandler(async (req, res) => {
   const { userId } = req.body;
   if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
   }

   let isChat = await Chat.find({
      isGroup: false,
      $and: [
         { users: { $elemMatch: { $eq: req.user._id } } },
         { users: { $elemMatch: { $eq: userId } } },
      ],
   })
      .populate("users", "-password")
      .populate("latestMessage");

   isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
   });

   if (isChat.length > 0) {
      console.log("THIS CHAT IS ALREADY EXIST IN OUR DATABASE", isChat);
      // res.send(isChat[0]);
   } else {
      let chatData = {
         chatName: "sender",
         isGroup: false,
         users: [req.user._id, userId],
      };
      try {
         const createdChat = await Chat.create(chatData);
         const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
         );

         // console.log(FullChat);
         res.status(200).send(FullChat);
      } catch (e) {
         res.status(400);
         throw new Error(e.message);
      }
   }
});

const fetchChat = expressAsyncHandler(async (req, res) => {
   try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
         .populate("users", "-password")
         .populate("groupAdmin", "-password")
         .populate("latestMessage")
         .sort({ updatedAt: -1 })
         .then(async (results) => {
            res.status(200).send(
               await User.populate(results, {
                  path: "latestMessage.sender",
                  select: "name pic email",
               })
            );
         });
   } catch (e) {
      console.log(`Oops!! ${e}`);
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
