var getGuild = require("../api_helpers/getGuild");

module.exports = (req, res, client, token) => {
  res.end(JSON.stringify({
    result: getGuild(client).roles.find("id", token.id)
  }));
}