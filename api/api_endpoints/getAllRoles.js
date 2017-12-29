var getGuild = require("../api_helpers/getGuild");
module.exports = (req, res, client, token) => {
  res.end(JSON.stringify({
    result: getGuild(client)
      .roles.array()
      .map((r) => {
        delete r.guild;
        return r
      })
  }));
}
