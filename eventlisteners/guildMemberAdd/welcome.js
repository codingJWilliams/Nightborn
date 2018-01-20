var AWS = require('aws-sdk');
AWS.config.loadFromPath("./aws.json") // Schema: {"accessKeyId": "key", "secretAccessKey": "", "region": "us-east-1"} 
var lambda = new AWS.Lambda();
var params = {
  FunctionName: "LambdaWelcome-dev-hello",
  Payload: JSON.stringify({
    queryStringParameters: {
      name: "VoidCrafted",
      avatar: "https://cdn.discordapp.com/avatars/157997676653182976/3b547e735e911731f140bacb0edb00ee.webp?size=128",
      guild: "Nightborn Estate"
    }
  })
}
lambda.invoke(params, (err, payload) => {
  if (err) return console.error(err)
  console.log(JSON.parse(payload.Payload).body)
})