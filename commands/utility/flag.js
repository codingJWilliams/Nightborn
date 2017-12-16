const {
  Command
} = require('discord-akairo');
var Discord = require("discord.js");
var setFlag = require("../../helpers/setFlag");
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");
class FlagCommand extends Command {
  constructor() {
    super('flag', {
      aliases: ['flag'],
      userPermissions: bpf(['dons', 'owner']),
      category: "utility",
      args: [{
        id: "flagName",
        type: "string"
      }, {
        id: "val",
        type: "string"
      }]
    });
  }
  exec(message, args) {
    //if (!message.author.roles.some(r => ["The Bobfather", "Mafia Don", "Wise Guys (Mafia Techies)"].includes(r.name))) return;
    return new Promise((resolve, reject) => {
      util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
      var val;
      if (["y", "yes", "true"].indexOf(args.val) !== -1) val = true;
      if (["n", "no", "false"].indexOf(args.val) !== -1) val = false;
      try {
        setFlag(args.flagName, val);
      } catch (e) {};
      message.channel.send(new Discord.RichEmbed()
        .setTitle("Changed flag")
        .setColor(4359924)
        .setDescription(`\`${args.flagName}\` is set to \`${val}\``)
        .setThumbnail("https://emojipedia-us.s3.amazonaws.com/thumbs/160/twitter/103/white-heavy-check-mark_2705.png"))
      resolve()
    })
  }
}
module.exports = FlagCommand;
