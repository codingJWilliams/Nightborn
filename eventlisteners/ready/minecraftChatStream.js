const WebSocket = require('ws');
var sha256 = require("sha256");
var request = require("request");
var axios = require("axios");
var Discord = require("discord.js");
var crypto = require("crypto");
var personCache = {};
async function getDiscord(username) {
    console.log("Checking cache")
    if (personCache.hasOwnProperty(username)) return personCache[username];
    console.log("Not in cache. Getting from monghole")
    var personLink = await global.mongo.collection("link").findOne({ mcUsername: username });
    console.log(personLink);
    if (!personLink) {
        personCache[username] = personLink;
        console.log("eek couldn't even find them in mongo :feelssadman:");
    } else {
        personCache[username] = personLink.discordID;
        console.log("gottem")
    }
    return personCache[username];
}

function getKey(username, methodNameOrSourceName, password, salt) {
    var shasum = crypto.createHash("sha256");
    shasum.update(username + methodNameOrSourceName + password + salt);
    return shasum.digest("hex");
}

function makeKey(obj) {
    obj[0].key = getKey(obj[0].username, obj[0].name, obj[0].password, obj[0].salt);
    delete obj[0].password;
    delete obj[0].salt
    return obj;
}
//var util = require("../helpers/util");
module.exports = () => {
    var ws = new WebSocket('ws://mc.nightborn.estate:25565/api/2/websocket');
    ws.on('open', function open() {
        var obj = [{ "name": "chat", "password": "voiddabest", "salt": "hello", "username": "voidy", "tag": "chat" }];
        ws.send('/api/2/subscribe?json=' + encodeURIComponent(JSON.stringify(makeKey(obj))));
    });
    ws.on('message', async function incoming(data) {
        var dataJson = JSON.parse(data);
        if (dataJson.result == "success" && dataJson.tag == "chat") {
            console.log(dataJson)
            var id = await getDiscord(dataJson.success.player);
            var name = dataJson.success.player;
            if (id) name = "<@" + id + ">";
            var emb = new Discord.RichEmbed();
            emb.setAuthor(dataJson.success.player, "https://crafatar.com/avatars/" + dataJson.success.player);
            emb.setDescription(dataJson.success.message);
            global.client.guilds.get("300155035558346752").channels.get("411578112774504468").send(emb);
        }
    });
}