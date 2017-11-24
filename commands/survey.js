const {
    Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../helpers/build_permission_function");
var survey_finder = require("../helpers/survey_finder");
var util = require("../helpers/util");

class SayCommand extends Command {
    constructor() {
        super('survey', {
            aliases: ['survey', "lookupsurvey"],
            split: "none",
            userPermissions: bpf(["owner", "techies", "dons", "mods", "intern", "event_orgs"]),
            args: [{
                id: "mem",
                type: "member"
            }]
        });
    }

    exec(message, args) {
        return new Promise((resolve, reject) => {
            util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
            survey_finder.findResponse(args.mem.id).then((survey) => {
                if (!survey) {
                    message.channel.send(new Discord.RichEmbed().setTitle("That user wasn't found").setColor(0xFF0000));
                } else {
                    message.channel.send(
                        new Discord.RichEmbed()
                        .setTitle("Survey results for " + args.mem.user.username)
                        .setDescription("Completed at " + survey.timestamp ? survey.timestamp : "None given")
                        .addField("Games they play often:", survey.games_they_play ? survey.games_they_play.join(",") : "None given")
                        .addField("Suggestions for custom gamemodes:", survey.custom_gamemodes ? survey.custom_gamemodes : "None given")
                        .addField("Alternative Suggestions: ", survey.alt_suggestions ? survey.alt_suggestions : "None given")
                        .addField("Timezone: ", survey.timezone ? survey.timezone : "None given")
                        .addField("Age Range: ", survey.age ? survey.age : "None given")
                        .addField("Gender: ", survey.gender ? survey.gender : "None given")
                        .addField("Which event they enjoyed most: ", survey.preferred_event ? survey.preferred_event : "None given")
                        .addField("Other Sugggestions", survey.suggestions ? survey.suggestions : "None given")
                        .setColor(0x00FFFF)
                        .setFooter("Bot by VoidCrafted#2483")
                    )
                }
            })
        })
    }
}

module.exports = SayCommand;