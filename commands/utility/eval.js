const {
    Command
} = require('discord-akairo');
var bpf = require("../../helpers/build_permission_function");
var util = require("../../helpers/util");

function clean(text) {
    if (typeof (text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return text
    };
}

class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            split: "none",
            category: "utility",
            ownerOnly: true,
            args: [{
                id: "after"
            }]
        });
    }

    exec(message, args) {
        return new Promise((resolve, reject) => {
            try {
                var eval_pls = "var author = message.author; var nb = message.guild; var echo = message.channel.send; " + args.after;
                let evaled = eval(eval_pls);
                if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
                message.channel.send(clean(evaled), {
                    code: "xl"
                });
            } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
            resolve()
        })
    }
}

module.exports = EvalCommand;