var superagent = require("superagent");
/**
 * @typedef {{id: string, twitch: string}} Streamer
 */

module.exports = async() => {
    /*setInterval(async() => {
        /**@type {Array<Streamer>} * /
        var streams = await global.mongo.collection("streamers").find({}).toArray();
        var request = superagent;
        streams.forEach(async stream => {
            request
                .get('https://api.twitch.tv/kraken/streams/' + "runitup")
                .set('Client-ID', '3zzmx0l2ph50anf78iefr6su9d8byj8')
                .set('Accept', 'application/json')
                .end(function(err, res) {
                    var tStream = JSON.parse(res.text).stream;
                    if (!tStream) return;
                    var streamStarted = new Date(tStream["created_at"]);
                    var runningMs = Date.now() - streamStarted.getTime();
                    console.log("checked " + tStream)
                    if (runningMs < (20 * 1000)) {
                        // Is new stream
                        console.log("NEW STREAM " + tStream)
                        global.client.guilds.get("300155035558346752").channels.get("392953686164242434").send("<@" + stream.id + `> just went live, playing ${tStream.game} ${tStream.preview.large}`)
                    }
                })
        })
    }, 20 * 1000)*/
}