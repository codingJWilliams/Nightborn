var util = require("../helpers/util");
/**
 * Change a flag in checkuser. Fails often
 * @param {string} flagNameString The flag to change, like allowNewMembers
 * @param {Boolean} valueBool What to set the flag to
 */
module.exports = function (flagNameString, valueBool) {
  try {
    var path = require("path");
    var flagsPath = path.join("..", "CheckUserBot", "storage", "flags.json");
    var fs = require("fs");
    var flags = JSON.parse(fs.readFileSync(flagsPath));
    flags[flagNameString] = valueBool ? true : false;
    try {
      fs.writeFile(flagsPath, JSON.stringify(flags), function (err) {
        console.log(err)
      })
    } catch (e) {
      return;
    }
  } catch (e) {
    // Pass. If it fails, idek
  }
}
