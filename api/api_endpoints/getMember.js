var getGuild = require("../api_helpers/getGuild");

module.exports = (req, res, client, token) => {
  getGuild(client)
}