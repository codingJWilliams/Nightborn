module.exports = async (member) => {
  global.mongo.collection("role_backup").insertOne({ id: member.id, time: Date.now(), roles: member.roles.map(r => r.id).array()})
