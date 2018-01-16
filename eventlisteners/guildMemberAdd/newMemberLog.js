module.exports = (member) => {
  global.mongo.collection("welcome").insertOne({
    id: member.id,
    time: Date.now()
  })
}