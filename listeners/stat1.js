const {
  Listener
} = require('discord-akairo');
var cLog = require("../helpers/log");
class StatListener extends Listener {
  constructor() {
    super('stat1', {
      emitter: 'client',
      eventName: 'message'
    });
  }
  exec(message) {
    global.datadog.increment("bot.messages.seen");
    console.log("Seen messgae")
  }
}
module.exports = StatListener;
