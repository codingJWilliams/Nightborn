const {
  Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");
class DbAllowBuilderCommand extends Command {
  constructor() {
    super('allowdb', {
      aliases: ['allowdb'],
      split: "none",
      category: "utility",
      userPermissions: bpf(["owner", "techies", "dons"]),
      args: [{
        id: "a"
      }]
    });
  }
  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    message.reply(" set up! Run: `sudo ufw allow from " + args.a + "/32 to any port 27017` in console to complete!")
  }
}
module.exports = DbAllowBuilderCommand;
