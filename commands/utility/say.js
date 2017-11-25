const {
    Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");

class SayCommand extends Command {
    constructor() {
        super('say', {
            aliases: ['say'],
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
        await message.delete()
        message.channel.send(args.a)
        util.log("command." + this.id, "warn", `${util.nameFormat(message.author)} made bot say ${args.a}`)
    }
}

module.exports = SayCommand;