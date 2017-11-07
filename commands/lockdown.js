const { Command } = require('discord-akairo');
var Discord = require("discord.js");

class PlayingCommand extends Command {
    constructor() {
        super('mos_tags', {
            aliases: ['mos_tags']
        });
    }

    exec(message) {
        return new Promise(function(resolve, reject) {
            var public_channel_names = [
                "welcome",
                "announcements",
                "events-announcements",
                "feedback-and-suggestions",
                "donate",
                "general",
                "general-jr",
                "meet-me",
                "bot-commands",
                "starboard",
                "memes-and-media",
                "roast-arena"
            ]
        })
    }
}

module.exports = PlayingCommand;