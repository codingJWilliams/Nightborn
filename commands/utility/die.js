const {
    Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
const util_ = require('util');
const exec = util_.promisify(require('child_process').exec);
var util = require("../../helpers/util");

class SayCommand extends Command {
    constructor() {
        super('die', {
            aliases: ['die'],
            category: "utility",
            userPermissions: bpf(["owner", "dons", "techies"])
        });
    }

    async exec(message) {
        util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
        message.channel.send(new Discord.RichEmbed().setDescription("Byeeee").setColor(0xFFFF00));
        exec("pm2 stop NB");
        return;
    }
}

module.exports = SayCommand;