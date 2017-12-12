const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var Discord = require("discord.js");
var mc = require("../../helpers/minecraft");
var phonetic = require('phonetic');
var crypto = require("crypto");
var config = require("../../config.json");
var readFilePromise = require("../../helpers/readFilePromise");
var fs = require("fs");
var util = require("../../helpers/util");

function getHash(str) {
  var shasum = crypto.createHash("sha256");
  shasum.update(str);
  return shasum.digest("hex");
}
class PingCommand extends Command {
  constructor() {
    super('completelink', {
      aliases: ['completelink', "cl"],
      category: "minecraft",
      args: [{
        id: "code",
        type: "string"
      }]
    });
  }

  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var linkcodes = await global.mongo.collection("link").find({}).toArray();
    var fContent2 = await readFilePromise("./storage/alreadyLinked.json");
    var lnk = linkcodes.find((v) => {
      return v.discordID === message.author.id && v.code === args.code
    });
    if (!lnk) {
      util.log("command." + this.id, "info", `Invalid code`)
      message.channel.send("Invalid code")
      return;
    }
    if (!message.member.colorRole) {
      roleNeeded = "clanless";
    } else {
      var roleMapping = {
        "301870489301680128": "capo", // Capo
        "363891136533626890": "capo", // Intern
        "303672545335312396": "tech", // Wise guys
        "303356068334010370": "eventorg", // Event orgs
        "301870138573979658": "don", // Dons
        "312455922721095682": "owner", // Bobfather
        "362965292843925506": "don" // Consligiere
      }
      var roleNeeded = roleMapping[message.member.colorRole.id];
      if (!roleNeeded) {
        var r = {
          "359035268260691979": "lustclan",
          "359036991993544714": "envyclan",
          "359029884552609793": "gluttonyclan",
          "359031525192237067": "despairclan",
          "359037166128594965": "slothclan",
          "359031142349012992": "prideclan",
          "359030683693219840": "greedclan",
          "359032992531873794": "wrathclan"
        }
        roleNeeded = r[message.member.colorRole.id];
      }
      if (!roleNeeded) {
        roleNeeded = "clanless";
      }
      var manualOverrides = {
        "119145876542324738": "mcadmin" // Kana
      }
      if (manualOverrides[message.author.id]) {
        roleNeeded = manualOverrides[message.author.id]
      }
    }
    util.log("command." + this.id, "info", `Applying minecraft user ${lnk.mcUsername} [Discord: ${util.nameFormat(message.author)}] the pex role ${roleNeeded}`)
    await message.channel.send(
      new Discord.RichEmbed()
      .setTitle("Thanks! I'm syncing your \"" + roleNeeded + "\" role now!")
      .setThumbnail("https://crafatar.com/avatars/" + lnk.mcUsername + ".png")
      .setColor(0x00FF00));
    await mc.easyCall("players.name.send_message", [
      lnk.mcUsername,
      mc.colorCode("&9&o[PM] &9BOT &8> &7Nightborn Bot &8>> &9Applying the &8" + roleNeeded + "&9 role to you now, and giving the role in discord :D")
    ])

    await mc.easyCall("server.run_command", [
      "pex user " + lnk.mcUsername + " group set " + roleNeeded
    ])
    message.member.addRole(message.guild.roles.get("379281000926281730"));
  }
}

module.exports = PingCommand;