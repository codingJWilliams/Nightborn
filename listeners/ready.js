const { Listener } = require('discord-akairo');
var apiBuilder = require("../api/apiBuilder");

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            eventName: 'ready'
        });
    }

    exec() {
        console.log('Ready!');
        apiBuilder.build( this.client )
    }
}

module.exports = ReadyListener;