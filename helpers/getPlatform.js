/**
 * Function to test whether bot is running on VPS
 * @returns {Boolean} True if on VPS
 */
exports.vps = () => {
  return require("fs").existsSync("./vps.txt")
}

/**
 * Function to test whether bot is running on my laptop
 * @returns {Boolean} True if on laptop
 */
exports.pc = () => {
  return require("fs").existsSync("./pc.txt")
}