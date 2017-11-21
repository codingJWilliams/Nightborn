const { Listener } = require('discord-akairo');
var apiBuilder = require("../api/apiBuilder");

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    exec() {
        console.log('Ready!');
        apiBuilder.build( this.client );
        this.client.on("message", async (message) => {
            var staffQuotes = JSON.parse(require("fs").readFileSync("./storage/staffQuotes.json").toString());
            if (staffQuotes.filter( s => { return s.trigger.toLowerCase() === message.content.toLowerCase() } ).length > 0) {
                var sObj = staffQuotes.filter( s => { return s.trigger === message.content } )[0];
                var sMember = message.guild.members.find("id", sObj.staffid);
                var webhook = await message.channel.createWebhook(sMember.displayName, sMember.user.avatarURL, "More quotes pls ty");
                await webhook.send( sObj.quotes[ Math.floor(sObj.quotes.length * Math.random()) ] );
                webhook.delete();
                return;
            }
        })
    }
}

module.exports = ReadyListener;