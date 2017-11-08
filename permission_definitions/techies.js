module.exports = function(member) {
    return member.roles.some(r => ["Wise Guys (Mafia Techies)"].includes(r.name))
}