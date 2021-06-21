require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 3001;
const socket = require("socket.io");

const server = app.listen(PORT, () =>
  console.log(`app listen to port ${PORT}`)
);

io = socket(server, {
  cors: { origin: "http://localhost:3000" },
  //   path: "/re",
});

io.on("connection", (socket) => {
  //   console.log("connect");
  socket.emit("owners", "owners");

  socket.emit("renters", "renters");

  socket.on("sendToServer", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});
