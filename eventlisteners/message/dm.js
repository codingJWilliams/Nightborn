module.exports = async(message) => {
  if (message.channel.type != "dm" && !message.author.bot) return;
  message.channel.send("fok off")
}