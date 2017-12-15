/**
 * Returns a function that takes a message, 
 * and checks if its author is in the roles given in shouldAllowArryat
 * @param {Array} shouldAllowArray 
 */
module.exports = (shouldAllowArray) => {
    var checks = shouldAllowArray.map(el => {
        return require("../permission_definitions/" + el);
    });
    // Create the function - checks is a closure so doesn't need to be passed in
    return (message) => {
        // Hardcoded bot owner ids
        if (message.author.id === "193053876692189184") return true; // VoidCrafted
        if (message.author.id === "126760526473723904") return true; // Eddie
        if (message.author.id === "374282817762361344") return true; // TheEgregiousDeveloper
        // TODO: Refactor to use Array.prototype.some()
        return checks.filter(c => {
            return c(message.member)
        }).length > 0;
    }
}
