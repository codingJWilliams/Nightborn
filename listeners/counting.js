const {
    Listener
} = require('discord-akairo');
var apiBuilder = require("../api/apiBuilder");
var cLog = require("../helpers/log");
var eco = require("../helpers/economy");

class ReadyListener extends Listener {
    constructor() {
        super('counting', {
            emitter: 'client',
            eventName: 'message'
        })
    }

    async exec(message) {
        if (message.channel.id !== "389367953147166721") {
            return;
        }
        var currentCount = await global.mongo.collection("currentCount").findOne({});
        if (message.content != (currentCount.count + 1)) return message.delete();
        eco.award(message.author.id, 10);
        await global.mongo.collection("currentCount").findOneAndUpdate({}, {$inc: { count: 1 }});
        if (!(await global.mongo.collection("counters").findOne({ id: message.author.id }))) await global.mongo.collection("counters").insertOne({ counts: 0, id: message.author.id });
        await global.mongo.collection("counters").findOneAndUpdate({id: message.author.id}, {$inc: { counts: 1 }});
    }
}

module.exports = ReadyListener;
