module.exports = () => {
  setInterval(() => {
    var dogapi = global.dogapi
    try {
      /**
       * @type {Discord.Guild}
       */
      var nb = client.guilds.get("300155035558346752");
      dogapi.metric.send("server.members", [
        nb.memberCount
      ], {
        type: "gauge"
      }, function (err, results) {
        //
      });
      dogapi.metric.send("server.roles", [
        nb.roles.size
      ], {
        type: "gauge"
      }, function (err, results) {
        //
      });
    } catch (e) {}
  }, 10000)
}
