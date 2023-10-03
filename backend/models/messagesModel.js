const mongoose = require("mongoose");

const MessageModel = mongoose.Schema(
   {
      sender: { type: mongoose.Schema.ObjectId, ref: "User" },
      content: { type: String, trim: true },
      chat: { type: mongoose.Schema.ObjectId, ref: "Chat" },
   },
   {
      timestamps: true,
   }
);

const Message = mongoose.Model("Message", MessageModel);
module.exports = Message;
