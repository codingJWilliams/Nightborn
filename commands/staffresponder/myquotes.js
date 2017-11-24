const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var Discord = require("discord.js");
var utilities = require("../../helpers/utilities");

class PlayingCommand extends Command {
  constructor() {
    super('myquotes', {
      aliases: ['myquotes'],
      category: "staffresponder"
    });
  }

  async exec(message, args) {
    var staffQuotes = JSON.parse(require("fs").readFileSync("./storage/staffQuotes.json").toString());
    if (staffQuotes.filter(sObj => sObj.staffid === message.author.id).length === 0) {
      message.channel.send(new Discord.RichEmbed().setDescription("**You don't have a responder! Ask <@193053876692189184>**").setColor(0xFF0000));
      return;
    }
    staffQuotes.map(sObj => {
      if (sObj.staffid !== message.author.id) return sObj;
      var quotes = sObj.quotes.map((q, ind) => {
        return ind + ": " + q
      }).join("\n");
      var embed = new Discord.RichEmbed().setTitle("Your quotes (" + sObj.quotes.length + "):").setDescription(quotes).setColor(0x00FF00);
      message.channel.send(embed)
    })
    return;
  }
}

module.exports = PlayingCommand;