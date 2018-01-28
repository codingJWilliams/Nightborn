module.exports = async (oldM, newM) => {
  if (newM.nickname) {
    if (newM.nickname.indexOf("★") !== -1) {
      newM.setNickname(newM.nickname.replace(/★/g, ""));
    }
  }
}
