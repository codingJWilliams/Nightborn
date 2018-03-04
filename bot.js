const {
    AkairoClient
} = require('discord-akairo');
const config = require("./config.json");
const fs = require("fs");
const {
    lstatSync,
    readdirSync
} = require('fs')
const path = require('path');
var Discord = require("discord.js")
var dogapi = require("dogapi");
var EventEmitter = require("events");
var options = {
    api_key: config.datadog.apikey,
    app_key: config.datadog.appkey,
};
dogapi.initialize(options);
global.dogapi = dogapi;
var cLog = require("./helpers/log");
cLog("process.main", "debug", "Launched.");
const client = new AkairoClient({
    ownerID: ['193053876692189184'],
    prefix: ['nb.', ','],
    commandDirectory: './commands/',
    inhibitorDirectory: "./inhibitors/",
    listenerDirectory: "./listeners/",
    allowMention: true
}, {
    disableEveryone: false
});
global.client = client
client.setMaxListeners(60);
const isDirectory = source => lstatSync(source)
    .isDirectory()
const getDirectories = srcPath => fs.readdirSync(srcPath)
    .filter(file => fs.statSync(path.join(srcPath, file))
        .isDirectory())

getDirectories("./eventlisteners/")
    .map(e => {
        client.setMaxListeners(50);
        fs.readdirSync(path.join(".", "eventlisteners", e))
            .map(fileName => {
                client.on(e, require(path.join(__dirname, "eventlisteners", e, fileName)))
            })
    });
client.login(config.token);