var sha256 = require("sha256");
var request = require("request");
var axios = require("axios");
var crypto = require("crypto");

function getKey(username, methodNameOrSourceName, password, salt) {
	var shasum = crypto.createHash("sha256");
	shasum.update(username + methodNameOrSourceName + password + salt);
	return shasum.digest("hex");
}

module.exports.call = async function call(obj) {
  obj.key = getKey(obj.username, obj.name, obj.password, obj.salt);
  delete obj.password;
  delete obj.salt
  var res = await axios.get("http://mc.nightborn.estate:25565/api/2/call?json=" + encodeURIComponent(JSON.stringify(obj)));
  return res.data;
}
