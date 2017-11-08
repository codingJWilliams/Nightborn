module.exports = function(member) {
    return member.roles.some(r => ["Cartel Runner (Event Org)", "Trial Runners"].includes(r.name))
}