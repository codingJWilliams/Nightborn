const {
  Command
} = require('discord-akairo');
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
var util = require("../../helpers/util");
var cardDeck = require("card-deck")
var myDeck = new cardDeck(['AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS']);
class BetCardCommand extends Command {
  constructor() {
    super('goldenballs', {
      aliases: ['goldenballs', 'balls', 'gb'],
      prefix: ["$", ",", "nb."],
      category: "gambling",
      args: [{
        id: "amnt",
        type: "number"
      }, {
        id: "other",
        type: "member"
      }]
    });
  }

  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    if (args.amnt < 50) return message.channel.send("")
    if (!args.amnt || !args.other) think()

  }
}

module.exports = BetCardCommand;
