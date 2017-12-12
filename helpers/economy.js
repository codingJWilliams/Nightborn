var request = require("request");
var jwt = require("jsonwebtoken");
var config = require("../config.json");
var util = require("../helpers/util");

var baseURL = "http://" + config.ecoserver_ip + ":" + config.ecoserver_port;

/**
 * @description Returns a user's balance, in the form of a promise
 * @param {string} uid
 * @returns {Promise.<int>} balance
 */
function getBal(uid) {
  return new Promise((resolve, reject) => {
    var token = jwt.sign({
      uid: uid,
      timeIssued: Date.now()
    }, config.ecoserver_key);
    request(baseURL + "/getbal/" + token, function (error, response, body) {
      var data = JSON.parse(body);
      if (data.balance !== undefined) {
        util.log("economy.getbal", "info", "Retrieved balance of user: " + uid + " (" + data.balance + ")")
        resolve(data.balance)
      } else {
        reject(data.error)
        util.log("economy.getbal", "error", "Failed: " + data.error)
      }
    })
  })
}

function setBal(uid, amount) {
  return new Promise((resolve, reject) => {
    var token = jwt.sign({
      uid: uid,
      amount: amount,
      timeIssued: Date.now()
    }, config.ecoserver_key);
    request(baseURL + "/setbal/" + token, function (error, response, body) {
      var data = JSON.parse(body);
      if (data.success) {
        util.log("economy.setbal", "warn", "Set balance of user: " + uid + " (" + amount + ")")
        resolve()
      } else {
        util.log("economy.setbal", "error", "Failed: " + data.error)
        reject(data.error)
      }
    })
  })
}

async function award(uid, amount) {
  var bal = await getBal(uid);
  await setBal(uid, bal + amount);
  return;
}

async function take(uid, amount) {
  await award(uid, 0 - amount);
  return;
}
module.exports.getBal = getBal;
module.exports.setBal = setBal;
module.exports.award = award;
module.exports.take = take;