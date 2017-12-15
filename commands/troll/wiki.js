const {
  Command
} = require('discord-akairo');
var Discord = require("discord.js");
var util = require("../../helpers/util");
var axios = require("axios");
var bpf = require("../../helpers/build_permission_function");
class WikipediaCommand extends Command {
  constructor() {
    super('wikipedia', {
      aliases: ['wiki', 'w'],
      userPermissions: bpf(["owner", "dons", "techies", "mods", "intern"]),
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
      var resp = await axios.get("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + encodeURIComponent(args.word))
    } catch (e) {
      // Pass
      return
    }
    console.log(resp.data.query)
    message.channel.send(Object.values(resp.data.query.pages)[0].extract.substring(0, 1990))
  }
}
module.exports = WikipediaCommand;
