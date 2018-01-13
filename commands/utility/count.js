const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");
class SayCommand extends Command {
  constructor() {
    super('count', {
      aliases: ['count'],
      category: "utility"
    });
  }
  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    message.reply("the next number you need to type is: " + ((await global.mongo.collection("currentCount")
        .findOne({}))
      .count + 1))
  }
}
module.exports = SayCommand;
