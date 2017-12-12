const {
  Listener
} = require('discord-akairo');
var cLog = require("../helpers/log");

class BobListener extends Listener {
  constructor() {
    super('bob', {
      emitter: 'client',
      eventName: 'message'
    });
  }

  exec(message) {
    var blacklisted = [
      "staff", "admin"
    ];
    if (blacklisted.includes(message.channel.name)) return;
    if (message.author.id !== "196870559630360576") return;
    global.mongo.collection("bobquotes").insertOne({
      quote: message.content,
      time: Date.now()
    })
  }
}

module.exports = BobListener;