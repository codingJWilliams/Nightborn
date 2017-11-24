const {
    Command
} = require('discord-akairo');
var Discord = require("discord.js");
var si = require("systeminformation");
var bpf = require("../../helpers/build_permission_function");
var utilities = require("../../helpers/utilities");
class PlayingCommand extends Command {
    constructor() {
        super('vpsinfo', {
            aliases: ['vpsinfo', 'vps', "host"],
            category: "utility",
            userPermissions: bpf(["owner", "techies"])
        });
    }

    exec(message) {
        return new Promise(function (resolve, reject) {
            Promise.all([
                    si.cpu(),
                    si.cpuCurrentspeed(),
                    si.mem(),
                    si.fsSize()
                ])
                .then(results => {
                    var cpu = results[0],
                        cpuCurrentspeed = results[1],
                        mem = results[2],
                        fsSize = results[3];
                    var embed = new Discord.RichEmbed()
                        .setTitle("System Information")
                        .setFooter("Bot by VoidCrafted#2483")
                        .setColor(0x00FF00)
                        .setDescription("The bot is running on: " + (mem.total > 6000000000 ? "Void's Laptop" : "Eddie's VPS"))
                        .addField("CPU Info", `
CPU Name: ${cpu.manufacturer} ${cpu.brand} (${cpu.speed}ghz)
Cores: ${cpu.cores}
                        `)
                        .addField("CPU Speed", `
CPU is currently running at ${cpuCurrentspeed.avg}ghz, on all cores
                        `)
                        .addField("Memory", `
System has ${Math.round(mem.total / (1000 * 1000))}mb of memory total.
Currently, ${Math.round((mem.used / mem.total) * 100)}% of the memory is used (${Math.round(mem.used / (1000 * 1000))}mb)
                        `);
                    message.channel.send(embed)
                })
        })
    }
}

module.exports = PlayingCommand;