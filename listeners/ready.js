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
            if (message.channel.id === "359445403747483658") return;
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
            
        })
    }
}

module.exports = ReadyListener;