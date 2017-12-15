var minecraft_raw = require("./minecraft_raw");
var config = require("../config.json");
var util = require("../helpers/util");
/**
 * Calls a method from http://mcjsonapi.org
 * @param {string} method The method to call, from http://mcjsonapi.org
 * @param {Array|undefined} args The arguments, if any.
 */
module.exports.easyCall = async function (method, args) {
  if (args == undefined) args = [];
  args = args ? args : []
  var res = await minecraft_raw.call({
    username: config.mc.username,
    password: config.mc.password,
    salt: config.mc.salt,
    name: method,
    arguments: args
  });
  return res[0];
}
/**
 * Takes a string, like "&cHello" and replaces & with § so colours show in Minecraft chat
 * @param {string} s The string to escape
 * @returns {string} The escaped string
 */
module.exports.colorCode = function (s) {
  return s.replace(/\&/g, "§");
}
