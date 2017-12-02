var request = require("request");
var config = require("../config.json");

exports.addCard = (name, desc, staff) => {
  request({
    uri: "https://api.trello.com/1/cards?key="+ config.trelloKey +"&token=" + config.trelloToken,
    method: "POST",
    json: {
      name: name,
      desc: desc,
      pos: "top",
      idList: "5a22eadd74cfce64c5181a8a",
      idLabels: staff ? "5a22eabc7a03b6a878a691dd,5a22eac46ba09d840529af70" : "5a22eabc7a03b6a878a691dd"
    }
  }, function(err, resp, body) {
    //console.log(body)
  })
}