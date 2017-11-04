const { Command } = require('discord-akairo');
var Discord = require("discord.js");
var setFlag = require("../helpers/setFlag");

class SayCommand extends Command {
    constructor() {
        super('flag', {
            aliases: ['flag'],
            args: [{
                id: "flagName",
                type: "string"
            }, {
                id: "val",
                type: "string"
            }]
        });
    }

    exec(message, args) {
        return new Promise((resolve, reject) => {
            setFlag(args.flagName, { y: true, yes: true, true: true, n: false, no: false, false: false }[args.val]);
            message.reply(new Discord.RichEmbed()
                .setTitle("Changed flag")
                .setDescription(`\`${args.flagName}\` is set to \`${{y: true, yes: true, true: true, n: false, no: false, false: false}[args.val]}\``)
                .setImage("https://emojipedia-us.s3.amazonaws.com/thumbs/160/twitter/103/white-heavy-check-mark_2705.png");
            )
        })
    }
}

module.exports = SayCommand;