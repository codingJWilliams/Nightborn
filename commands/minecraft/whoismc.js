const {
    Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var Discord = require("discord.js");
var mc = require("../../helpers/minecraft");
var phonetic = require('phonetic');
var crypto = require("crypto");
var config = require("../../config.json");
var readFilePromise = require("../../helpers/readFilePromise");
var fs = require("fs");
var util = require("../../helpers/util");

class PingCommand extends Command {
    constructor() {
        super('whoismc', {
            aliases: ['whoismc'],
            category: "minecraft",
            args: [{
                id: "mcName",
                type: "string"
            }]
        });
    }
    async exec(message, args) {
        var person = await global.mongo.findOne({
            mcUsername: args.mcName
        });
        if (!person) return message.channel.send(new Discord.RichEmbed().setTitle("I couldn't find that username. Make sure it's got capitals in the right place"))
        message.channel.send(
            new Discord.RichEmbed()
            .setTitle("Got it!")
            .setColor(0x00FF00)
            .setDescription(args.mcName + " is <@" + person.discord + ">")
        )
    }
}
module.exports = PingCommand;