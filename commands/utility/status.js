const { Command } = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");

class SayCommand extends Command {
    constructor() {
        super('status', {
            aliases: ['status'],
            category: "utility",
            userPermissions: bpf(["techies"]),
        });
    }

    async exec(message) {
        var EcoTimeBefore = Date.now();
        var EcoSuccess = true;
        try {
            await economy.getBal("193053876692189184");
            var EcoTime = Date.now() - EcoTimeBefore;
        } catch (e) {
            EcoSuccess = false;
        }
        message.channel.send(new Discord.RichEmbed()
        .setTitle("Status Check")
        .setDescription("Checking status of servers")
        .setColor(0xFFFF00)
        .addField("Economy Server", EcoSuccess ? `:white_check_mark: Contacted economy server in ${EcoTime}ms` : `:skull_crossbones: Could not connect to ecoserver.`)
        )
    }
}

module.exports = SayCommand;