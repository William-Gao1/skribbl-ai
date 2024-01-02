const nodecallspython = require("node-calls-python");

const py = nodecallspython.interpreter;

const cnn_module = py.importSync("./server/src/python/scripts/preprocess_cnn.py")

const get_cnn_prediction = async (strokes, num_to_return) => {
  const result = await py.call(cnn_module, "get_prediction", strokes)

  const sortedPredictions = Object.entries(result).sort(([, a], [, b]) => b - a)

  console.log(sortedPredictions.slice(0, 10))
  
  const top = sortedPredictions.slice(0, num_to_return)
  return [Object.fromEntries(top), top[0]]
}

module.exports = {
  get_cnn_prediction
}