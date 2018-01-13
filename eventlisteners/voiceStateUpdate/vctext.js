module.exports = async (o, n) => {
  console.log("voiceStateUpdate")
  if (n.voiceChannel && !o.voiceChannel) {
    n.addRole("397769917555933185");
  }
  if (!n.voiceChannel && o.voiceChannel) {
    n.removeRole("397769917555933185");
  }
}
