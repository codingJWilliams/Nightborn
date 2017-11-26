const {
    Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../helpers/build_permission_function");
var survey_finder = require("../helpers/survey_finder");
var util = require("../helpers/util");

class GoCommand extends Command {
    constructor() {
        super('go', {
            aliases: ['go', "gotovc"],
            split: "none",
            userPermissions: (message => { return message.author.id === "169979133470703617" || (bpf(["owner", "techies", "dons", "mods", "intern", "event_orgs"]))(message) } ),
            args: [{
                id: "ch",
                type: "voiceChannel"
            }]
        });
    }

    async exec(message, args) {
        util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
        if (args.ch.id == "362911608864768000") { message.channel.send("That's the staff vc D:"); return; }
        await message.member.setVoiceChannel(args.ch)
        message.channel.send("<:botSuccessDONOTREMOVE:382238707757088771>");
    }
}

module.exports = GoCommand;
