const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDatabase = require("./configs/database");
const userRouters = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoute");
const { notFoundErr, erroHandler } = require("./middleware/errors");
const cors = require("cors");

connectDatabase();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouters);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFoundErr);
app.use(erroHandler);

const server = app.listen(
   PORT,
   console.log(`server has started at ${PORT}`.yellow.bold)
);

const io = require("socket.io")(server, {
   pingTimeout: 60000,
   cors: {
      origin: "http://127.0.0.1:3000",
   },
});

io.on("connection", (socket) => {
   console.log("connected to socket.io");

   socket.on("setup", (userData) => {
      socket.join(userData._id);
      console.log(userData._id);
      socket.emit("connected");
   });

   socket.on("join chat", (room) => {
      socket.join(room);
      console.log(`User joined Room ${room}`);
   });

   socket.on("typing", (room) => socket.in(room).emit("typing"));
   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

   socket.on("new message", (newMessageRecieved) => {
      const chat = newMessageRecieved.chat;

      if (!chat.users) {
         console.log("chat.users not define");
         return;
      }
      chat.users.forEach((user) => {
         if (user._id == newMessageRecieved.sender._id) {
            return;
         }
         socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
   });
});
