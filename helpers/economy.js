var request = require("request");
var jwt = require("jsonwebtoken");
var config = require("../config.json");
var util = require("../helpers/util");
var axios = require("axios");
var baseURL = "http://" + config.ecoserver_ip + ":" + config.ecoserver_port;
/**
 * @description Returns a user's balance, in the form of a promise
 * @param {string} uid
 * @returns {Promise.<int>} balance
 */
async function getBal(uid) {
  var token = jwt.sign({
    uid: uid,
    timeIssued: Date.now()
  }, config.ecoserver_key);
  try {
    var resp = await axios.get(baseURL + "/getbal/" + token);
  } catch (e) {
    throw Error("That user ID could not be found")
  }
  /**
   * @type {Number}
   */
  return resp.data.balance
}
/**
 * @description Sets the balance of a user     
 * @param {string} uid The user ID to set balance of
 * @param {number} amount What to set the balance to
 */
async function setBal(uid, amount) {
  if (amount < 0) throw RangeError("Amount is less than 0");
  if ((amount % 1) !== 0) throw RangeError("Amount is a decimal")
  var token = jwt.sign({
    uid: uid,
    amount: amount,
    timeIssued: Date.now()
  }, config.ecoserver_key);
  try {
    var resp = await axios.get(baseURL + "/setbal/" + token);
  } catch (e) {
    throw Error("That didn't work D: (Economy.setBal(), axios promise rejected)")
  }
}
/**
 * Awards souls to a user.
 * @param {string} uid The user ID to modify balance of
 * @param {number} amount How much to award
 * @returns {Promise} Promise is of type null
 */
async function award(uid, amount) {
  var bal = await getBal(uid);
  await setBal(uid, bal + amount);
}
/**
 * Takes souls from a user.
 * @param {string} uid The user ID to modify balance of
 * @param {number} amount How much to take
 * @returns {Promise} Promise is of type null
 */
async function take(uid, amount) {
  await award(uid, 0 - amount);
  return;
}
// Export all functions
module.exports.getBal = getBal;
module.exports.setBal = setBal;
module.exports.award = award;
module.exports.take = take;
