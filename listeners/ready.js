const {
    Listener
} = require('discord-akairo');
var apiBuilder = require("../api/apiBuilder");
var cLog = require("../helpers/log");

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    exec() {
        cLog("proccess.main", "info", "Connected to discord!")
        apiBuilder.build(this.client);
        this.client.on("message", async(message) => {
            if (message.author.bot) return;
            var staffQuotes = JSON.parse(require("fs").readFileSync("./storage/staffQuotes.json").toString());
            if (staffQuotes.filter(s => {
                    return s.trigger.toLowerCase() === message.content.toLowerCase()
                }).length > 0 && message.channel.name !== "staff") {
                var sObj = staffQuotes.filter(s => {
                    return s.trigger === message.content
                })[0];
                var sMember = message.guild.members.find("id", sObj.staffid);
                //var webhook = await message.channel.createWebhook(sMember.displayName, sMember.user.avatarURL, "More quotes pls ty");
                await message.channel.send(sObj.quotes[Math.floor(sObj.quotes.length * Math.random())] + " - " + sMember.displayName);
                cLog("services.staffQuotes", "info", "Triggered in #" + message.channel.name + " by " + message.author.username + "#" + message.author.discriminator)
                //webhook.delete();
                return;
            }
            var envy1 = [
                "envy",
                "envious",
                "jealous",
                "jealousy",
                "covet"
            ]
            var envy2 = [
                "fortune",
                "fortunate",
                "lucky",
                "luck"
            ]
            if (message.content == "fuck envy") {
                cLog("promoter.envy", "info", "Promoted envy in #" + message.channel.name + " to " + message.author.id)
                message.reply("don't hate me cuz u can't penetrate me");
                return;
            }
            if (envy1.some( (el) => message.content.toLowerCase().indexOf(el) !== -1 )) {
                cLog("promoter.envy", "info", "Promoted envy in #" + message.channel.name + " to " + message.author.id)
                message.reply("don’t covet what you can claim, join Envy today!")
            } else if (envy2.some( (el) => message.content.toLowerCase().indexOf(el) !== -1 )) {
                cLog("promoter.envy", "info", "Promoted envy in #" + message.channel.name + " to " + message.author.id)
                message.reply("fortune doesn’t favor fools :kiss:")
            }
        })
    }
}

module.exports = ReadyListener;