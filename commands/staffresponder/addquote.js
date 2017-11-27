const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var Discord = require("discord.js");
var util = require("../../helpers/util");

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
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
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
    message.channel.send(" ```We have just 3 weeks to save net neutrality. Act now.``` <https://www.battleforthenet.com/>")
    return;
  }
}

module.exports = PlayingCommand;
