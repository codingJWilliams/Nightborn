const {
    Command
} = require('discord-akairo');
var bpf = require("../helpers/build_permission_function");
var Discord = require("discord.js");
var moment = require('relative-time-parser');
var cLog = require("../../helpers/log");

function buildWarnDM(rulebroken, member, moderator, actionmessage, punishmentdetail) {
    return new Discord.RichEmbed()
        .setTitle(actionmessage)
        .setColor(0xFF0000)
        .setAuthor(moderator.username, moderator.avatarURL)
        .addBlankField()
        .addField("Rule Broken", rulebroken.toString() + ": " + require("../storage/rules.json")[rulebroken.toString()])
        .addField("Punishment Detail", punishmentdetail)
}
class SayCommand extends Command {
    constructor() {
        super('punish', {
            aliases: ['punish'],
            userPermissions: bpf(["owner", "techies", "dons", "mods", "intern"]),
            args: [{
                id: "toPunish",
                type: "member",
                description: "The member you want to punish"
            }, {
                id: "rulebroken",
                type: "number",
                description: "The rule number that was broken"
            }, {
                id: "punishment",
                type: "string",
                description: "The type of punishment to give. One of: warn, mute, jail, kick, ban"
            }, {
                id: "lengthp",
                type: "string",
                default: "NOTGIVEN"
            }]
        });
    }

    async exec(message, args) {
        if (!args.toPunish || !args.rulebroken || !args.punishment) {
            message.channel.send("See <#373334470159237120> for usage.");
            return;
        };
        var rules = require("../storage/rules.json");
        if (!rules[args.rulebroken.toString()]) {
            message.channel.send("Invalid rule. See <#373334470159237120>.");
            return;
        }
        if (!(["warn", "mute", "jail", "kick", "ban"].includes(args.punishment))) {
            message.channel.send("Invalid punishment. See <#373334470159237120>.");
            return;
        };
        var modlog = message.guild.channels.find("id", "380284981773336576");

        if (args.punishment === "warn") {
            args.toPunish.send(
                buildWarnDM(args.rulebroken, args.toPunish, message.author, "You were warned in Nightborn Estate", "This is only a warning, however if you continue breaking rules further punishments may be given.")
            );
            message.channel.send("**Warned :thumbsup: **");
            modlog.send(
                new Discord.RichEmbed().setTitle(`${message.author.username}#${message.author.discriminator} warned ${args.toPunish.user.username}#${args.toPunish.user.discriminator}.`).setDescription("Rule broken: " + args.rulebroken.toString() + ".").setColor(0xFF0000)
            )
        } else if (args.punishment === "mute") {
            var mutedrole = message.guild.roles.find("id", "339657374271012875");
            if (args.lengthp === "NOTGIVEN") {
                message.channel.send("You must include a length. See <#373334470159237120>");
                return;
            };
            var unban_epoch = moment().relativeTime('+' + args.lengthp).valueOf();
            this.client.addJob(() => {
                args.toPunish.removeRole(mutedrole);
            }, unban_epoch)
            args.toPunish.addRole(mutedrole);
            args.toPunish.send(
                buildWarnDM(args.rulebroken, args.toPunish, message.author, "You were muted in Nightborn Estate", "You were muted for " + args.lengthp + ".")
            );
            message.channel.send("**Muted :thumbsup: **");
            modlog.send(
                new Discord.RichEmbed().setTitle(`${message.author.username}#${message.author.discriminator} muted ${args.toPunish.user.username}#${args.toPunish.user.discriminator}.`).setDescription("Rule broken: " + args.rulebroken.toString() + ". Time muted: " + args.lengthp).setColor(0xFF0000)
            )
        } else if (args.punishment === "jail") {
            var mutedrole = message.guild.roles.find("id", "380441160771960832");
            if (args.lengthp === "NOTGIVEN") {
                message.channel.send("You must include a length. See <#373334470159237120>");
                return;
            };
            var unban_epoch = moment().relativeTime('+' + args.lengthp).valueOf();
            this.client.addJob(() => {
                args.toPunish.removeRole(mutedrole);
            }, unban_epoch)
            args.toPunish.addRole(mutedrole);
            args.toPunish.send(
                buildWarnDM(args.rulebroken, args.toPunish, message.author, "You were jailed in Nightborn Estate", "You were jailed for " + args.lengthp + ".")
            );
            message.channel.send("**Jailed :thumbsup: **");
            modlog.send(
                new Discord.RichEmbed().setTitle(`${message.author.username}#${message.author.discriminator} jailed ${args.toPunish.user.username}#${args.toPunish.user.discriminator}.`).setDescription("Rule broken: " + args.rulebroken.toString() + ". Time jailed: " + args.lengthp).setColor(0xFF0000)
            )
        }

        return;
    }
}

module.exports = SayCommand;