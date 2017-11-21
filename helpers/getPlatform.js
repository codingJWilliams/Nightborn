exports.vps = () => {
  return require("fs").existsSync("./vps.txt")
}
exports.pc = () => {
  return require("fs").existsSync("./pc.txt")
}