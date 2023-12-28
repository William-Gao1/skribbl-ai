const {
  getRoomByRoomCode,
  startGame,
  goToNextRound,
  draw,
  startStroke,
  endStroke,
  undoStroke
} = require('../state')


module.exports = (io) => {
  const startGameHandler = function (callback) {
    const socket = this
    const { playerId, inRoom, roomCode } = socket.player

    if (!inRoom) {
      callback({success: false, message: "Player not in room"})
      return
    }

    const room = getRoomByRoomCode(roomCode)
    if (room.owner.id !== playerId) {
      callback({success: false, message: "Player is not owner of room"})
      return
    }

    if (room.members.length < 3) {
      callback({success: false, message: "Need at least 2 players to start"})
      return
    }

    startGame(roomCode)
    callback({success: true, message: "Game started"})
    socket.to(roomCode).emit("gameStarted")

    goToNextRound(roomCode, io, false)
  }

  const messageHandler = function (message, callback) {
    const socket = this
    const { inRoom, roomCode, playerDisplayName, playerId } = socket.player

    if (!inRoom) {
      callback({success: false, message: "Player not in room"})
      return
    }

    const room = getRoomByRoomCode(roomCode)

    if (!room.started) {
      socket.to(roomCode).emit("newMessage", message, playerDisplayName)
      callback({success: true, message: "Sent"})
      return
    }

    if (playerId === room.members[room.drawingMemberIndex].id) {
      callback({success: false, message: "You cannot send messages when you are drawing"})
      return
    }

    if (message.toLowerCase().replace("the ").replace("-", "").replace(" ", "") === room.currentWord.toLowerCase().replace("the ").replace("-", "").replace(" ", "")) {
      socket.to(roomCode).emit("newMessage", message, playerDisplayName)
      callback({success: true, message: "Correct guess"})
      io.in(roomCode).emit("newMessage", `Humans win! The correct word was ${room.currentWord}`, null)
      goToNextRound(roomCode, io)

      return
    }

    socket.to(roomCode).emit("newMessage", message, playerDisplayName)
    callback({success: true, message: "Sent"})
  }

  const drawHandler = function (line) {
    const socket = this
    const { inRoom, roomCode, isDrawing } = socket.player

    if (!inRoom || !isDrawing) {
      return
    }

    draw(roomCode, line)
    socket.to(roomCode).emit("newDraw", line)
  }

  const startStrokeHandler = function (startCoord)  {
    const socket = this
    const { inRoom, roomCode, isDrawing } = socket.player

    if (!inRoom || !isDrawing) {
      return
    }

    startStroke(roomCode, startCoord)
  }

  const endStrokeHandler = function ()  {
    const socket = this
    const { inRoom, roomCode, isDrawing } = socket.player

    if (!inRoom || !isDrawing) {
      return
    }

    endStroke(roomCode)
  }

  const skipWordHandler = function () {
    const socket = this
    const { inRoom, roomCode, isDrawing } = socket.player

    if (!inRoom || !isDrawing) {
      return
    }

    io.in(roomCode).emit("newMessage", "Skipping word...", null)
    goToNextRound(roomCode, io, false)
  }

  const undoStrokeHandler = function () {
    const socket = this
    const { inRoom, roomCode, isDrawing} = socket.player

    if (!inRoom || !isDrawing) {
      return
    }

    const newStrokes = undoStroke(roomCode)

    io.in(roomCode).emit("redraw", newStrokes)
  }

  return {
    startGameHandler,
    messageHandler,
    drawHandler,
    startStrokeHandler,
    endStrokeHandler,
    skipWordHandler,
    undoStrokeHandler
  }
}