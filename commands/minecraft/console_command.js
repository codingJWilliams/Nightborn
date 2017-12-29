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
class PingCommand extends Command {
  constructor() {
    super('console', {
      aliases: ["console"],
      category: "minecraft",
      userPermissions: bpf([]),
      split: "none",
      args: [{
        id: "command",
        type: "string"
      }]
    });
  }
  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    await mc.easyCall("server.run_command", [args.command]);
    util.log("command." + this.id, "warn", `${util.nameFormat(message.author)} just executed Minecraft command '${args.command}'`);
    message.reply("console command sent!");
    return;
  }
}
module.exports = PingCommand;
