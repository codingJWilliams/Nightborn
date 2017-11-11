const { AkairoClient } = require('discord-akairo');
const config = require("./config.json");

const client = new AkairoClient({
    ownerID: ['193053876692189184'],
    prefix: 'nb.',
    commandDirectory: './commands/',
    listenerDirectory: "./listeners/"
}, {
    disableEveryone: true
});
client.login(config.token);