var config = require("../../config.json")
module.exports = () => {
  var MongoClient = require('mongodb')
    .MongoClient,
    assert = require('assert');
  var url = config.dbUrl;
  MongoClient.connect(url, {
      authSource: "admin",
      appname: "nightborn_bot"
    })
    .then((db) => {
      global.mongo = db;
    })
}
