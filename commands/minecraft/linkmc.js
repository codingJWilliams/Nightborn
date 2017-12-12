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
    super('linkmc', {
      aliases: ['linkmc', "mc"],
      category: "minecraft",
      args: [{
        id: "mcName",
        type: "string"
      }]
    });
  }

  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var online = await mc.easyCall("players.online.names", []);
    if (online.success.indexOf(args.mcName) == -1) {
      util.log("command." + this.id, "info", `Couldn't find player ${args.mcName} online`);
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle("Couldn't find that player")
        .setDescription("Hey, it looks like you're not online! Make sure you've spelt your name right and you're currently logged in!")
        .setColor(util.red)
      );
      return;
    }
    util.log("command." + this.id, "spam", `Read files`)
    var linkCode = phonetic.generate().toLowerCase();
    util.log("command." + this.id, "info", `Generated link code ${linkCode}`)
    await global.mongo.collection("link").insertOne({
      mcUsername: args.mcName,
      discordID: message.author.id,
      code: linkCode
    });
    util.log("command." + this.id, "spam", `Written to db`)
    await mc.easyCall("players.name.send_message", [
      args.mcName,
      mc.colorCode("&9&o[PM] &9BOT &8> &7Nightborn Bot &8>> &9Type &8nb.completelink " + linkCode + "&9 in #bot-commands and I'll get your rank sorted out :)")
    ])
    util.log("command." + this.id, "spam", `Sent private message`)
    message.channel.send(
      new Discord.RichEmbed()
      .setTitle("I've sent instructions to you on the minecraft server!")
      .setThumbnail("https://crafatar.com/avatars/" + args.mcName + ".png")
      .setColor(util.green)
    );
  }
}

module.exports = PingCommand;