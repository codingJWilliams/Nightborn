module.exports = function(member) {
    return member.roles.some(r => ["Mafia Don"].includes(r.name))
}