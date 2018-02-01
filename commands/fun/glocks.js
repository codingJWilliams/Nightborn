const {
    Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");

class GlockCommand extends Command {
    constructor() {
        super('glocks', {
            aliases: ['glocks'],
            prefix: ["2 "],
            category: "fun",
            cooldown: 7000,
            ratelimit: 1
        });
    }

    exec(message) {
        util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`);
        message.channel.send(new Discord.Attachment("./assets/2 glocks.jpg"));
        return message.channel.send(" ```We have just 3 weeks to save net neutrality. Act now.``` <https://www.battleforthenet.com/>")
    }
}

module.exports = GlockCommand;
