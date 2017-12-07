const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var Discord = require("discord.js");
var mc = require("../../helpers/minecraft");
var phonetic = require('phonetic');
var crypto = require("crypto");
var config = require("../../config.json");
var readFilePromise = require("../../helpers/readFilePromise");
var fs = require("fs");
var util = require("../../helpers/util");

function getHash(str) {
  var shasum = crypto.createHash("sha256");
  shasum.update(str);
  return shasum.digest("hex");
}
class PingCommand extends Command {
  constructor() {
    super('shop', {
      aliases: ["shop"],
      category: "minecraft"
    });
  }

  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var shopItems = await global.mongo.collection("shop").find({a: true}).toArray();
    var emb = new Discord.RichEmbed()
    .setTitle("Minecraft Shop")
    .setDescription("Type `,shopitem <id>` to see more about it! Additionally, there are 2 prices for each item. The permanant price, if given, gives you permission to run the command as many times as you want. The cheaper one-time cost will deposit the items in your inventory. Make sure you are online and have space!")
    .setColor(0x00FF00)
    shopItems.map( i => {
      emb.addField(i.name, `Description: ${i.description}
Permanant Cost: ${i.costPermanant == null ? "N/A" : i.costPermanant }
One-time Cost: ${i.costOnce == null ? "N/A" : i.costOnce }`);
    })
  }
}

module.exports = PingCommand;
