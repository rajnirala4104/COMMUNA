const { Server } = require("socket.io");
const IO = Server(8080);

IO.on("connection", (socket) => {
   console.log("socket is connected", socket.id);
});
