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
      await message.channel.send("Executing! :zzz: ")
      var { stdout, stderr } = await exec(args.cmd);
      await message.channel.send("STDout: ```" + stdout + "```");
      await message.channel.send("STDerr: ```" + stderr + "```");
      return;
    }
}

module.exports = SayCommand;