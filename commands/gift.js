/*
const {
  Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../helpers/build_permission_function");
var survey_finder = require("../helpers/survey_finder");
var util = require("../helpers/util");

class GiftCommand extends Command {
  constructor() {
    super('gift', {
      aliases: ["gift"]
    });
  }

  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var hasPrevious = await global.mongo.collection("giftsGiven").findOne({
      id: message.author.id
    });
    if (!hasPrevious) {
      return message.channel.send(
        new Discord.RichEmbed()
        .setTitle(":octagonal_sign: You've already had a gift you oaf")
        .setDescription(":heart: Dw tho, just wait till the 1st of January")
        .setColor(util.red)
      )
    }
    var possibleGifts = [
      {
        type: "souls",
        amount: 500000,
        common: 80
      }, {
        type: "souls",
        amount: 1,
        common: 2
      }, {
        type: "souls",
        amount: 1000000,
        common: 8
      }, {
        type: "message",
        message: "What a fucking lousy gift",
        common: 1
      }, {
        type: "message",
        message: "Screenshot this and send it to <@193053876692189184> to redeem: Kit Builder on the Nightborn Minecraft server.",
        common: 2,
        requireMC: true
      }, {
        type: "role",
        id: "390568813915144193",
        description: "A hoisted role until the 5th of January",
        common: 5
      }, {
        type: "role",
        id: "CHANGE ME",
        common: 5,
        description: "A role to express your inner self"
      }
    ];
    var chancePool = []
    possibleGifts.map(g => null)
  }
}

module.exports = GiftCommand;
*/