const { randomBytes } = require("crypto");

const rooms = {}
const players = {}

const AI_DISPLAY_NAME = "Mysterious AI"
const ROOM_ID_LENGTH = 5

const words = require("./resources/words.json")

const pickRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)].replace("-", "");
}

const findSpaceIndices = (word) => {
  return word
    .split('')
    .map((char, index) => (char === ' ' ? index : -1))
    .filter(index => index !== -1);
}

const generateRoomCode = () => {
  let code
  let codeLength = ROOM_ID_LENGTH

  if (codeLength % 2 !== 0) {
    codeLength++;
  }

  do {
    code = randomBytes(codeLength / 2).toString("hex");
  } while (code in rooms)
  
  return code.toUpperCase()
}

const getPlayer = (playerId) => {
  if (playerId in players) {
    return players[playerId]
  }

  return null
}

const getRoomByRoomCode = (roomCode) => {
  const room = rooms[roomCode.toUpperCase()]

  return room
}

const getRooms = () => {
  return rooms
}

const createRoom = (ownerId, displayName) => {
  const newRoomCode = generateRoomCode()

  rooms[newRoomCode] = {
    roomCode: newRoomCode,
    strokes: [],
    members: [{id: null, displayName: AI_DISPLAY_NAME}, {id: ownerId, displayName: displayName}],
    currentWord: null,
    drawingMemberIndex: null,
    owner: {id: ownerId, displayName: displayName},
    started: false,
    hasChangedSinceLastPrediction: false,
    drawing: false
  }

  players[ownerId] = {room: newRoomCode, displayName: displayName}
  return newRoomCode
}

const getRoomDataForClient = (roomCode) => {
  const room = rooms[roomCode]

  return {
    roomCode: room.roomCode,
    members: room.members,
    drawingMemberIndex: room.drawingMemberIndex,
    owner: room.owner,
    started: room.started,
    numLetters: room.currentWord ? room.currentWord.length : 0,
    spaceIndices: room.currentWord ? findSpaceIndices(room.currentWord) : []
  }
}

const addPlayerToRoom = (playerId, displayName, roomCode) => {  
  players[playerId] = {displayName: displayName, room: roomCode}

  rooms[roomCode].members.push({id: playerId, displayName: displayName})

  return rooms[roomCode].members
}

const removePlayerFromRoom = (playerId, socket, io) => {
  const leavingPlayer = players[playerId]
  const room = rooms[leavingPlayer.room]
  const leavingPlayerIndex = room.members.findIndex((player) => player.id === playerId)

  if (room.started && room.drawingMemberIndex > leavingPlayerIndex) {
    // player is in front of current drawer, need to decrement
    // current drawing index
    room.drawingMemberIndex -= 1
  }

  room.members.splice(leavingPlayerIndex, 1);
  socket.to(room.roomCode).emit("playerLeft", room.members, `${leavingPlayer.displayName} has left`, room.drawingMemberIndex)

  // remove room if nobody left
  if (room.members.length === 1) {
    delete rooms[room.roomCode]
  } else if (room.members.length === 2) {  
    // kick out last person if only one person left
    io.to(room.members[1].id).emit("kicked", "Everyone has left the room")

    delete players[room.members[1].id]
    delete rooms[room.roomCode]
  }

  // if it is the owner that has left, assign new owner
  if (room.owner.id === playerId) {
    room.owner = room.members[0]
    socket.to(room.roomCode).emit("newOwner", room.owner)
  }

  // remove player from players
  delete players[playerId]
}

const startGame = (roomCode) => {
  const room = rooms[roomCode]

  room.started = true
  room.drawingMemberIndex = 1
}

const goToNextRound = (roomCode, io, changePlayer = true) => {
  const room = rooms[roomCode]

  let nextDrawer = room.drawingMemberIndex

  if (changePlayer) {
    nextDrawer = room.drawingMemberIndex + 1 >= room.members.length ? 1 : room.drawingMemberIndex + 1
  }

  room.drawingMemberIndex = nextDrawer
  room.currentWord = pickRandomWord()
  room.strokes = []
  room.hasChangedSinceLastPrediction = false

  io.to(room.roomCode).emit("newRound", nextDrawer, room.currentWord.length, findSpaceIndices(room.currentWord))
  io.to(room.members[nextDrawer].id).emit("yourTurn", nextDrawer, room.currentWord.length, room.currentWord, findSpaceIndices(room.currentWord))
}

const draw = (roomCode, line) => {
  const room = rooms[roomCode]
  room.strokes[room.strokes.length - 1].push(line.end)
  room.hasChangedSinceLastPrediction = true
}

const startStroke = (roomCode, startCoord) => {
  const room = rooms[roomCode]

  room.strokes.push([startCoord])
  room.drawing = true
}

const endStroke = (roomCode) => {
  const room = rooms[roomCode]

  room.drawing = false
}

const undoStroke = (roomCode) => {
  const room = rooms[roomCode]
  room.drawing = false

  room.strokes.pop()

  if (room.strokes.length > 0) {
    room.hasChangedSinceLastPrediction = true
  }
  
  return room.strokes
}

module.exports = {
  AI_DISPLAY_NAME,
  getRooms,
  getPlayer,
  getRoomByRoomCode,
  createRoom,
  getRoomDataForClient,
  addPlayerToRoom,
  removePlayerFromRoom,
  startGame,
  goToNextRound,
  draw,
  startStroke,
  endStroke,
  undoStroke
}