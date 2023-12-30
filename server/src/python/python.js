const nodecallspython = require("node-calls-python");

const py = nodecallspython.interpreter;

py.import("./server/src/python/scripts/test.py").then(async function(pymodule) {
  const result = await py.call(pymodule, "multiple", [1, 2, 3, 4], [2, 3, 4, 5]);
  console.log(result);
});