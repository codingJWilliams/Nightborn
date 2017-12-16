const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
const util_ = require('util');
const exec = util_.promisify(require('child_process')
  .exec);
var util = require("../../helpers/util");
class SoftbanCommand extends Command {
  constructor() {
    super('softban', {
      aliases: ['softban', 'sb'],
      category: "utility",
      userPermissions: bpf(["owner", "dons", "techies"]),
      args: [{
        id: "softban",
        type: "user"
      }]
    });
  }
  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`);
    var bans = JSON.parse(require("fs")
      .readFileSync("../CheckUserBot/ban.json", "utf8"));
    bans.push(args.softban.id)
    require("fs")
      .writeFileSync("../CheckUserBot/ban.json", JSON.stringify(bans))
  }
}
module.exports = SoftbanCommand;
