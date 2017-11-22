const { Command } = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class SayCommand extends Command {
    constructor() {
        super('shell', {
            aliases: ['shell', "sh"],
            category: "utility",
            userPermissions: bpf(["techies"]),
            split: "none",
            args: [
              {
                id: "cmd",
                type: "string"
              }
            ]
        });
    }

    async exec(message, args) {
      if (require("../../helpers/getPlatform").vps() || message.author.id === this.client.ownerID) {
        await message.channel.send("Executing! :zzz: ")
        var { stdout, stderr } = await exec(args.cmd);
        await message.channel.send("STDout: ```\n" + stdout + "```");
        await message.channel.send("STDerr: ```\n" + stderr + "```");
        return;
      } else {
        message.channel.send("Bot currently on Jay's laptop. Sorry!")
      }
      
    }
}

module.exports = SayCommand;