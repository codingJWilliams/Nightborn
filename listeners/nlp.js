const {
    Listener
} = require('discord-akairo');
var cLog = require("../helpers/log");
const generateNlp = require("../helpers/generateNlp");
var messagesPerMin = 0;

class NlpListener extends Listener {
    constructor() {
        super('nlp', {
            emitter: 'client',
            eventName: 'message'
        });
    }
    exec(message) {
        if (message.channel.name != "general") return;
        messagesPerMin += 1;
        setTimeout(() => { messagesPerMin -= 1 }, 430 * 1000);
    }
}
setInterval(() => {
    if (messagesPerMin == 0) {
        /*generateNlp({
            len: 300
        }).then(x =>
            //global.client.guilds.get("300155035558346752").channels.get("300155035558346752").send(x)
        )*/
    }
}, 111 * 1000)
module.exports = NlpListener;