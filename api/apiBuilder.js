module.exports.build = (client) => {
  var express = require("express");
  const app = express()
  var jwt = require("jsonwebtoken");
  var secrets = require("./apiconfig.json").secrets;

  app.get('/', (req, res) => {
    app.get("/api/:clientid/:token", function (req, res) {
      var token = jwt.verify(req.params.token, secrets[ req.params.clientid ]);
      switch ( token.action ) {
        case "getMember":
          require("./api_endpoints/getMember")(req, res, client, token)

          break;
      }
    })
  })
  
  app.listen(3000, () => console.log('Example app listening on port 3000!'))
}