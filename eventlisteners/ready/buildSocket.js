module.exports = () => {
  setTimeout(() => {
    require("../../panelconnect/socketFunctionBuilder")
      .build(global.logSocket, client);
  }, 3000)
}
