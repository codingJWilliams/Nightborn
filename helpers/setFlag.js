module.exports = function setFlag(flagNameString, valueBool) {
    var path = require("path");
    var flagsPath = path.join(".", "..", "CheckUserBot", "storage", "flags.json");
    var fs = require("fs");

    var flags = JSON.parse(fs.readFileSync(flagsPath));
    flags[flagNameString] = valueBool;
    console.log(flags);
    fs.writeFileSync(flagsPath, JSON.stringify(flags))
}