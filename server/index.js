const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const { playerMiddleware } = require('./src/middleware')


const { startLoop } = require('./src/prediction')

const PORT = process.env.PORT || 3001;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

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
  undoStrokeHandler
} = require("./src/handlers/gameHandler")(io)

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

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
  socket.on("disconnect", disconnectHandler)
});

startLoop(io)

httpServer.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});