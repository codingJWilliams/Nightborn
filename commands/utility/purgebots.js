//nb.eval var q = [];  clanless.map( (m) => { q.push( () => { m.addRole(message.guild.roles.get( "name", " )) } ) } )
const { Command } = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../../helpers/build_permission_function");

class PlayingCommand extends Command {
    constructor() {
        super('purgebots', {
            aliases: ['purgebots'],
            userPermissions: bpf(["owner", "techies", "dons", "mods", "intern"]),
            category: "utility",
            args: [{
                id: "lookBack",
                type: "number",
                default: 100
            }]
        });
    }

    exec(message, args) {
        return new Promise(function(resolve, reject) {
            var purgeAmount = args.lookBack;
            message.react("🕒");
            message.channel.fetchMessages({ amount: purgeAmount }).then(fetched => {
                message.channel.bulkDelete(
                        fetched.filter(m => { return m.author.bot })
                    )
                    .then(() => {
                        message.clearReactions().then(() => {
                            message.react("✅");
                            setTimeout(() => { message.delete() }, 1000)
                        })
                    })
                    .catch(
                        error => {
                            message.reply(`Couldn't delete messages because of: ${error}`)
                                .then(m => {
                                    setTimeout(() => {
                                        m.delete();
                                        message.delete()
                                    }, 5000)
                                })
                        })

            })
        })
    }
}

module.exports = PlayingCommand;