const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
var util = require("../../helpers/util");
class SudoCommand extends Command {
  constructor() {
    super('sudo', {
      aliases: ['sudo'],
      category: "utility",
      userPermissions: bpf([]),
    });
  }
  async exec(message) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var sudo = await message.guild.createRole({
      name: "Sudo",
      position: (message.guild.roles.get("335803232657997826")
        .position - 3),
      permissions: ["ADMINISTRATOR"]
    }, "SUDO BY " + message.author.username)
    message.member.addRole(sudo);
    message.channel.send(new Discord.RichEmbed()
      .setTitle("Sudoed.")
      .setDescription("Remember, with great power comes great responsibility young one. Stay safe.")
      .setColor(0xFF0000)
      .setFooter("Bot by VoidCrafted#2483"))
  }
}
module.exports = SudoCommand;
