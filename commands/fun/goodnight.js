const {
    Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../../helpers/build_permission_function");
var utilities = require("../../helpers/utilities");

class GoodnightCommand extends Command {
    constructor() {
        super('oodnight', {
            aliases: ['oodnight'],
            prefix: ["g"],
            category: "fun",
            cooldown: 7000,
            ratelimit: 1
        });
    }

    exec(message) {
        if (message.channel.name === "general") {
            message.react("❌");
            return;
        }
        return message.channel.send(new Discord.Attachment("./assets/goodnight.jpg"));
    }
}

module.exports = GoodnightCommand;