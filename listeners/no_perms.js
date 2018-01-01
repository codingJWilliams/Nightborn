const {
  Listener
} = require('discord-akairo');
var Discord = require("discord.js");
var util = require("../helpers/util");
class CommandBlockedListener extends Listener {
  constructor() {
    super('commandBlocked', {
      emitter: 'commandHandler',
      eventName: 'commandBlocked'
    });
  }
  exec(message, command, reason) {
    util.log("services.permissionsManager", "warn", `User ${message.author.username}#${message.author.discriminator} attempted to use ${command.id}`);
    //global.dogstatsd.increment("bot.commandblocked.permission");
    if (reason === "userPermissions") {
      if (message.channel.id === "300155035558346752") {
        message.author.createDM()
          .then((dm) => {
            sendBlockedMessage(dm, command, message)
          })
      } else {
        sendBlockedMessage(message.channel, command, message)
      }
    }
  }
}

function sendBlockedMessage(channel, command, message) {
  channel.send(new Discord.RichEmbed()
    .setTitle("Command blocked.")
    .setDescription("Your command in #" + message.channel.name + " was blocked as you do not have access to that command.")
    .setColor(0xFF0000)
    .addField("Is this in error?", "If so, contact @VoidCrafted#2483 for help.")
    .setFooter("Bot by VoidCrafted#2483"))
}
module.exports = CommandBlockedListener;
