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
            var val;
            if (["y", "yes", "true"].indexOf(args.val) !== -1) val = true;
            if (["n", "no", "false"].indexOf(args.val) !== -1) val = false;
            setFlag(args.flagName, val);
            message.reply(new Discord.RichEmbed()
                .setTitle("Changed flag")
                .setDescription(`\`${args.flagName}\` is set to \`${val}\``)
                .setImage("https://emojipedia-us.s3.amazonaws.com/thumbs/160/twitter/103/white-heavy-check-mark_2705.png")
            )
        })
    }
}

module.exports = SayCommand;