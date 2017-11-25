function makeRoleObj(role) {
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
    roles: member.roles.array().map(r => { return makeRoleObj(r[1]) }),
    selfDeaf: member.selfDeaf,
    selfMute: member.selfMute,
    serverDeaf: member.serverDeaf,
    serverMute: member.serverMute,
    user: {
      avatarURL: member.user.avatarURL,
      bot: member.user.bot,
      createdAt: member.user.createdAt,
      createdTimestamp: member.user.createdTimestamp,
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
    var matching = nightborn.members.filter( (m) => {
      return ((req.toFind === m.user.username) || (req.toFind === (m.user.username + "#" + m.user.discriminator)) || (req.toFind === m.id));
    })
    var found = matching[0] ? matching[0] || null;
    s.emit("bot.found", {
      replyId: req.replyId,
      found: found
    })
  })
}