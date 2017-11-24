var minecraft_raw = require("./minecraft_raw");
var config = require("../config.json");
var util = require("../helpers/util");

module.exports.easyCall = async function (method, args) {
  var res = await minecraft_raw.call({
    username: config.mc.username,
    password: config.mc.password,
    salt: config.mc.salt,
    name: method,
    arguments: args
  });
  return res[0];
}
module.exports.colorCode = function (s) {
  return s.replace(/\&/g, "§");
}