const pluralize = require('pluralize');


const words = require("./resources/words.json")
const { getRooms, goToNextRound, AI_DISPLAY_NAME } = require('./state')

const predict = (strokes) => {
  return words[Math.floor(Math.random() * words.length)];
}

const getIndefinite = (word) => {
  if (pluralize(word) === word) {
    return ""
  }

  if (['a', 'e', 'i', 'o', 'u'].includes(word[0])) {
    return "an"
  }

  if (word.toLowerCase().includes("the ")) {
    return ""
  }

  return "a"
}

const startLoop = (io) => {
  setInterval(() => {
    Object.values(getRooms()).forEach((room) => {
      if (room.started && room.hasChangedSinceLastPrediction) {
        room.hasChangedSinceLastPrediction = false
        const prediction = predict(room.strokes).replace("-", "")

        const indefinite = getIndefinite(prediction)

        if (prediction === room.currentWord.replace("-", "")) {
          io.in(room.roomCode).emit("newMessage", `Oh I know, it's ${indefinite} ${prediction}`, AI_DISPLAY_NAME)
          io.in(room.roomCode).emit("newMessage", `Humans Lose! The correct word was ${prediction}`, null)
          nextRound(room.roomCode, io)
        } else {
          io.in(room.roomCode).emit("newMessage", `I think it's ${indefinite} ${prediction}`, AI_DISPLAY_NAME)
        }
      }
    })
    
  }, 2000)
}

module.exports = {
  startLoop
}