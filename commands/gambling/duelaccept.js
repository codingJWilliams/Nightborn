const {
  Command
} = require("discord-akairo");
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
var fs = require("fs");
var readFilePromise = require("../../helpers/readFilePromise");
var phonetic = require("phonetic");
var rwc = require("random-weighted-choice");
var util = require("../../helpers/util");

class DuelAcceptCommand extends Command {
  constructor() {
    super("duelaccept", {
      aliases: ["duelaccept"],
      category: "gambling",
      prefix: "$",
      args: [{
        id: "code"
      }]
    });
  }
  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var fContent = await readFilePromise("./storage/duels.json", "utf-8");
    util.log("command." + this.id, "spam", `Read file`);
    fContent = JSON.parse(fContent.toString());
    util.log("command." + this.id, "spam", `Parsed json`)
    var filtered = fContent.filter(f => {
      return (
        f.id === args.code &&
        f.reciever === message.author.id &&
        f.timeSetup + 1000 * 120 > Date.now()
      );
    });
    util.log("command." + this.id, "spam", `Found ${filtered.length} items`)
    var row = filtered.length ? filtered[0] : undefined;
    if (row == undefined) {
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle("Could not find that duel!")
        .setColor(0xff0000)
      );
      return;
    }
    var senderBal = await economy.getBal(row.initiator);
    var toBeDueledBal = await economy.getBal(row.reciever);
    util.log("command." + this.id, "spam", `Retrieved balances`)
    if (senderBal < row.amount) {
      util.log("command." + this.id, "info", `Original executor doesn't have enough souls`)
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle("They don't have enough :ghost: for that")
        .setColor(0xff0000)
      );
      return;
    } else if (toBeDueledBal < row.amount) {
      util.log("command." + this.id, "info", `To be dueled doesn't have enough souls`)
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle("You don't have enough :ghost: for that")
        .setColor(0xff0000)
      );
      return;
    }

    var chosenItem = rwc([{
        weight: 1,
        id: "sender"
      },
      {
        weight: 1,
        id: "reciever"
      }
    ]);
    util.log("command." + this.id, "spam", `Chosen ${chosenItem} to win`)
    fs.writeFileSync(
      "./storage/duels.json",
      JSON.stringify(fContent.filter(row => !(row.id === args.code)))
    );
    if (chosenItem === "sender") {
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle("Duel win")
        .setDescription(`<@${row.initiator}> has won ${row.amount}!`)
        .setColor(0x00ff00)
      );
      economy.award(row.initiator, row.amount);
      economy.take(row.reciever, row.amount);
    } else if (chosenItem === "reciever") {
      message.channel.send(
        new Discord.RichEmbed()
        .setTitle("Duel win")
        .setDescription(`<@${row.reciever}> has won ${row.amount}!`)
        .setColor(0x00ff00)
      );
      economy.take(row.initiator, row.amount);
      economy.award(row.reciever, row.amount);
    }
  }
}

module.exports = DuelAcceptCommand;