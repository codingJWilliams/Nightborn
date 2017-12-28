const {
  AkairoClient
} = require('discord-akairo');
const config = require("./config.json");
const fs = require("fs");
const {
  lstatSync,
  readdirSync
} = require('fs')
const path = require('path')

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
const isDirectory = source => lstatSync(source)
  .isDirectory()
const getDirectories = srcPath => fs.readdirSync(srcPath)
  .filter(file => fs.statSync(path.join(srcPath, file))
    .isDirectory())
getDirectories("./eventlisteners/")
  .map(e => {
    fs.readdirSync(path.join(".", "eventlisteners", e))
      .map(fileName => {
        client.on(e, require(path.join(__dirname, "eventlisteners", e, fileName)))
      })
  })
  client.login(config.token);