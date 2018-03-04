var gp = require("../../helpers/getPlatform");
var Discord = require("discord.js");
const fs = require("fs");


module.exports = (message) => {
    //if ([
    //    "staff", "admin", "staff-pings", "social-ops", "botnet", "checkuser-logs", "bot-log",
    //].some(a => message.channel.name == a)) return;
    if (message.channel.name !== "general") return;
    message.content.split(".").forEach(shard => {
        if (shard.split("")[0] == " ") shard = shard.substring(1);
        if (!shard) return;
        fs.appendFileSync("./storage/nlp-training.massiveassfile.txt", shard + "\n")
        console.log("written " + shard)
    })
}