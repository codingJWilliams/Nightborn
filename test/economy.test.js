var should = require('should');
var economy = require("../helpers/economy");

describe("economy.get", ()=>{
  it("should return a number", async () => {
    var balance = await economy.getBal("193053876692189184");
    balance.should.be.a.Number()
  })
  it("should be a sensible number", async () => {
    var balance = await economy.getBal("193053876692189184");
    balance.should.be.aboveOrEqual(0)
    should.equal(balance % 1, 0)
  })
})
