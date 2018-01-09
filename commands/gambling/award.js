const {
  Command
} = require('discord-akairo');
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
var util = require("../../helpers/util");

class AwardCommand extends Command {
  constructor() {
    super('goldenballs', {
      aliases: ['award'],
      prefix: ["$", ",", "nb."],
      userPermissions: (msg) => {
        var whitelistedRoles = [
          "312455922721095682",
          "301870138573979658",
          "303672545335312396"
        ];
        var whitelistedIds = [

        ];
        var blacklistedIds = [

        ];

        var finalResult = false;
        if (msg.member.roles.some(r => whitelistedRoles.includes(r.id))) finalResult = true;
        if (whitelistedIds.includes(msg.member.id)) finalResult = true;
        if (blacklistedIds.includes(msg.member.id)) finalResult = false;
        return finalResult
      },
      category: "gambling",
      args: [{
        id: "amnt",
        type: "number"
      }, {
        id: "reciever",
        type: "string"
      }]
    });
  }
  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    if (args.reciever.startsWith("<@&")) return message.channel.send(new Discord.RichEmbed().setTitle("Awarding to roles is not supported yet D:").setDescription("Sorry! It's coming soonTM").setColor(0xFF0000));
    try {
      var user = message.guild.fetchMember(args.reciever.replace("<@", "").replace(">", ""));
      await economy.award(user.id, args.amnt);
      message.channel.send(
        new Discord.RichEmbed()
        .setDescription(`<@${message.author.id}> has awarded ${args.amnt}:ghost: to <@${user.id}>`)
        .setColor(0x71cd40)
      )
    } catch (e) {
      return message.channel.send(new Discord.RichEmbed().setColor(0xee281f).setTitle("Error: cannot find that user"))
    }
  }
}
module.exports = AwardCommand;
