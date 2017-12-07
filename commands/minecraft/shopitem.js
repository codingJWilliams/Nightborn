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
    super('shopitem', {
      aliases: ["shopitem"],
      category: "minecraft",
      args: [
        {
          id: "item",
          type: "string"
        }
      ]
    });
  }

  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var shopItem = await global.mongo.collection("shop").findOne({id: args.item});
    if (!shopItem) return await message.channel.send({embed: {title: "I could not find that item", color: 0xFF0000}})
    var emb = new Discord.RichEmbed()
    .setTitle("Item: " + shopItem.name)
    .setDescription(shopItem.description)
    .setColor(0x00FF00)
    .addBlankField()
    var itemsStr = ""
    shopItem.items.map( item => {
      if (item.type === "item") {
        itemsStr = itemsStr + `**${item.name === item.item ? item.name : item.name + " {" + item.item + "}"}**\n  Enchants: ${item.enchants.join(", ")}${item.amount > 1 ? "\n  Amount: " + item.amount + "\n" : "\n"}`
      }
    })
    emb.addField("Items", itemsStr)
    message.channel.send(emb)
  }
}

module.exports = PingCommand;
