const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./configs/database");
const userRouters = require("./Routes/userRoutes");
const { notFoundErr, erroHandler } = require("./middleware/errors");

dotenv.config();
connectDatabase();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
   next();
});

app.use("/api/user", userRouters);
app.use(notFoundErr);
app.use(erroHandler);

app.listen(PORT, console.log(`server has started at ${PORT}`.yellow.bold));
