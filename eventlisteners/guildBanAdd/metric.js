module.exports = async(g, u) => {
  try {
    dogapi.metric.send("server.ban", [
      1
    ], {
      type: "count",
      tags: ["user:" + u.username]
    }, function (err, results) {
      //
    });
  } catch (e) {}
}
