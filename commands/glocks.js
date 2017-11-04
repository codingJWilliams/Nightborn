const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('glocks', {
            aliases: ['glocks'],
            prefix: ["2 "]
        });
    }

    exec(message) {
        return message.channel.send('https://cdn.discordapp.com/attachments/300155035558346752/375067946889904138/fp.jpg')
    }
}

module.exports = PingCommand;