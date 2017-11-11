const { Command } = require('discord-akairo');
var bpf = require("../helpers/build_permission_function");
var economy = require("../helpers/economy");
var Discord = require("discord.js");
var fs = require("fs");
var readFilePromise = require("../helpers/readFilePromise");
var phonetic = require('phonetic');
var rwc = require('random-weighted-choice');

class SayCommand extends Command {
    constructor() {
        super('duelaccept', {
            aliases: ['duelaccept', 'accept'],
            prefix: "$",
            args: [{
                id: "code",
            }]
        });
    }

    async exec(message, args) {
        var fContent = await readFilePromise("./storage/duels.json", "utf-8");
        fContent = JSON.parse(fContent.toString());
        var filtered = fContent.filter( (f) => {
            return f.id === args.code && f.reciever === message.author.id && (f.timeSetup + (1000 * 30)) > Date.now();
        })
        var row = filtered.length ? filtered[0] : undefined;
        if (row == undefined) {
            message.channel.send(new Discord.RichEmbed().setTitle("Could not find that duel!").setColor(0xFF0000));
            return;
        }
        var senderBal = await economy.getBal(row.initiator);
        var toBeDueledBal = await economy.getBal(row.reciever);

        if (senderBal < row.amount) {
            message.channel.send(new Discord.RichEmbed().setTitle("They don't have enough :ghost: for that").setColor(0xFF0000))
            return;
        } else if (toBeDueledBal < row.amount) {
            message.channel.send(new Discord.RichEmbed().setTitle("You don't have enough :ghost: for that").setColor(0xFF0000))
            return;
        }

        var chosenItem = rwc([{weight: 1, id: "sender"}, {weight: 1, id: "reciever"}]);
        console.log(chosenItem)
        fs.writeFileSync( "./storage/duels.json", JSON.stringify(fContent.filter( (row) => !(row.id === args.code) )) );
    }
}

module.exports = SayCommand;