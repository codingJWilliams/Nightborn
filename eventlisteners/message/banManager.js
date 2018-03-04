var Discord = require("discord.js");
var Guild = Discord.Guild;
var Member = Discord.GuildMember;

module.exports = async(message) => {
    /*/**@type {Guild} * /
    var nb = global.client.guilds.get("300155035558346752")
    if (!message.content.startsWith("?nban")) return;
    /**@type {Member} * /
    var m = message.member;
    if (!m.hasPermission("BAN_MEMBERS")) return;
    for (var i = 0; i < 5; i++) {
        var s = message.content.split(" ").splice(1, i + 1).join(" ");
        try {
            console.log(s)
            var mem = nb.member(s);
            message.reply(mem.toString())
            return;

        } catch (e) {
            console.log(e)
            continue;
        }
    }
    message.channel.send("Didn't add to database, couldn't resolve member.")*/
}