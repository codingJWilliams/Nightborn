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
var economy = require("../../helpers/economy");
var mc = require("../../helpers/minecraft");

function getHash(str) {
  var shasum = crypto.createHash("sha256");
  shasum.update(str);
  return shasum.digest("hex");
}
class PingCommand extends Command {
  constructor() {
    super('purchase', {
      aliases: ["purchase", "buy"],
      category: "minecraft",
      args: [{
          id: "item",
          type: "string"
        },
        {
          id: "type",
          type: "string"
        }
      ]
    });
  }

  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var shopItem = await global.mongo.collection("shop").findOne({
      id: args.item
    });
    if (!shopItem) return await message.channel.send({
      embed: {
        title: "I could not find that item",
        color: 0xFF0000
      }
    })
    if (args.type !== "once" && args.type !== "permanant") return await message.channel.send({
      embed: {
        title: "Please add to the end of your command whether to purchase `once` or `permanant`",
        color: 0xFF0000
      }
    });
    var mcName = await global.mongo.collection("link").findOne({
      discordID: message.author.id
    });
    if (!mcName) return await message.channel.send({
      embed: {
        description: "Try re-linking and if that doesn't work, dm VoidCrafted",
        title: "I could not find your minecraft name.",
        color: 0xFF0000
      }
    })
    mcName = mcName.mcUsername;

    var theirBal = await economy.getBal(message.author.id);
    var cost = shopItem[args.type === "once" ? "costOnce" : "costPermanant"]
    var command = shopItem[args.type === "once" ? "commandOnce" : "commandPermanant"].replace("$(player)", mcName);
    if (cost > theirBal) return await message.channel.send({
      embed: {
        description: "**<@" + message.author.id + "> You do not have enough souls for that**",
        color: 0xFF0000
      }
    });
    var online = await mc.easyCall("players.online.names", []);
    if (!online.includes(mcName)) return message.channel.send(new Discord.RichEmbed().setTitle("Couldn't find that player").setDescription("Hey, it looks like you're not online! Make sure you've spelt your name right and you're currently logged in!").setColor(0xFF0000));
    await economy.take(message.author.id, cost);
    await mc.easyCall("server.run_command", [
      command
    ])
    await mc.easyCall("chat.broadcast", [
      mc.colorCode(`&9Everyone drop a GG! @${member.tag} (${mcName}) just bought ${shopItem.name}`)
    ])
    await message.channel.send(new Discord.RichEmbed()
      .setTitle("Successfully purchased!")
      .setThumbnail("https://emojipedia-us.s3.amazonaws.com/thumbs/160/twitter/103/white-heavy-check-mark_2705.png")
      .setColor(0x00FF00)
      .setFooter("" + cost, "https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/118/ghost_1f47b.png")
    )
  }
}

module.exports = PingCommand;