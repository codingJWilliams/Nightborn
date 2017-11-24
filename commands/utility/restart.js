const {
    Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
var cLog = require("../../helpers/log");

class SayCommand extends Command {
    constructor() {
        super('restart', {
            aliases: ['restart', "rs"],
            category: "utility",
            userPermissions: bpf(["techies"])
        });
    }

    async exec(message) {
        message.channel.send(new Discord.RichEmbed().setDescription(":alarm_clock: Restarting. Brb").setColor(0xFFFF00));
        exec("pm2 restart NB");
        return;
    }
}

module.exports = SayCommand;