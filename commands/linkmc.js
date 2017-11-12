const { Command } = require('discord-akairo');
var bpf = require("../helpers/build_permission_function");
var Discord = require("discord.js");
var mc = require("../helpers/minecraft");

class PingCommand extends Command {
    constructor() {
        super('linkmc', {
            aliases: ['linkmc', "mc"],
            args: [
              {
                id: "mcName",
                type: "string"
              }
            ]
        });
    }

    async exec(message, args) {
        var online = await mc.easyCall("players.online.names", []);
        if (online.success.indexOf(args.mcName) == -1) {
          message.channel.send(new Discord.RichEmbed().setTitle("Couldn't find that player").setDescription("Hey, it looks like you're not online! Make sure you've spelt your name right and you're currently logged in!").setColor(0xFF0000));
          return;
        }
        message.channel.send(new Discord.RichEmbed().setTitle("I've sent instructions to you on the minecraft server!").setThumbnail("https://emojipedia-us.s3.amazonaws.com/thumbs/160/twitter/103/white-heavy-check-mark_2705.png").setColor(0x00FF00))
    }
}

module.exports = PingCommand;