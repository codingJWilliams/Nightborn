const {
  Listener
} = require('discord-akairo');
var apiBuilder = require("../api/apiBuilder");
var cLog = require("../helpers/log");
var eco = require("../helpers/economy");

class ReadyListener extends Listener {
  constructor() {
    super('kale_emoter', {
      emitter: 'client',
      eventName: 'message'
    })
  }
  async exec(message) {
    if (message.author.id !== "200769142456844288") return;
    // We're sure it's a message from kale
    console.log(/<a:/.exec(message.content))
    if (/<a:/.exec(message.content)) {
      message.delete()
      var dm = await message.author.createDM();
      dm.send("stfu kale")
    } 
  }
}
module.exports = ReadyListener;
