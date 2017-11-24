const {
    Listener
} = require('discord-akairo');
var apiBuilder = require("../api/apiBuilder");

class DaddyListener extends Listener {
    constructor() {
        super('kale_daddy', {
            emitter: 'client',
            eventName: 'message'
        });
    }

    exec(message) {
        if ((message.content.indexOf("daddy") !== -1 ) && (message.author.id === "200769142456844288")) {
            // Kale has said Daddy
            message.channel.send("stop kkplsty")
            this.client.addJob(() => {
                message.member.removeRole("380441160771960832", "Kale pls no");
            }, Date.now() + (1000 * 60))
            message.member.addRole("380441160771960832", "KALE PLS NOOO")
        }
    }
}

module.exports = DaddyListener;