const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var Discord = require("discord.js");
var util = require("../../helpers/util");

class PlayingCommand extends Command {
  constructor() {
    super('quotes', {
      aliases: ['quotes'],
      category: "staffresponder",
      userPermissions: bpf(["owner", "techies", "dons"]),
      args: [{
        id: "person",
        type: "member"
      }]
    });
  }

  async exec(message, args) {
    var staffQuotes = JSON.parse(require("fs").readFileSync("./storage/staffQuotes.json").toString());
    if (staffQuotes.filter(sObj => sObj.staffid === args.person.id).length === 0) {
      message.channel.send(new Discord.RichEmbed().setDescription("**They don't have a responder! Ask <@193053876692189184>**").setColor(0xFF0000));
      return;
    }
    staffQuotes.map(sObj => {
      if (sObj.staffid !== args.person.id) return sObj;
      var quotes = sObj.quotes.map((q, ind) => {
        return ind + ": " + q
      }).join("\n");
      var embed = new Discord.RichEmbed().setTitle("Their quotes (" + sObj.quotes.length + "):").setDescription(quotes).setColor(0x00FF00);
      message.channel.send(embed)
    })
    return;
  }
}

module.exports = PlayingCommand;