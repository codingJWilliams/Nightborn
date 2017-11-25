const {
    AkairoClient
} = require('discord-akairo');
const config = require("./config.json");

global.logSocket = require('socket.io-client')('http://jwte.ch:8008');
global.logSocket.on("connect", () => {
    global.logSocket.emit("sendLogsSoon <3");
    console.log("connected")
    global.logSocket.emit("log", {
        proc: "bot.logger",
        level: 3,
        message: "Bot handshake with log server"
      });
})


var cLog = require("./helpers/log");

cLog("process.main", "debug", "Launched.");


const client = new AkairoClient({
    ownerID: ['193053876692189184'],
    prefix: ['nb.', ','],
    commandDirectory: './commands/',
    listenerDirectory: "./listeners/",
    allowMention: true
}, {
    disableEveryone: true
});


client.jobs = [];
client.addJob = (executor, epoch) => {
    var time = new Date(Math.floor(epoch / 5000) * 5000);
    time = time.getTime();
    client.jobs.push({
        executor: executor,
        when: time,
        id: require("phonetic").generate()
    });
    cLog("services.jobs", "info", "Job added, executing " + require("moment")().to(require("moment")(epoch)));

}

setInterval(() => {
    if (client.jobs.length) {
        var coeff = 1000 * 5;
        var rounded = new Date(Math.floor(Date.now() / coeff) * coeff);
        rounded = rounded.getTime()
        var filtered = client.jobs.filter((el) => {
            return el.when === rounded;
        });
        client.jobs = client.jobs.filter((el) => {
            return el.when !== rounded;
        });

        while (filtered.length) {
            var job = filtered.pop();
            job.executor();
            cLog("services.jobs", "info", "Completed job ["+ job.id.toString() +"]")
        }
    }
}, 2 * 1000)

client.login(config.token);