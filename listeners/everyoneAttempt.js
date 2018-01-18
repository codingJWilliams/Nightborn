var everyone = "@everyone";
const {
  Listener
} = require('discord-akairo');
var Discord = require("discord.js")
var cLog = require("../helpers/log");
class EveryoneListener extends Listener {
  constructor() {
    super('everywan', {
      emitter: 'client',
      eventName: 'message'
    });
  }
  /**
   * 
   * @param {Discord.Message} message The message that was sent
   */
  async exec(message) {
    if (message.content.indexOf(everyone) !== 0) return;
    var personsPerms = message.channel.permissionsFor(message.member);
    if (!personsPerms) {
      message.reply("You don't have permission to mention everyone. Please don't try. *Kicked*")
      setTimeout(() => message.member.kick(), 2000)
    }
    if (!personsPerms.hasPermission("MENTION_EVERYONE")) {
      message.reply("You don't have permission to mention everyone. Please don't try. *Kicked*")
      setTimeout(() => message.member.kick(), 2000)
    }
  }
}
module.exports = EveryoneListener;
