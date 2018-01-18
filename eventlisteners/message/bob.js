module.exports = async(message) => {
  var blacklisted = ["staff", "admin"];
  if (blacklisted.includes(message.channel.name)) return;
  if (message.author.id !== "196870559630360576") return;
  global.mongo.collection("bobquotes")
    .insertOne({
      quote: message.content,
      time: Date.now()
    })
}
