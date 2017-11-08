module.exports = (shouldAllowArray) => {
    var checks = shouldAllowArray.map(el => {
        return require("../permission_definitions/" + el);
    });
    return (message) => {
        if (message.author.id === "193053876692189184") return true;
        return checks.filter(c => { return c(message.member) }) > 0;
    }
}