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
        super('grestart', {
            aliases: ['grestart', "grs"],
            category: "utility",
            userPermissions: bpf(["techies"])
        });
    }

    async exec(message) {
        util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
        var {
            stdout,
            stderr
        } = await exec("git pull");
        message.channel.send("```\nGit output:\n" + stdout + "```");
        message.channel.send(new Discord.RichEmbed().setDescription(":alarm_clock: Pulled, restarting now. Brb").setColor(0xFFFF00));
        message.channel.send(" ```We have just 3 weeks to save net neutrality. Act now.``` <https://www.battleforthenet.com/>")
        exec("pm2 restart NB");
        return;
    }
}

module.exports = SayCommand;
