const { 
  AI_DISPLAY_NAME, 
  createRoom, 
  getRoomDataForClient, 
  getRoomByRoomCode, 
  addPlayerToRoom,
  removePlayerFromRoom,
  getPlayer
} = require('../state')

module.exports = (io) => {
  const createRoomHandler = function (displayName, callback) {
    const socket = this
    const { inRoom, playerId } = socket.player

    if (inRoom) {
      callback({success: false, message: "Cannot create room when player is already in room", room: null})
      return
    } else if (displayName === AI_DISPLAY_NAME) {
      callback({success: false, message: "You cannot name yourself that"})
      return
    }

    const roomCode = createRoom(playerId, displayName)

    socket.join(roomCode)

    callback({success: true, message: "Room created", room: getRoomDataForClient(roomCode)})
  }

  const joinRoomHandler = function (roomCode, displayName, callback) {
    const socket = this
    const { playerId } = socket.player
    
    const room = getRoomByRoomCode(roomCode)

    if (!room) {
      callback({success: false, message: "Room Code not found", room: null})
      return
    } else if (displayName === AI_DISPLAY_NAME) {
      callback({success: false, message: "You cannot name yourself that", room: null})
      return
    }

    for (let existingMember of room.members) {
      if (displayName === existingMember.displayName) {
        callback({success: false, message: "Player with username already exists", room: null})
        return
      }
    }

    const memberList = addPlayerToRoom(playerId, displayName, roomCode)

    socket.join(roomCode)
    socket.to(roomCode).emit("newPlayer", memberList, `${displayName} has Joined`)

    callback({success: true, message: "Room joined successfully", room: getRoomDataForClient(roomCode)})
  }

  const leaveRoom = function () {
    const socket = this
    const { inRoom, playerId, roomCode } = socket.player

    if (!inRoom) {
      return
    }

    removePlayerFromRoom(playerId, socket, io)
    socket.leave(roomCode)
  }

  const joinedRoomHandler = function () {
    const socket = this

    const { inRoom, roomCode } = socket.player

    const room = getRoomByRoomCode(roomCode)

    if (inRoom) {
      socket.emit("redraw", room.strokes)
    }
  }

  const disconnectHandler = function () {
    console.log("disconnect")

    const socket = this
    const player = getPlayer[socket.id]
    if (player) {
      removePlayerFromRoom(playerId, socket, io)
    }

  }

  return {
    createRoomHandler,
    joinRoomHandler,
    leaveRoom,
    joinedRoomHandler,
    disconnectHandler
  }
}