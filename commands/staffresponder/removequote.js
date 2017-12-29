const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var Discord = require("discord.js");
var util = require("../../helpers/util");
class PlayingCommand extends Command {
  constructor() {
    super('removequote', {
      aliases: ['removequote', "rmq"],
      category: "staffresponder",
      args: [{
        "id": "quote",
        "type": "number"
      }]
    });
  }
  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var staffQuotes = JSON.parse(require("fs")
      .readFileSync("./storage/staffQuotes.json")
      .toString());
    if (staffQuotes.filter(sObj => sObj.staffid === message.author.id)
      .length === 0) {
      message.channel.send(new Discord.RichEmbed()
        .setDescription("**You don't have a responder! Ask <@193053876692189184>**")
        .setColor(0xFF0000));
      return;
    }
    var staffQuotes = staffQuotes.map(sObj => {
      if (sObj.staffid !== message.author.id) return sObj;
      sObj.quotes = sObj.quotes.filter((val, i) => i != args.quote)
      return sObj;
    })
    require("fs")
      .writeFileSync("./storage/staffQuotes.json", JSON.stringify(staffQuotes, null, 2));
    message.channel.send(new Discord.RichEmbed()
      .setDescription("**Removed quote!**")
      .setColor(0x00FF00))
    return;
  }
}
module.exports = PlayingCommand;
