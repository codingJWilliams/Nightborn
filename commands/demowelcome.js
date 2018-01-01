const {
  Command
} = require('discord-akairo');
var Discord = require("discord.js");
var bpf = require("../helpers/build_permission_function");
var util = require("../helpers/util");
class WelcomeCommand extends Command {
  constructor() {
    super('demowelcome', {
      aliases: ['demowelcome', "demowhalecum"]
    });
  }
  async exec(message, args) {
    util.log("command." + this.id, "cmd", `Executed by ${message.author.username}#${message.author.discriminator}, with message content ${message.content}`)
    var embed = new Discord.RichEmbed();
    embed.setColor(0x64F58D)
      .setTitle("Hey there, and welcome to Nightborn!")
      .setDescription("Even though it can be pretty overwhelming to join a big server like ours, we just wanted to let you in on a couple of things that we find important! To start off:")
      .addField("Roles", `\n+ _**The Godfather**_: The owner of the server! Have any business, partnership, or team inquires? Feel free to contact him!
+ **Mafia Don**: The admins of the server. They make sure that all of our events run smoothly, reports get taken care of, and takes care of business deals when owner is away.
+ **Mafia Capo**: These are the moderators of the server. They lurk the chats to makes sure rules are enforced. If you have a complaint about a member, speak to a Mafia Capo. 
+ **Intern**: Our newest recruits, learning how to moderate the server.
+ **Mafia Consigliere**: The copywriter of the server. She writes the announcements and welcomes etc.
+ **Wise Guys (Mafia Techies)**: Our tech department. They make and run the bots, and help our server run smoothly.
+ **Cartel Runner (Event Org)**: They run all the events on the server. Brawls, 1v1s, movie nights, karaoke, etc.
+ **Special Event Orgs**: The special event orgs run miscellaneous events on Nightborn, and work on projects like the Minecraft server.
 

 `)
      .addField("How to get notified when an event is taking place", ` If there are events you want to get notifications for, go to #bot-commands and type $iam role . The following is a list of all of the self assign event tags + a brief description of what happens in the events.
 + **NA Brawl** (League of Legends plays on NA sign up to do a custom 5v5)
 + **Movie/Anime Fan** (Enjoy movies or Anime? Assign yourself this tag to watch with your fellow movie/anime lovers.)
 + **Karaoke Night** (Self explanatory, ya think? ;))
 + **Random Games Night** (Need a break from League? Come bond with your newly found friends at game night!)
      `)
      .addField("Souls :ghost:", `Souls are the currency of Nightborn. You can win souls in many ways:
 + Gambling - Have a look in #caligo-casino
 + Helping the staff / other members
 + Participating in events
 + Talking in chat - You get souls at certain level milestones on Mee6
 + Participating in raffles - reply to this message with "tell me about raffles" if you wish to know more`)
      .addField("How you can spend souls", `So, you've racked up souls! What to spend them on :ghost:
 + Sharable Roles - At 5,000,000:ghost: per role, these are expensive! You get a tag of your choosing which you can give to others. Say "tell me about tags" to learn more.
 + Private VCs. For 1,000,000:ghost: a week you can own a private voice chat that you can allow people to access!`)
    message.channel.send(embed);
    // Create a reaction collector
    const collector = message.createReactionCollector(
      (reaction, user) => reaction.emoji.name === '👌' && user.id === 'someID', {
        time: 15000
      });
    collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));
  }
}
module.exports = WelcomeCommand;
