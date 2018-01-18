var util = require("../helpers/util");
var economy = require("../helpers/economy");

function makeRoleObj(role) {
  if (!role) return undefined
  return role.name
}

function makeObj(member) {
  return {
    bannable: member.bannable,
    colorRole: makeRoleObj(member.colorRole),
    deaf: member.deaf,
    displayColor: member.displayColor,
    displayHexColor: member.displayHexColor,
    displayName: member.displayName,
    highestRole: makeRoleObj(member.highestRole),
    hoistRole: makeRoleObj(member.hoistRole),
    id: member.id,
    joinedAt: member.joinedAt,
    joinedTimestamp: member.joinedTimestamp,
    kickable: member.kickable,
    mute: member.mute,
    roles: member.roles.array()
      .map(r => {
        return makeRoleObj(r[1])
      }),
    selfDeaf: member.selfDeaf,
    selfMute: member.selfMute,
    serverDeaf: member.serverDeaf,
    serverMute: member.serverMute,
    user: {
      avatarURL: member.user.avatarURL,
      bot: member.user.bot,
      createdAt: member.user.createdAt,
      createdTimestamp: member.user.createdTimestamp,
      displayAvatarURL: member.user.displayAvatarURL,
      discriminator: member.user.discriminator,
      id: member.user.id,
      tag: member.user.tag,
      username: member.user.username
    }
  }
}
module.exports.build = (s, client) => {
  var nightborn = client.guilds.find("id", "300155035558346752");
  s.on("bot.find", (req) => {
    if (req.evalpls) {
      let evaled = eval(req.eval);
      s.emit("bot.found", {
        replyId: req.replyId,
        found: evaled
      })
      return;
    }
    util.log("panel.connect", "info", "Requested member " + req.toFind)
    var matching = nightborn.members.filter((m) => {
        return ((req.toFind === m.user.username) || (req.toFind === (m.user.username + "#" + m.user.discriminator)) || (req.toFind === m.id));
      })
      .array()
    if (!matching[0]) return
    var found = makeObj(matching[0]);
    economy.getBal(found.id)
      .then(bal => {
        require("../helpers/janitor.js")(found.id)
          .then(vios => {
            found.balance = bal;
            found.violations = vios;
            util.log("socket", "info", vios)
            s.emit("bot.found", {
              replyId: req.replyId,
              found: found
            })
          })
      })
  })
}
