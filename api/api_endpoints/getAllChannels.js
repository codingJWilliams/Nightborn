var getGuild = require("../api_helpers/getGuild");

module.exports = (req, res, client, token) => {
  res.end(JSON.stringify({
    result: getGuild(client).channels.array().map( (c) => { delete c.guild; return {
      name: c.name,
      calculatedPosition: c.calculatedPosition,
      
    }} )
  }));
}