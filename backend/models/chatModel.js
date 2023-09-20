const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
   {
      chatName: { type: String, trim: true },
      isGroup: { type: Boolean, default: false },
      users: [{ type: mongoose.Schema.Types.ObjectsId, ref: "user" }],
      latestMessage: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Message",
      },
      gorupAdmin: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   },
   {
      timestamps: true,
   }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;
