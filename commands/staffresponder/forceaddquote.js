const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var Discord = require("discord.js");
var util = require("../../helpers/util");
class PlayingCommand extends Command {
  constructor() {
    super('forceaddquote', {
      aliases: ['forceaddquote'],
      category: "staffresponder",
      split: "none",
      args: [{
        "id": "person",
        "type": "member"
      }, {
        "id": "quote",
        "type": "string",
        "match": "rest"
      }]
    });
  }
  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var staffQuotes = JSON.parse(require("fs")
      .readFileSync("./storage/staffQuotes.json")
      .toString());
    if (staffQuotes.filter(sObj => sObj.staffid === args.person.id)
      .length === 0) {
      message.channel.send(new Discord.RichEmbed()
        .setDescription("**They don't have a responder! Ask <@193053876692189184>**")
        .setColor(0xFF0000));
      return;
    }
    var staffQuotes = staffQuotes.map(sObj => {
      if (sObj.staffid !== args.person.id) return sObj;
      sObj.quotes.push(args.quote);
      return sObj;
    })
    require("fs")
      .writeFileSync("./storage/staffQuotes.json", JSON.stringify(staffQuotes, null, 2));
    message.channel.send(new Discord.RichEmbed()
      .setDescription("**Added quote!**")
      .setColor(0x00FF00))
    return;
  }
}
module.exports = PlayingCommand;
