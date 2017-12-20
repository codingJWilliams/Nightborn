const {
  Listener
} = require('discord-akairo');
class GeneralListener extends Listener {
  constructor() {
    super('commandBlockedingen', {
      emitter: 'commandHandler',
      eventName: 'commandBlocked'
    });
  }
  async exec(message, command, reason) {
    //console.log(`${message.author.username} was blocked from using ${command.id} because of ${reason}!`);
    if (reason !== "commandInGeneral") return
    var m = await message.channel.send("No motherfuckin commands in general, have a motherfuckin warning you worthless cunt");
    message.delete();
    setTimeout(m => m.delete(), 2500);
    
  }
}
module.exports = GeneralListener;
