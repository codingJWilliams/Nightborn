module.exports = function(flagNameString, valueBool) {
    var path = require("path");
    var flagsPath = path.join("..", "CheckUserBot", "storage", "flags.json");
    var fs = require("fs");

    var flags = JSON.parse(fs.readFileSync(flagsPath));
    flags[flagNameString] = valueBool ? true : false;
    fs.writeFile(flagsPath, JSON.stringify(flags), function(err) {
        console.log(err)
    })
}