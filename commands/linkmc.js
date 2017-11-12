const { Command } = require('discord-akairo');
var bpf = require("../helpers/build_permission_function");
var Discord = require("discord.js");
var mc = require("../helpers/minecraft");
var phonetic = require('phonetic');
var crypto = require("crypto");
var config = require("../config.json");
var readFilePromise = require("../helpers/readFilePromise");
var fs = require("fs");

function getHash(str) {
  var shasum = crypto.createHash("sha256");
  shasum.update(str);
  return shasum.digest("hex");
}
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
        var fContent = await readFilePromise("./storage/linkcodes.json");
        var fContent2 = await readFilePromise("./storage/alreadyLinked.json");
        fContent = fContent.toString();
        fContent2 = fContent2.toString();
        var linkcodes = JSON.parse(fContent);
        var alreadyLinked = JSON.parse(fContent2);
        if (alreadyLinked.indexOf(message.author.id) !== -1) {
          message.channel.send(new Discord.RichEmbed().setTitle("You've already linked your minecraft account!").setDescription("Contact VoidCrafted#2483 if this is a mistake!").setColor(0xFF0000));
          return;
        }

        var linkCode = phonetic.generate().toLowerCase();
        linkcodes.push(
          {
            mcUsername: args.mcName,
            discordID: message.author.id,
            code: linkCode
          }
        );
        fs.writeFileSync("./storage/linkcodes.json", JSON.stringify(linkcodes));

        await mc.easyCall("players.name.send_message", [
          args.mcName,
          mc.colorCode(  "&9&o[PM] &9BOT &8> &7Nightborn Bot &8>> &9Type &8nb.completelink " +  linkCode + "&9 in #bot-commands and I'll get your rank sorted out :)")
        ])
        
        message.channel.send(new Discord.RichEmbed().setTitle("I've sent instructions to you on the minecraft server!").setThumbnail("https://emojipedia-us.s3.amazonaws.com/thumbs/160/twitter/103/white-heavy-check-mark_2705.png").setColor(0x00FF00));
        
    }
}

module.exports = PingCommand;