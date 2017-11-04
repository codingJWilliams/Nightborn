const { Command } = require('discord-akairo');

class SayCommand extends Command {
    constructor() {
        super('say', {
            aliases: ['say'],
            split: "none",
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