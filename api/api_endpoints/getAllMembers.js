var getGuild = require("../api_helpers/getGuild");
module.exports = (req, res, client, token) => {
  res.end(JSON.stringify({
    result: getGuild(client)
      .members.array()
      .map((r) => {
        return {
          user: {
            id: r.user.id,
            username: r.user.username,
            discriminator: r.user.discriminator,
            avatarURL: r.user.avatarURL,
            bot: r.user.bot,
          },
          _roles: r._roles,
          serverDeaf: r.serverDeaf,
          serverMute: r.serverMute,
          selfMute: r.selfMute,
          selfDeaf: r.selfDeaf,
          voiceSessionID: r.voiceSessionID,
          voiceChannelID: r.voiceChannelID,
          speaking: r.speaking,
          nickname: r.nickname,
          joinedTimestamp: r.joinedTimestamp
        }
      })
  }));
}
