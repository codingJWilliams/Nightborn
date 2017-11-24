const {
    Listener
} = require('discord-akairo');
var apiBuilder = require("../api/apiBuilder");


function isBad(str) {
    return [
        "egirl",
        "eboy",
        "daddy"
    ].some( (word) => str.indexOf(word) !== -1)
}


class DaddyListener extends Listener {
    constructor() {
        super('kale_daddy', {
            emitter: 'client',
            eventName: 'message'
        });
    }

    exec(message) {
        if (isBad(message.content)) {
            // Kale has said Daddy
            message.channel.send("Jailed for 1 minute!")
            this.client.addJob(() => {
                message.member.removeRole("380441160771960832", "Kale pls no");
            }, Date.now() + (1000 * 60))
            message.member.addRole("380441160771960832", "KALE PLS NOOO")
        }
    }
}

module.exports = DaddyListener;