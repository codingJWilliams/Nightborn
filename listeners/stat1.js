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
    //global.dogstatsd.increment("bot.messages.seen");
    dogapi.metric.send("bot.messages.seen", 1, {
      type: "count"
    }, function (err, results) {
      //console.dir(results);
    });
    //console.log("Seen messgae")
  }
}
module.exports = StatListener;
