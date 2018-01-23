module.exports = async(message) => {
  if (message.channel.type != "dm") return;
  message.channel.send("fok off")
}