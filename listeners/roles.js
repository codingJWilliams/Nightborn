const {
  Listener
} = require('discord-akairo');
var cLog = require("../helpers/log");
class OptionalRolesListener extends Listener {
  constructor() {
    super('optionalroles', {
      emitter: 'client',
      eventName: 'messageReactionAdd'
    });
  }
  async exec(messageReaction, user) {
    console.log("React add")
    var channel = messageReaction.message.channel;
    console.log("Got channel")
    //if (channel.name !== "welcome") return;
    if (!(messageReaction.emoji == "🚨" || messageReaction.emoji == "⛔")) return;
    console.log("Passed react chek")
    console.log(messageReaction.message.id)
    if (messageReaction.message.id !== "392738180761255936") return;
    var labBunnyRole = "392736357715542017";
    var optoutRole = "392736650498932739";

    if (messageReaction.emoji === "🚨") {
      var member = await this.client.guilds.get("300155035558346752").fetchMember(user);
      await member.addRole(labBunnyRole)
    }
    else if (messageReaction.emoji === "⛔") {
      var member = await this.client.guilds.get("300155035558346752").fetchMember(user);
      await member.addRole(optoutRole)
    }
  }
}
module.exports = OptionalRolesListener;
