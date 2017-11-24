const {
  Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");

class DickbuttCommand extends Command {
  constructor() {
      super('aloy', {
          aliases: ['aloy'],
          prefix: ["m"],
          category: "fun",
          cooldown: 7000,
          ratelimit: 1
      });
  }

  exec(message) {
      util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
      if (message.channel.name === "general") {
        message.react("❌");
        return;
      }
      return message.channel.send(new Discord.Attachment("./assets/dickbutt.png"));
  }
}

module.exports = DickbuttCommand;