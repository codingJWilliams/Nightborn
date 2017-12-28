module.exports = () => {
  global.logSocket = require('socket.io-client')('http://jwte.ch:8008');
  global.logSocket.on("connect", () => {
    global.logSocket.emit("sendLogsSoon <3");
    global.logSocket.emit("log", {
      proc: "bot.logger",
      level: 3,
      message: "Bot handshake with log server"
    });
  })
}
