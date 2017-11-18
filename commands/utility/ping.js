const { Command } = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");

class PingCommand extends Command {
    constructor() {
        super('ping', {
            category: "utility",
            aliases: ['ping', 'hello']
        });
    }

    exec(message) {
        return message.reply('Pong!');
    }
}

module.exports = PingCommand;