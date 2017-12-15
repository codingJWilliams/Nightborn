const {
  Command
} = require('discord-akairo');
var Discord = require("discord.js");
var util = require("../../helpers/util");
var axios = require("axios");
var bpf = require("../../helpers/build_permission_function");

class SimpleWikipediaCommand extends Command {
  constructor() {
    super('swikipedia', {
      aliases: ['swiki', 'sw'],
      userPermissions: bpf([ "owner", "dons", "techies", "mods", "intern" ]),
      category: "troll",
      args: [{
        id: "word",
        type: "string",
        match: "rest"
      }]
    });
  }

  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    await message.delete();
    try {
      var resp = await axios.get("https://simple.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + encodeURIComponent(args.word))
    } catch (e) {
      // Pass
      return
    }
    console.log(resp.data.query)
    message.channel.send(resp.data.query.values()[0].extract)


  }
}

module.exports = SimpleWikipediaCommand;
