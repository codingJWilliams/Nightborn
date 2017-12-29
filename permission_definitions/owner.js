module.exports = function (member) {
  return member.roles.some(r => ["The Bobfather"].includes(r.name))
}
