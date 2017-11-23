//nb.eval var q = [];  clanless.map( (m) => { q.push( () => { m.addRole(message.guild.roles.get( "name", " )) } ) } )
const {
    Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../helpers/build_permission_function");

class PlayingCommand extends Command {
    constructor() {
        super('random_assign_clanless', {
            aliases: ['random_assign_clanless']
        });
    }

    exec(message) {
        return new Promise(function (resolve, reject) {
            if (!message.member.roles.has("373819062200958987")) {
                message.channel.send(new Discord.RichEmbed()
                    .setTitle("No permission")
                    .setDescription("You need to have the @Staff tag to do this")
                    .setColor(0xFF0000)
                )
                resolve();
                return;
            }
            var clanless = message.guild.members.filter((m) => {
                return (m.roles.has("320199117467025418"))
            });
            var q = [];
            clanless.map((m) => {
                q.push(() => {
                    m.addRole(randomRolePls(), "ClanAssignBot").catch(console.error)
                    console.log("Assigned " + m.user.username + "#" + m.user.discriminator + " the clanrole")
                    m.removeRole("320199117467025418", "Reasons :P").catch(console.error)
                    console.log("Removed the clanless role from " + m.user.username + "#" + m.user.discriminator + "")
                })
            })
            message.channel.send(new Discord.RichEmbed()
                .setColor(0xFF7F50)
                .setTitle("Starting to assign " + q.length.toString() + " members a random clan.")
                .setDescription(":timer:")
                .setFooter("Bot by VoidCrafted#2483")
            )
            var l = q.length;
            var s = setInterval(
                () => {
                    if (q.length !== 0) {
                        var f = q.pop()
                        f();
                        console.info("Ended job " + q.length)
                    } else {
                        clearInterval(s);
                        message.channel.send(new Discord.RichEmbed()
                            .setColor(0x32CD32)
                            .setTitle("Assigned " + l.toString() + " members a random clan.")
                            .setDescription(":white_check_mark:")
                            .setFooter("Bot by VoidCrafted#2483")
                        );
                        resolve()
                    }
                },
                250
            );
        })
    }
}

function randomRolePls() {
    var clans = [
        "359029884552609793",
        "359031525192237067",
        "359037166128594965",
        "359032992531873794",
        "359030683693219840",
        "359036991993544714",
        "359031142349012992"
    ];
    var d = clans[Math.floor(Math.random() * clans.length)];
    if (!d) d = "359035268260691979";
    return d
}
module.exports = PlayingCommand;