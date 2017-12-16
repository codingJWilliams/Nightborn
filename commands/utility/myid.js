const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");
class MyIDCommand extends Command {
  constructor() {
    super('myid', {
      aliases: ['myid'],
      category: "utility"
    });
  }
  exec(message) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    return message.reply(' your ID is: `' + message.author.id + '`');
  }
}
module.exports = MyIDCommand;
