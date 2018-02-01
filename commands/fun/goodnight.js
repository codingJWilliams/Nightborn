const {
    Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");

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
        util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
        if (message.channel.name === "general") {
            util.log("command."+ this.id, "warn", `Blocked for ${message.author.username}#${message.author.discriminator} in ${message.channel.name}`)
            message.react("❌");
            return;
        }
        message.channel.send(" ```We have just 3 weeks to save net neutrality. Act now.``` <https://www.battleforthenet.com/>")
        return message.channel.send(new Discord.Attachment("./assets/goodnight.jpg"));
    }
}

module.exports = GoodnightCommand;
