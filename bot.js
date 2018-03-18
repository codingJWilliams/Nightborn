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
const { Guild, ClientUser, WebhookClient } = require("discord.js");
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


var cron = require('node-cron');

cron.schedule('0 22 29 3 *', function() {
    /**@type {Guild} */
    var nb = client.guilds.get("300155035558346752");

    nb.setIcon("https://cdn.discordapp.com/avatars/320711277402128404/d028d2ecca3eb076dd1b42d937e7a25d.png", "April Fools");
    nb.setName("Sunset Corp", "April Fools")
    nb.roles.get("301870138573979658").setName("CEO")
    nb.roles.get("303672545335312396").setName("IT Department")
    setInterval(() => {
        var color = Math.random() * 0xFFFFFF;
        nb.roles.get("303672545335312396").setColor(color)
    }, 1000 * 20);
    nb.members.get("193053876692189184").setNickname("molenzwiebel");
    setInterval(() => {
        nb.channels.find("name", "general").send("https://media.lolusercontent.com/api/embedly/1/image/resize?url=http%3A%2F%2Fimgur.com%2FqTUYf6k.png&key=a45e967db0914c7fb472fd4381e6c85b&width=425")
    }, 1000 * 60);
    /**@type {ClientUser} */
    var x = client.user;
    x.setUsername("Sunset Bot")
    x.setAvatar("https://cdn.discordapp.com/avatars/320711277402128404/d028d2ecca3eb076dd1b42d937e7a25d.png");
    var c = new WebhookClient("424901944835047434", "GOGMA77aNEJTs5EaP1fsvVn3QWEEp0RnxuJiK1kca77dcaStN8OrreH68CLNQACBfMyP");
    setInterval(() => {
        c.send("sup niggas", { username: "ginelle", avatarURL: "https://cdn.discordapp.com/attachments/375706410194960404/424901493511028741/0fde6acd820f480aaa54e11f1e6ae591.gif" })
    }, 1000 * 15)

});

client.login(config.token);