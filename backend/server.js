const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
   res.send(
      "if you want to see something, click here :  <a href='/api/chat'> /api/chat </a>"
   );
});

app.get("/api/chat", (req, res) => {
   res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
   const singleChatData = chats.find((chat) => chat._id === req.params.id);
   res.send(singleChatData);
});

app.listen(PORT, console.log(`server has started at ${PORT}`));
