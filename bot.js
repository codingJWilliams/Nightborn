const { AkairoClient } = require('discord-akairo');
const config = require("./config.json");

const client = new AkairoClient({
    ownerID: ['193053876692189184'],
    prefix: ['nb.', ','],
    commandDirectory: './commands/',
    listenerDirectory: "./listeners/"
}, {
    disableEveryone: true
});

client.jobs = [];

client.addJob = (executor, epoch) => {
    var time = new Date(Math.floor(epoch / 5000) * 5000);
    time = time.getTime();
    client.jobs.push({
        executor: executor,
        when: time
    });
}

setInterval( () => {
    if (client.jobs.length) {
        var coeff = 1000 * 5;
        var rounded = new Date(Math.floor(Date.now() / coeff) * coeff);
        rounded = rounded.getTime()
        var filtered = client.jobs.filter( (el) => {
            return el.when === rounded;
        });
        client.jobs = client.jobs.filter( (el) => {
            return el.when !== rounded;
        });
    
        while (filtered.length) {
            var job = filtered.pop();
            job.executor()
            console.log("Completed job!")
        }
    }
}, 2 * 1000 )

client.login(config.token);