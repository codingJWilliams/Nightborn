const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
const util_ = require('util');
const exec = util_.promisify(require('child_process').exec);
var util = require("../../helpers/util");

class SayCommand extends Command {
  constructor() {
    super('shell', {
      aliases: ['shell', "sh"],
      category: "utility",
      userPermissions: bpf([]),
      split: "none",
      args: [{
        id: "cmd",
        type: "string"
      }]
    });
  }

  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    if (require("../../helpers/getPlatform").vps() || message.author.id === this.client.ownerID) {
      await message.channel.send("Executing! :zzz: ")
      var {
        stdout,
        stderr
      } = await exec(args.cmd);
      await message.channel.send("STDout: ```\n" + stdout + "```");
      await message.channel.send("STDerr: ```\n" + stderr + "```");
      return;
    } else {
      message.channel.send("Bot currently on Jay's laptop. Sorry!")
    }

  }
}

module.exports = SayCommand;
