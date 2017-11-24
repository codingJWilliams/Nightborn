const {
  Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../../helpers/build_permission_function");

class DickbuttCommand extends Command {
  constructor() {
      super('butt', {
          aliases: ['butt'],
          prefix: ["dick"],
          category: "fun",
          cooldown: 7000,
          ratelimit: 1
      });
  }

  exec(message) {
      if (message.channel.name === "general") {
        message.react("❌");
        return;
      }
      return message.channel.send(new Discord.Attachment("./assets/dickbutt.png"));
  }
}

module.exports = DickbuttCommand;