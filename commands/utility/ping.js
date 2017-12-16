const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");
class PingCommand extends Command {
  constructor() {
    super('ping', {
      category: "utility",
      aliases: ['ping', 'hello']
    });
  }
  exec(message) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    return message.reply('Pong!');
  }
}
module.exports = PingCommand;
