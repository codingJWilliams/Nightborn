const { Command } = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var economy = require("../../helpers/economy");
var Discord = require("discord.js");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class SayCommand extends Command {
    constructor() {
        super('restart', {
            aliases: ['restart', "rs"],
            category: "utility",
            userPermissions: bpf(["techies"])
        });
    }

    async exec(message) {
      var { stdout, stderr } = await exec("ls");
      message.reply(stdout);
      return;
    }
}

module.exports = SayCommand;