var getGuild = require("../api_helpers/getGuild");

module.exports = (req, res, client, token) => {
  var m = getGuild(client).members.find("id", token.id);
  var mO = {
    deaf: m.deaf,
    displayColor: m.displayColor,
    displayName: m.displayName,
    highestRole: m.highestRole.id,
    hoistRole: m.hoistRole.id,
    id: m.id,
    joinedAt: m.joinedAt,
    joinedTimestamp: m.joinedTimestamp,
    lastMessageID: m.lastMessageID,
    nickname: m.nickname,
    selfDeaf: m.selfDeaf,
    selfMute: m.selfMute,
    serverDeaf: m.serverDeaf,
    serverMute: m.serverMute,
    speaking: m.speaking,
    user: {
      avatar: m.user.avatar,
      avatarURL: m.user.avatarURL,
      bot: m.user.bot,
      createdAt: m.user.createdAt,
      createdTimestamp: m.user.createdTimestamp,
      defaultAvatarURL: m.user.defaultAvatarURL,
      discriminator: m.user.discriminator,
      displayAvatarURL: m.user.displayAvatarURL,
      id: m.user.id,
      username: m.user.username
    }
  };
  res.end(JSON.stringify({
    result: mO
  }), null, 4);
}