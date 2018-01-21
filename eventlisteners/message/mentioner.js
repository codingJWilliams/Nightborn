var minecraft = require("../../helpers/minecraft");
module.exports = async(message) => {
  if (!global.mongo) return;
  var online = (await minecraft.easyCall("players.online.names", []))
    .success;
  if (!online) return;
  online.forEach(async(memName) => {
    var linkedMc = await global.mongo.collection("link")
      .findOne({
        mcUsername: memName
      });
    if (!linkedMc) return;
    var linkedMember = message.guild.members.get(linkedMc.discordID);
    var perms = message.channel.permissionsFor(linkedMember);
    if (!perms) return;
    if (!perms.has("READ_MESSAGES")) return;
    var mentionsThem = message.mentions.everyone || message.mentions.roles.some(r => linkedMember.roles.has(r.id)) || message.mentions.users.has(linkedMember.id);
    if (!mentionsThem) return;
    var t = message.author.username + ": " + (message.content.substring(0, 80).length < message.content.length ? message.content.substring(0, 80) + "..." : message.content);
    // todo make work
    t = t.replace(message.mentions.USERS_PATTERN, "[mention]")
    t = t.replace(message.mentions.ROLES_PATTERN, "[mention]")
    t = t.replace(message.mentions.CHANNELS_PATTERN, "[channel]")
    await minecraft.easyCall("server.run_command", [
      "title " + memName + " times 20 60 20"
    ])
    await minecraft.easyCall("server.run_command", [
      "title " + memName + " subtitle " + JSON.stringify({
        text: t,
        color: "aqua"
      })
    ])
    await minecraft.easyCall("server.run_command", [
      "title " + memName + " title " + JSON.stringify({
        text: "New mention in #" + message.channel.name
      })
    ])
  })
}
