const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
const util_ = require('util');
const exec = util_.promisify(require('child_process')
  .exec);
var util = require("../../helpers/util");
class RestartCommand extends Command {
  constructor() {
    super('restart', {
      aliases: ['restart', "rs"],
      category: "utility",
      userPermissions: bpf(["techies"])
    });
  }
  async exec(message) {
    util.log("command." + this.id, "warn", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`);
    util.log("process.main", "warn", "Going down")
    message.channel.send(new Discord.RichEmbed()
      .setDescription(":alarm_clock: Restarting. Brb")
      .setColor(0xFFFF00));
    exec("pm2 restart NB");
    return;
  }
}
module.exports = RestartCommand;
