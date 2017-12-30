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
      .addField("Roles", ` + _**The Godfather**_: The owner of the server! Have any business, partnership, or team inquires? Feel free to contact him!
 + **Mafia Don**: These are the admins of the server, and are ranked above the staff. They make sure that all of our events run smoothly, reports get taken care of, and takes care of business deals when owner is away.
 + **Mafia Capo**: These are the moderators of the server. They lurk the text chats and voice channels to makes sure rules are enforced. If you have a complaint about a member please make sure you screenshot it and DM a mod. 
 + **Intern**: These are our newest recruits, learning commands, and how to moderate the server.
 + **Mafia Consigliere**: The copywriter of the server. She writes the announcements and welcomes etc.
 + **Wise Guys (Mafia Techies)**: Our trusty IT department. They make and run the bots, and help our server run as smoothly as it does.
 + **Cartel Runner (Event Org)**: They’re the ones who run all the events on the server. Brawls, 1v1s, movie nights, karaoke, etc.
 + **Special Event Orgs**: The special event orgs run miscellaneous events on Nightborn, and work on projects like the Minecraft server (\`mc.nightborn.estate\", 1.12) and random games nights.`)
      .addField("How to get notified when an event is taking place", ` If there are events you want to get notifications for, go to #bot-commands and type $iam role . The following is a list of all of the self assign event tags + a brief description of what happens in the events. 
 + **NA Brawl** (League of Legends plays on NA sign up to do a custom 5v5)
 + **Movie/Anime Fan** (Enjoy movies or Anime? Assign yourself this tag to watch with your fellow movie/anime lovers.)
 + **Karaoke Night** (Self explanatory, ya think? ;))
      `)
    message.channel.send(embed)
  }
}
module.exports = WelcomeCommand;
