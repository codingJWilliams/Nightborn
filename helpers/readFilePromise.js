const fs = require('graceful-fs');
var cLog = require("../../helpers/log");

module.exports = function fsReadFilePromise(filePath, options) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, options, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
};