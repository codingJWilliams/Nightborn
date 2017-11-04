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
        if (!message.author.roles.some(r => ["The Bobfather", "Mafia Don", "Wise Guys (Mafia Techies)"].includes(r.name))) return;
        return new Promise((resolve, reject) => {
            message.delete().then(() => {
                message.channel.send(args.a)
                resolve()
            })
        })
    }
}

module.exports = SayCommand;