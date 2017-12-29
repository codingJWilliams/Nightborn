var MongoClient = require('mongodb')
  .MongoClient,
  assert = require('assert'),
  config = require("../config.json")
var url = config.dbUrl;
url = url.replace(":9797/nightborn", ":9797/janitor")
/**
 * Fetch a user's janitor violations
 * @param {String} id User ID to fetch violations for
 */
module.exports = async (id) => {
  var db = await MongoClient.connect(url, {
    authSource: "admin",
    appname: "nightborn_bot"
  })
  return await db.collection("violations")
    .find({
      uid: id
    })
    .toArray()
}
