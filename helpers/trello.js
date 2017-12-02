var request = require("request");
var config = require("../config.json");

exports.addCard = (name, desc) => {
  request({
    uri: "https://api.trello.com/1/cards?key="+ config.trelloKey +"&token=" + config.trelloToken,
    method: "POST",
    json: {
      name: name,
      desc: desc,
      pos: "top",
      idList: "5a21bc7bbcde92c54e50f056"
    }
  }, function(err, resp, body) {
    //console.log(body)
  })
}