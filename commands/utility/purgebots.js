//nb.eval var q = [];  clanless.map( (m) => { q.push( () => { m.addRole(message.guild.roles.get( "name", " )) } ) } )
const {
    Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");

class PurgeCommand extends Command {
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

    async exec(message, args) {
        util.log("command.purgebots", "warn", "Executed")
        util.log("command.purgebots", "warn", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
        var purgeAmount = args.lookBack;
        try {
            await message.react("🕒");
            var fetched = await message.channel.fetchMessages({
                amount: purgeAmount
            })
            await message.channel.bulkDelete(
                fetched.filter(m => {
                    return m.author.bot
                })
            )
            await message.clearReactions()
            await message.react("✅");
            setTimeout(() => {
                message.delete()
            }, 1000)
        } catch (e) {
            var m = await message.reply(`Couldn't delete messages because of: ${error}`);
            setTimeout(() => {
                m.delete();
                message.delete()
            }, 5000)
        }
    }
}
module.exports = PurgeCommand;