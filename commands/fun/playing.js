const {
    Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");

class PlayingCommand extends Command {
    constructor() {
        super('playing_summary', {
            aliases: ['playing_summary'],
            category: "fun",
            userPermissions: bpf(["owner", "techies", "dons", "mods", "intern", "event_orgs"])
        });
    }

    exec(message) {
        util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
        var games = {};
        var cPlaying = 0;
        message.guild.members.map((m) => {
            if (m.presence.game === null) return;
            cPlaying++;
            if (games.hasOwnProperty(m.presence.game.name)) {
                games[m.presence.game.name] = games[m.presence.game.name] + 1
            } else {
                games[m.presence.game.name] = 1;
            }
        })
        util.log("command." + this.id, "spam", `Built up dictionary`)
        var sortable = [];
        for (var game in games) {
            sortable.push([game, games[game]]);
        }
        util.log("command." + this.id, "spam", `Converted dictionary to array`)
        sortable.sort(function (a, b) {
            return 0 - (a[1] - b[1]);
        });
        util.log("command." + this.id, "spam", `Sorted array`)
        var fields = [];
        var g = sortable.splice(0, 10);
        util.log("command." + this.id, "spam", `Sliced first 10 elements`)
        for (var i = 0; i < g.length; i++) {
            fields.push({
                name: g[i][0],
                value: g[i][1].toString() + " playing"
            })
        }
        util.log("command." + this.id, "spam", `Built embed`)
        message.channel.send({
            embed: {
                title: "Game playing summary",
                color: 4359924,
                description: "In total, " + cPlaying.toString() + " members are currently playing games.",
                fields: fields
            }
        });
    }
}

module.exports = PlayingCommand;