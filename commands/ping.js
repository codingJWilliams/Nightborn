const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'hello']
        });
    }

    exec(message) {
        return message.reply('Pong!');
    }
}

module.exports = PingCommand;