const { getRoomByRoomCode, getPlayer } = require('./state')

const playerMiddleware = (socket) =>{
  return (_, next) => {
    const playerStatus = {
      playerId: socket.id,
      inRoom: false,
      isOwnerOfRoom: false,
      isDrawing: false,
      roomCode: null,
      playerDisplayName: null
    }
  
    const player = getPlayer(socket.id)

    if (player) {
      const room = getRoomByRoomCode(player.room)
      playerStatus.inRoom = true
      playerStatus.isOwnerOfRoom = room.owner.id === socket.id
      playerStatus.roomCode = player.room
      playerStatus.playerDisplayName = player.displayName
  
      if (room.started) {
        playerStatus.isDrawing = room.members[room.drawingMemberIndex].id === socket.id
      }
    }
  
    socket.player = playerStatus
  
    next()
  }
} 

module.exports = {
  playerMiddleware
}