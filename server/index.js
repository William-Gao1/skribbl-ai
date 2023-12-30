const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { playerMiddleware } = require('./src/middleware')

const { startLoop } = require('./src/prediction')
require('./src/python/python')
const PORT = process.env.PORT || 3001;

app.use(express.static("client/build"))

const io = new Server(server, {
  wsEngine: require("eiows").Server,
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
});

const { 
  createRoomHandler, 
  joinRoomHandler,
  leaveRoom,
  joinedRoomHandler,
  disconnectHandler
} = require("./src/handlers/roomHandler")(io)

const {
  startGameHandler,
  messageHandler,
  drawHandler,
  startStrokeHandler,
  endStrokeHandler,
  skipWordHandler,
  undoStrokeHandler,
  clearStrokesHandler
} = require("./src/handlers/gameHandler")(io)

instrument(io, {
  auth: {
    type: "basic",
    username: "admin",
    password: "$2a$10$Ht6b4gB.s4gN5ZX6Ry6jXuBkFqhIBy.brRfPCntYxqxszmJaHp6/G"
  },
  readonly: true
});

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  // remove http request to save memory since we dont need it
  socket.request = null;
  
  socket.use(playerMiddleware(socket))

  socket.on("draw", drawHandler)
  socket.on("skipWord", skipWordHandler)
  socket.on("message", messageHandler)
  socket.on("joinRoom", joinRoomHandler)
  socket.on("joinedRoom", joinedRoomHandler)
  socket.on("leaveRoom", leaveRoom)
  socket.on("createRoom", createRoomHandler)
  socket.on("startGame", startGameHandler)
  socket.on("startDrawStroke", startStrokeHandler)
  socket.on("endDrawStroke", endStrokeHandler)
  socket.on("undo", undoStrokeHandler)
  socket.on("clear", clearStrokesHandler)
  socket.on("disconnect", disconnectHandler)
});

startLoop(io)

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});