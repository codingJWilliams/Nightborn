const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var Discord = require("discord.js");
var util = require("../../helpers/util");
class AddStaffResponderCommand extends Command {
  constructor() {
    super('addstaffresponder', {
      aliases: ['addstaffresponder'],
      category: "staffresponder",
      userPermissions: bpf([]),
      args: [{
        "id": "staffmention",
        "type": "member"
      }, {
        "id": "trigger",
        "type": "string"
      }]
    });
  }
  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var staffQuotes = JSON.parse(require("fs")
      .readFileSync("./storage/staffQuotes.json")
      .toString());
    staffQuotes.push({
      staffid: args.staffmention.id,
      trigger: args.trigger,
      quotes: []
    })
    require("fs")
      .writeFileSync("./storage/staffQuotes.json", JSON.stringify(staffQuotes, null, 2));
    message.channel.send(new Discord.RichEmbed()
      .setDescription("**Added responder! <@" + args.staffmention.id + "> can now use `nb.addquote Blah blah` to add a quote!**")
      .setColor(0x00FF00))
  }
}
module.exports = AddStaffResponderCommand;
