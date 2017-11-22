const { Command } = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../../helpers/build_permission_function");

class PingCommand extends Command {
    constructor() {
        super('ms', {
            aliases: ['ms'],
            prefix: ["k"],
            category: "fun",
            cooldown: 7000,
            ratelimit: 1
        });
    }

    exec(message) {
        return message.channel.send(new Discord.Attachment("./assets/kms.jpg"));
    }
}

module.exports = PingCommand;