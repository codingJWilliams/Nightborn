module.exports = function(member) {
    return member.roles.some(r => ["Mafia Capo"].includes(r.name))
}