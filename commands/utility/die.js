const {
    Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class SayCommand extends Command {
    constructor() {
        super('die', {
            aliases: ['die'],
            category: "utility",
            userPermissions: bpf(["owner", "dons", "techies"])
        });
    }

    async exec(message) {
        message.channel.send(new Discord.RichEmbed().setDescription("Byeeee").setColor(0xFFFF00));
        exec("pm2 stop NB");
        return;
    }
}

module.exports = SayCommand;