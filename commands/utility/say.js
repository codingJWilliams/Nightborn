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

    exec(message, args) {
        return new Promise((resolve, reject) => {
            util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
            message.delete().then(() => {
                message.channel.send(args.a)
                resolve()
            })
        })
    }
}

module.exports = SayCommand;