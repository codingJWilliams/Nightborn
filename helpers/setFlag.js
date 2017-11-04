exports = (flagNameString, valueBool) => {
    var path = require("path");
    var flagsPath = path.join(".", "..", "..", "CheckUserBot", "storage", "flags.json");
    var fs = require("fs");
    var flags = JSON.parse(fs.readFileSync(flagsPath));
    flags[flagNameString] = valueBool;
    fs.writeFileSync(flagsPath, JSON.stringify(flags))
}