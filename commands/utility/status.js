const {
    Command
} = require('discord-akairo');
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
        if (require("../../helpers/getPlatform").pc()) {
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
        } else {
            var EcoTimeBefore = Date.now();
            var EcoSuccess = true;
            try {
                await economy.getBal("193053876692189184");
                var EcoTime = Date.now() - EcoTimeBefore;
            } catch (e) {
                EcoSuccess = false;
            }
            var shell = require("shelljs");
            var mem = await require("systeminformation").mem()
            var disk = await require("systeminformation").fsSize();
            shell.exec("pm2 jlist", function (code, stdout, stderr) {
                var out = JSON.parse(stdout);
                var checkuser = out.filter((o) => {
                    return o.name === "CheckUser"
                })[0];
                message.channel.send(new Discord.RichEmbed()
                    .setTitle("Status Check")
                    .setDescription("Checking status of servers")
                    .setColor(0xFFFF00)
                    .addField("Running services", ":information_source: " + out.length + " services running!")
                    .addField("Disk Space", `:information_source: Out of a total ${Math.round(disk[0].size / (1000 * 1000 * 1000))}gb, ${Math.round((disk[0].size - disk[0].used) / (1000 * 1000 * 1000))}gb are free!`)
                    .addField("CheckUser Bot", (checkuser.pm2_env.status === "online" ? `:white_check_mark: Checkuser online, consuming ${Math.round(checkuser.monit.memory / (1000*1000))}mb of ram.` : ":skull_crossbones: Checkuser dead. Status: " + checkuser.pm2_env.status))
                    .addField("Economy Server", EcoSuccess ? `:white_check_mark: Contacted economy server in ${EcoTime}ms` : `:skull_crossbones: Could not connect to ecoserver.`)
                )
            })


        }

    }
}

module.exports = SayCommand;