/*const {
  Listener
} = require('discord-akairo');
var cLog = require("../helpers/log");

class EnvyListener extends Listener {
  constructor() {
    super('envy', {
      emitter: 'client',
      eventName: 'message'
    });
  }

  exec(message) {
    if (message.author.bot) return;
    if (message.channel.id === "359445403747483658") return;
    var envy1 = [
      "envy",
      "envious",
      "jealous",
      "jealousy",
      "covet"
    ]
    var envy2 = [
      "fortune",
      "fortunate",
      "lucky",
      "luck",
      "unlucky"
    ]
    var envy3 = [
      "fucking envy", "envy is gross", "fuck envy"
    ]
    if (envy3.includes(message.content.toLowerCase())) {
      cLog("promoter.envy", "info", "Promoted envy in #" + message.channel.name + " to " + message.author.id)
      message.reply("don't hate me cuz u can't penetrate me" + " ```We have just 3 weeks to save net neutrality. Act now.``` <https://www.battleforthenet.com/>");
      return;
    }
    if (envy1.some((el) => message.content.toLowerCase().indexOf(el) !== -1)) {
      cLog("promoter.envy", "info", "Promoted envy in #" + message.channel.name + " to " + message.author.id)
      message.reply("don’t covet what you can claim, join Envy today!" + " ```We have just 3 weeks to save net neutrality. Act now.``` <https://www.battleforthenet.com/>")
    } else if (envy2.some((el) => message.content.toLowerCase().indexOf(el) !== -1)) {
      cLog("promoter.envy", "info", "Promoted envy in #" + message.channel.name + " to " + message.author.id)
      message.reply("fortune doesn’t favor fools :kiss:" + " ```We have just 3 weeks to save net neutrality. Act now.``` <https://www.battleforthenet.com/>")
    }
  }
}

module.exports = EnvyListener;
*/