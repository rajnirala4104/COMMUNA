const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = expressAsyncHandler(async (req, res) => {
   const { userId } = req.body;
   if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
   }

   var isChat = await Chat.find({
      isGroupChat: false,
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
      console.log("sendind... isChat's first element");
      res.send(isChat[0]);
   } else {
      var chatData = {
         chatName: "sender",
         isGroupChat: false,
         users: [req.user._id, userId],
      };
      try {
         const createdChat = await Chat.create(chatData);
         const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users",
            "-password"
         );

         console.log(FullChat);
         res.status(200).send(FullChat);
      } catch (e) {
         res.status(400);
         throw new Error(e.message);
      }
   }
});

const fetchChat = expressAsyncHandler(async (req, res) => {
   try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).then(
         (result) => {
            console.log("result: ", result);
            res.send(result);
         }
      );
   } catch (e) {
      console.log(`Oops!! ${e}`);
   }
});
module.exports = { accessChat, fetchChat };
