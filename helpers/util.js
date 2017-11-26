exports.log = require("./log");
exports.nameFormat = (user) => user.id + " (" + user.username + "#" + user.discriminator + ")";
exports.db = require("./database");