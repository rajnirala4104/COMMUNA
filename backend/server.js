const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDatabase = require("./configs/database");

dotenv.config();
connectDatabase();

const app = express();
const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
   next();
});

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

app.listen(PORT, console.log(`server has started at ${PORT}`.yellow.bold));
