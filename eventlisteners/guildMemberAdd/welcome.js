var AWS = require('aws-sdk');
AWS.config.loadFromPath("./aws.json") // Schema: {"accessKeyId": "key", "secretAccessKey": "", "region": "us-east-1"} 
var lambda = new AWS.Lambda();
const Discord = require("discord.js");

module.exports = (member) => {
  /** @type {Discord.TextChannel} */
  var channel = member.guild.defaultChannel;
  var params = {
    FunctionName: "LambdaWelcome-dev-hello",
    Payload: JSON.stringify({
      queryStringParameters: {
        name: member.user.username,
        avatar: member.user.displayAvatarURL.replace("size=2048", "size=128"),
        guild: member.guild.name
      }
    })
  }
  lambda.invoke(params, (err, payload) => {
    if (err) return console.error(err)
    var bu = Buffer.from(JSON.parse(payload.Payload)
      .body, "base64");
    
    var at = new Discord.Attachment(bu, "welcome.jpg");
    channel.send("Welcome <@" + member.id + "> to Nightborn :heart:", at)
  })
}
