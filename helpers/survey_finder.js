var google = require('googleapis');

var key = require('../apikeys/google_api_key.json');
var jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key, ['https://www.googleapis.com/auth/spreadsheets.readonly'], // an array of auth scopes
    null
);
var util = require("../helpers/util");

module.exports.getResponses = function getResponses() {
    return new Promise(function (resolve, reject) {
        jwtClient.authorize(function (err, tokens) {
            var sheets = google.sheets('v4');
            if (err) {
                console.log(err);
                return;
            }
            sheets.spreadsheets.values.get({
                auth: jwtClient,
                spreadsheetId: '1KZkDXb8ykRqFuMaUTWW57kWbRZMvEOr2OkDioxRS5cw',
                range: 'Form Responses 1',
            }, function (err, response) {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                }
                var rows = response.values;
                var responses = [];
                if (rows.length == 0) {
                    console.log('No data found.');
                } else {
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        responses.push({
                            timestamp: row[0],
                            discord_name: row[1],
                            id: row[2],
                            games_they_play: row[3].split(", "),
                            custom_gamemodes: row[4],
                            alt_suggestions: row[5],
                            timezone: row[6],
                            age: row[7],
                            gender: row[8],
                            suggestions: row[9],
                            preferred_event: row[10]
                        })
                    }
                    resolve(responses)
                }
            });
        });
    })

}
module.exports.findResponse = function findResponse(id) {
    return new Promise((resolve, reject) => {
        module.exports.getResponses().then((resp) => {
            resolve(resp.filter(r => {
                return r.id === id
            }).length > 0 ? resp.filter(r => {
                return r.id === id
            })[0] : undefined);
        })
    })
}