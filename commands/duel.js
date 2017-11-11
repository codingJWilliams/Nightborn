const { Command } = require('discord-akairo');
var bpf = require("../helpers/build_permission_function");
var economy = require("../helpers/economy");
var Discord = require("discord.js");
var fs = require("fs");

class SayCommand extends Command {
    constructor() {
        super('duel', {
            aliases: ['duel'],
            args: [{
                id: "otherPerson",
                type: "member"
            }, {
                id: "amnt",
                type: "number"
            }]
        });
    }

    async exec(message, args) {
        var senderBal = await economy.getBal(message.author.id.toString());
        var toBeDueledBal = await economy.getBal(args.otherPerson.id.toString());
        if (senderBal < args.amnt) {
            message.channel.send(new Discord.RichEmbed()
                .setTitle("You don't have enough :ghost: for this")
                .setColor(0xFF0000)
            )
            return;
        } else if (toBeDueledBal < args.amnt) {
            message.channel.send(new Discord.RichEmbed()
                .setTitle("They don't have enough :ghost: for that")
                .setColor(0xFF0000)
            )
            return;
        }

        message.channel.send(new Discord.RichEmbed()
        .setTitle("Duel Started")
        .setDescription("I've setup a duel with <@" + args.otherPerson.id + ">.")
        .addBlankField()
        .addField("To accept the duel:", "Type $duelaccept " + d_id);
        )

    }
}

module.exports = SayCommand;