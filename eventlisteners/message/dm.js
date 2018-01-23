module.exports = async(message) => {
  if (message.channel.type != "dm" || message.author.id == global.client.user.id) return;
  message.channel.send("fok off")
}