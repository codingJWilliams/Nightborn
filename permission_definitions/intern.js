module.exports = function(member) {
    return member.roles.some(r => ["Intern"].includes(r.name))
}