const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var Discord = require("discord.js");

class PlayingCommand extends Command {
  constructor() {
    super('addquote', {
      aliases: ['addquote'],
      category: "staffresponder",
      split: "none",
      args: [{
        "id": "quote",
        "type": "string"
      }]
    });
  }

  async exec(message, args) {
    var cLog = require("../../helpers/log");
    var staffQuotes = JSON.parse(require("fs").readFileSync("./storage/staffQuotes.json").toString());
    if (staffQuotes.filter(sObj => sObj.staffid === message.author.id).length === 0) {
      message.channel.send(new Discord.RichEmbed().setDescription("**You don't have a responder! Ask <@193053876692189184>**").setColor(0xFF0000));
      return;
    }
    var staffQuotes = staffQuotes.map(sObj => {
      if (sObj.staffid !== message.author.id) return sObj;
      sObj.quotes.push(args.quote);
      return sObj;
    })
    require("fs").writeFileSync("./storage/staffQuotes.json", JSON.stringify(staffQuotes, null, 2));
    message.channel.send(new Discord.RichEmbed().setDescription("**Added quote!**").setColor(0x00FF00))
    return;
  }
}

module.exports = PlayingCommand;