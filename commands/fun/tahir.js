const { Command } = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../../helpers/build_permission_function");

class PingCommand extends Command {
    constructor() {
        super('ahir', {
            aliases: ['ahir'],
            prefix: ["t"],
            category: "fun"
        });
    }

    async exec(message) {
        var quotes = [
            "Yes me and Mia are going to go to Dubai to be Ahsan’s new roommates! Too bad for her because me and him will be fucking!",
            "I am now going to egg out !:egg: :v:️",
            ":clown: My name is peniswise the dicking clown",
            ":guardsman::skin-tone-4: Defend the Rakan Kid Raids :guardsman::skin-tone-4:",
            ":wave::rofl::punch: woah didn’t see you there broski! Oh now that I have your attention maybe you could check out my bionicle collection? That would be pretty cool beans my compatriot ! Dope catch ya later skater don’t be a hater!",
            "I love Leah, she means the world and more to me, please other egirls and especially Chad, get out of my direct messaging service.",
            "FUCK.",
            "I MISS HER SO MUCH.",
            "DUDE FUCK... LIL PEEP RIPEEP.",
            "Ok that’s all folks!",
            "Void is quite an exquisite being. He has made me a new life!",
            "Aha where is my fair maiden? Madi, come here I must appoint you a new name for example \“Exuberant Ejaculating Pinata Princess!\”",
            "Aha! Tahir Bot at your service. I am here to protect the server from the hooligans!",
            "Remember you dingleberries, if you are in need of assistance ask my friend “Tasheriff” he’s quite the person to get the job done. He said he \“Lassoes up all the e-girls!\""
        ];
        var tahir = message.guild.members.find("id", "197515842462810112");
        var webhook = await message.channel.createWebhook(tahir.displayName, tahir.user.avatarURL, "TAHIR!");
        await webhook.send(quotes[Math.round(Math.random() * quotes.length)] + " - Tahir");
        await webhook.delete("bye tahir <3");
        return;
    }
}

module.exports = PingCommand;