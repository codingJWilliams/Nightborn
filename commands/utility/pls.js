const {
    Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");
var trello = require("../../helpers/trello");

class TrelloCommand extends Command {
    constructor() {
        super('pls', {
            aliases: ['pls'],
            split: "none",
            category: "utility",
            args: [{
                id: "a"
            }]
        });
    }

    async exec(message, args) {
        util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
        trello.addCard(args.a + " - " + message.author.tag, "")
        message.reply("Added :)")
    }
}

module.exports = TrelloCommand;