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
    super('bc', {
      aliases: ['bc', 'betcard'],
      prefix: "$",
      category: "gambling",
      args: [{
        id: "amnt",
        type: "number"
      }, {
        id: "card",
        type: "string"
      }]
    });
  }

  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)

    if (args.amnt < 50) {
      util.log("command." + this.id, "info", `${util.nameFormat} used command incorrectly, passing ${args.amnt}`)
      message.channel.send(new Discord.RichEmbed().setDescription("EG: `$bc 10000 10H`").setTitle("Invalid amount! Please use a positive number above 50").setColor(0xFF0000))
      return;
    }
    var BetterBal = await economy.getBal(message.author.id.toString());
    util.log("command." + this.id, "spam", `Gotten bals.`)
    if (BetterBal < args.amnt) {
      util.log("command." + this.id, "info", `Executor doesn't have enough souls`)
      message.channel.send(new Discord.RichEmbed()
        .setTitle("You don't have enough :ghost: for this")
        .setColor(0xFF0000)
      )
      return;
    }

    myDeck.shuffle(); //shuffle deck
    var SelCard = myDeck.random(1); //select random card
    var UserCard = args.card;
    var CardNo = UserCard.charAt(0); //get user card number
    var CardSuit = UserCard.charAt(1); //get user card suit
    var SelCardNo = SelCard.charAt(0); //get random card number
    var SelCardSuit = SelCard.charAt(1); //get random card suit
    console.log(SelCard, UserCard, CardNo, CardSuit, SelCardNo, SelCardSuit)
    //Cover situation where user picks 10 as it is one more char than the other options
    if ((CardNo == '1') && (CardSuit == '0')) {
      CardNo = '10';
      CardSuit = UserCard.charAt(2);
    }
    if ((SelCardNo == '1') && (SelCardSuit == '0')) {
      SelCardNo = '10';
      SelCardSuit = UserCard.charAt(2);
    }
    //
    //determine if valid card
    var valid = (CardNo == '2') || (CardNo == '3') || (CardNo == '4') || (CardNo == '5') || (CardNo == '6') || (CardNo == '7') || (CardNo == '8') || (CardNo == '9') || (CardNo == '10') || (CardNo == 'J') || (CardNo == 'Q') || (CardNo == 'K') || (CardNo == "A");
    var valid1 = (CardSuit == 'S') || (CardSuit == 'C') || (CardSuit == 'D') || (CardSuit == 'H')
    if(valid && valid1) {
      economy.take(message.author.id, args.amnt);
    }
    if (!(valid && valid1)) {
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle("Invalid Card")
        .setDescription(`Enter a valid card. EG: KH for King of Hearts or 5C for 5 of Clubs.`)
        .setColor(0x71cd40)
      )
    } else if (UserCard == SelCard) {
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle(`Card drawn: ${SelCard}`)
        .setDescription(`You have won ${(args.amnt * 10)}!`)
        .setColor(0x71cd40)
      )
      economy.award(message.author.id, (args.amnt * 10));
    } else if (SelCardNo == CardNo) {
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle(`Card drawn: ${SelCard}`)
        .setDescription(`You have won ${(args.amnt * 4)}!`)
        .setColor(0x71cd40)
      )
      economy.award(message.author.id, (args.amnt * 4));
    } else if (SelCardSuit == CardSuit) {
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle(`Card drawn: ${SelCard}`)
        .setDescription(`You have won ${(args.amnt * 2)}!`)
        .setColor(0x71cd40)
      )
      economy.award(message.author.id, args.amnt * 2);
    } else {
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle(`Card drawn: ${SelCard}`)
        .setDescription(`Better luck next time :(`)
        .setColor(0x71cd40)
      )
    }
  }
}

module.exports = BetCardCommand;
