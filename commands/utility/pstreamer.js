const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
var util = require("../../helpers/util");
class PStreamerCommand extends Command {
  constructor() {
    super('pstreamer', {
      aliases: ['pstreamer'],
      userPermissions: (msg) => (msg.author.id === "101493361067704320") || (msg.author.id === "173378944375062528") || bpf(["owner", "dons", "techies"])(msg),
      category: "utility",
      args: [ {
          id: "action",
          type: "string" }, {
          id: "person",
          type: "memberMention" } ]
    });
  }
  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`);
    var streamerRole = "379992083697762315";
    if (args.action === "add") {
      args.person.addRole(streamerRole);
      message.channel.send(new Discord.RichEmbed().setColor(0x4286f4).setDescription("**:white_check_mark: Successfully added Premium Streamer role to <@" + args.person.id + ">**"));
    } else {
      args.person.removeRole(streamerRole);
      message.channel.send(new Discord.RichEmbed().setColor(0x4286f4).setDescription("**:white_check_mark: Successfully removed Premium Streamer role from <@" + args.person.id + ">**"));
    }
  }
}
module.exports = PStreamerCommand;
