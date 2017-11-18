const { Command } = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");

class PlayingCommand extends Command {
    constructor() {
        super('playing_summary', {
            aliases: ['playing_summary'],
            category: "fun",
            userPermissions: bpf(["owner", "techies", "dons", "mods", "intern", "event_orgs"])
        });
    }

    exec(message) {
        return new Promise(function(resolve, reject) {
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
            var sortable = [];
            for (var game in games) {
                sortable.push([game, games[game]]);
            }
            sortable.sort(function(a, b) {
                return 0 - (a[1] - b[1]);
            });
            var fields = [];
            var g = sortable.splice(0, 10);
            console.log(g)
            for (var i = 0; i < g.length; i++) {
                fields.push({ name: g[i][0], value: g[i][1].toString() + " playing" })
            }
            console.log(fields)
            message.channel.send({
                embed: {
                    title: "Game playing summary",
                    color: 4359924,
                    description: "In total, " + cPlaying.toString() + " members are currently playing games.",
                    fields: fields
                }
            });
            resolve();
        })
    }
}

module.exports = PlayingCommand;