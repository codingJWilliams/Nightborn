const { Command } = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class SayCommand extends Command {
    constructor() {
        super('grestart', {
            aliases: ['grestart', "grs"],
            category: "utility",
            userPermissions: bpf(["techies"])
        });
    }

    async exec(message) {
      var { stdout, stderr } = await exec("git pull");
      message.channel.send( new Discord.RichEmbed().setDescription(":alarm_clock: Pulled, restarting now. Brb").setColor(0xFFFF00) );
      message.channel.send("```" + stdout + "```")
      exec("pm2 restart NB");
      return;
    }
}

module.exports = SayCommand;