const {
    Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var cLog = require("../../helpers/log");

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
            message.delete().then(() => {
                message.channel.send(args.a)
                resolve()
            })
        })
    }
}

module.exports = SayCommand;