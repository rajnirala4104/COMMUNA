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

app.listen(PORT, console.log(`server has started at ${PORT}`.yellow.bold));
