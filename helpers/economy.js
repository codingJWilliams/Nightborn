var request = require("request");
var jwt = require("jsonwebtoken");
var config = require("../config.json");

var baseURL = "http://" + config.ecoserver_ip + ":" + config.ecoserver_port;

function getBal(uid) {
  return new Promise( (resolve, reject) => {
    var token = jwt.sign({ uid: uid, timeIssued: Date.now() }, config.ecoserver_key);
    request(baseURL + "/getbal/" + token,  function (error, response, body) {
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
  return new Promise( (resolve, reject) => {
    var token = jwt.sign({ uid: uid, amount: amount, timeIssued: Date.now() }, config.ecoserver_key);
    request(baseURL + "/setbal/" + token,  function (error, response, body) {
      var data = JSON.parse(body);
      if (data.success) {
        resolve()
      } else {
        reject(data.error)
      }
    })
  })
}
function award(uid, amount) {
  return new Promise((resolve, reject) => {
    getBal(uid).then( (bal) => {
      bal += amount;
      setBal(uid, bal).then( resolve )
    })
  })
}
function take(uid, amount) {
  return award(uid, 0 - amount)
}
module.exports.getBal = getBal;
module.exports.setBal = setBal;
module.exports.award = award;
module.exports.take = take;