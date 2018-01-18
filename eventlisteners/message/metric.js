module.exports = async(message) => {
  dogapi.metric.send("bot.messages.seen", 1, {
    type: "count",
    tags: ["channel:" + message.channel.name, "staff:" + message.member.roles.some(r => r.name === "Staff"), "member:" + message.author.id]
  }, function (err, results) {
    //console.dir(results);
  });
}
