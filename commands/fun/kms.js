const {
    Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");

class KmsCommand extends Command {
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
        util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
        if (message.channel.name === "general") {
            util.log("command."+ this.id, "warn", `Blocked for ${message.author.username}#${message.author.discriminator} in ${message.channel.name}`)
            message.react("❌");
            return;
        }
        return message.channel.send(new Discord.Attachment("./assets/kms.jpg"));
    }
}

module.exports = KmsCommand;