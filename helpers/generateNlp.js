const util_ = require('util');
const exec = util_.promisify(require('child_process')
    .exec);

module.exports = async function() {
    var { stdout, stderr } = await exec("python3.5 ai/gen.py");
    return stdout.replace("@everyone", "@not everyone").replace("@here", "@not here").replace(/<!?[0-9]+>/g, "@someone")
}