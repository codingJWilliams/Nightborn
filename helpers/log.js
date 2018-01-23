var Discord = require("discord.js");
var colors = require("colors");
const mentionHook = new Discord.WebhookClient("405415421110517791", "rL5qUqA83HDoUNkrwWgyGF32fFRp7EIXvv2d4ElFgjjdA6_AiRmtprwzdfE8yrQfBorb")
var count = 0;
/**
 * Multi transport logging
 * @param {string} sectionid Human name of section of code logging from, eg: process.main, command.grestart
 * @param {string} level One of: ["critical", "error", "warn", "debug", "info", "cmd", "spam"]
 * @param {string} message What to log
 */
module.exports = function log(sectionid, level, message) {
  count = count + 1;
  var message = message.replace(require("../config.json").token, "[token]")
  var levelMap = {
    "critical": 0,
    "error": 1,
    "warn": 2,
    "debug": 3,
    "info": 4,
    "cmd": 5,
    "spam": 6
  }
  var currentLevel = levelMap["cmd"];
  if (levelMap[level] < (currentLevel + 1)) {
    var levelColors = [
      colors.red,
      colors.red,
      colors.yellow,
      colors.blue,
      colors.magenta,
      colors.cyan,
      colors.grey
    ];
    var lColor = levelColors[levelMap[level]];
    if (level === "cmd") {
      try {
        dogapi.metric.send("bot.commandDispatch", [
          1
        ], {
          type: "count",
          tags: ["command:" + sectionid.split(".")[1]]
        }, function (err, results) {
          //
        });
      } catch (e) {}
    }
    try {
      dogapi.metric.send("bot.log", [
        1
      ], {
        type: "count",
        tags: ["from:" + sectionid]
      }, function (err, results) {
        //
      });
    } catch (e) {}
    //global.dogstatsd.increment("bot.logfrom." + sectionid);
    console.log(lColor(level) + " > ".grey + sectionid.white + " >> ".grey + colors.grey(message));
  }
  try {
    global.logSocket.emit("log", {
      proc: sectionid,
      level: levelMap[level],
      message: message
    });
  } catch (e) {}
  //if (global.READY) {
    //var nb = global.client.guilds.get("300155035558346752");
    //var centrolog = nb.channels.get("405406899589349386");
    var colors2 = {
      "critical": 0xd41313,
      "error": 0xc22d33,
      "warn": 0xd9b630,
      "debug": 0x2572ac,
      "info": 0xa4336f,
      "cmd": 0x52665e,
      "spam": 0x26292e
    };
    var col = colors2[level];
    
    mentionHook.send(
      new Discord.RichEmbed()
      .setAuthor("🔧 " + sectionid)
      .setColor(col)
      .setFooter((new Date()).toLocaleString() + " - Log " + count)
      .setTitle(level.toUpperCase())
      .setDescription(message)
    )
  //}
}
