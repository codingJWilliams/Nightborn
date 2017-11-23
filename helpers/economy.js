var request = require("request");
var jwt = require("jsonwebtoken");
var config = require("../config.json");

var baseURL = "http://" + config.ecoserver_ip + ":" + config.ecoserver_port;

function getBal(uid) {
  return new Promise((resolve, reject) => {
    var token = jwt.sign({
      uid: uid,
      timeIssued: Date.now()
    }, config.ecoserver_key);
    request(baseURL + "/getbal/" + token, function (error, response, body) {
      var data = JSON.parse(body);
      if (data.balance !== undefined) {
        resolve(data.balance)
      } else {
        reject(data.error)
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
        resolve()
      } else {
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