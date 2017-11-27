const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
var util = require("../../helpers/util");

class SayCommand extends Command {
  constructor() {
      super('unsudo', {
          aliases: ['unsudo'],
          category: "utility",
          userPermissions: bpf([]),
      });
  }

  async exec(message) {
      util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
      message.guild.roles.map(r => r.name === "Sudo" ? r.delete() : false);
      message.channel.send("Removed your sudo permissions.")
  }
}

module.exports = SayCommand;