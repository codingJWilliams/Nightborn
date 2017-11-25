var colors = require("colors");



module.exports = function log(sectionid, level, message) {
  var levelMap = {
    "critical": 0,
    "error": 1,
    "warn": 2,
    "debug": 3,
    "info": 4,
    "cmd": 5,
    "spam": 6
  }
  var currentLevel = levelMap["cmd"];
  if (levelMap[level] < (currentLevel + 1)) {
    var levelColors = [
      colors.red,
      colors.red,
      colors.yellow,
      colors.blue,
      colors.magenta,
      colors.cyan,
      colors.grey
    ];
    var lColor = levelColors[levelMap[level]];
    console.log(lColor(level) + " > ".grey + sectionid.white + " >> ".grey + colors.grey(message));

  }
  console.log(global.logSocket.connected)
  global.logSocket.emit("log", {
    proc: sectionid,
    level: levelMap[level],
    message: message
  });
}
