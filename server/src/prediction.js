const pluralize = require('pluralize');

const { getRooms, goToNextRound, AI_DISPLAY_NAME } = require('./state')
const { get_cnn_prediction } = require('./python/python')

const conformStrokes = (strokes) => {
  // convser to x, y, t lists
  const strokeLists = []
  strokes.forEach((stroke) => {
    const strokeList = [[], [], []]
    stroke.forEach(({x, y, t}) => {
      strokeList[0].push(x);
      strokeList[1].push(y);
      strokeList[2].push(t)
    })
    strokeLists.push(strokeList)
  })

  return strokeLists
}

const predict = async (strokes, model, difficulty, correctWord) => {
  const conformedStrokes = conformStrokes(strokes)

  const predFunc = model === "cnn" ? get_cnn_prediction : get_cnn_prediction
  
  let numTopResults = 0
  if (difficulty == "easy") {
    numTopResults = 1
  } else if (difficulty == "medium") {
    numTopResults = 5
  } else if (difficulty == "hard") {
    numTopResults = 10
  }

  const [topResults, top] = await predFunc(conformedStrokes, numTopResults)

  if (correctWord in topResults) return correctWord
  return top[0]
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
        predict(room.strokes, room.model, room.difficulty, room.currentWord).then((prediction) => {
          prediction = prediction.replace("-", "")
          const indefinite = getIndefinite(prediction)
          if (room.prevAiPredictions.includes(prediction)) {
            return
          }

          room.prevAiPredictions.push(prediction)
          if (prediction === room.currentWord.replace("-", "")) {
            io.in(room.roomCode).emit("newMessage", `Oh I know, it's ${indefinite} ${prediction}`, AI_DISPLAY_NAME)
            io.in(room.roomCode).emit("newMessage", `Humans Lose! The correct word was ${prediction}`, null)
            goToNextRound(room.roomCode, io)
          } else {
            io.in(room.roomCode).emit("newMessage", `I think it's ${indefinite} ${prediction}`, AI_DISPLAY_NAME)
          }
        })
      }
    })
    
  }, 2000)
}

module.exports = {
  startLoop
}