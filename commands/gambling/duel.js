const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
var fs = require("fs");
var readFilePromise = require("../../helpers/readFilePromise");
var phonetic = require('phonetic');
var util = require("../../helpers/util");
class SayCommand extends Command {
  constructor() {
    super('duel', {
      aliases: ['duel'],
      prefix: "$",
      category: "gambling",
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
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var dc = global.mongo.collection("duels");
    if (args.amnt < 50) {
      util.log("command." + this.id, "info", `${util.nameFormat} used command incorrectly, passing ${args.amnt}`)
      message.channel.send(new Discord.RichEmbed()
        .setDescription("EG: `$duel @VoidCrafted#2483 10`")
        .setTitle("Invalid amount! Please use a positive number above 50")
        .setColor(0xFF0000))
      return;
    }
    var senderBal = await economy.getBal(message.author.id.toString());
    var toBeDueledBal = await economy.getBal(args.otherPerson.id.toString());
    util.log("command." + this.id, "spam", `Gotten bals.`)
    if (senderBal < args.amnt) {
      util.log("command." + this.id, "info", `Executor doesn't have enough souls`)
      message.channel.send(new Discord.RichEmbed()
        .setTitle("You don't have enough :ghost: for this")
        .setColor(0xFF0000))
      return;
    } else if (toBeDueledBal < args.amnt) {
      util.log("command." + this.id, "info", `Other person doesn't have enough souls`)
      message.channel.send(new Discord.RichEmbed()
        .setTitle("They don't have enough :ghost: for that")
        .setColor(0xFF0000))
      return;
    }
    var fContent = await readFilePromise("./storage/duels.json", "utf-8");
    util.log("command." + this.id, "spam", `Read file`)
    fContent = JSON.parse(fContent.toString());
    var d_id = phonetic.generate();
    util.log("command." + this.id, "spam", `Started with id ${d_id}`)
    message.channel.send(new Discord.RichEmbed()
      .setTitle("Duel Started")
      .setDescription("I've setup a duel with <@" + args.otherPerson.id + "> for " + args.amnt + ".")
      .addBlankField()
      .setColor(0x00FF00)
      .addField("To accept the duel:", "<@" + args.otherPerson.id + ">, type `$duelaccept " + d_id + "` to accept."))
    fContent.push({
      id: d_id,
      initiator: message.author.id,
      reciever: args.otherPerson.id,
      amount: args.amnt,
      timeSetup: Date.now()
    });
    fs.writeFileSync("./storage/duels.json", JSON.stringify(fContent));
    util.log("command." + this.id, "spam", `Written file`)
  }
}
module.exports = SayCommand;
