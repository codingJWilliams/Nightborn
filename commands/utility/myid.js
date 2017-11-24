const {
    Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");

class PingCommand extends Command {
    constructor() {
        super('myid', {
            aliases: ['myid'],
            category: "utility"
        });
    }

    exec(message) {
        return message.reply(' your ID is: `' + message.author.id + '`');
    }
}

module.exports = PingCommand;