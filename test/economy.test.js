var should = require('should');
describe("economy", () => {
  var economy = require("../helpers/economy")
  describe("get", () => {
    it("should return a number", async() => {
      var balance = await economy.getBal("193053876692189184");
      balance.should.be.a.Number()
    })
    it("should be a sensible number", async() => {
      var balance = await economy.getBal("193053876692189184");
      balance.should.be.aboveOrEqual(0)
      should.equal(balance % 1, 0)
    })
  })
  describe("set", () => {
    it("should correctly set a balance to a normal number", async() => {
      var startingBalance = await economy.getBal("193053876692189184") // maybe mock this?
      var toSet = Math.floor(Math.random() * 300)
      await economy.setBal("193053876692189184", toSet)
      var afterSet = await economy.getBal("193053876692189184");
      afterSet.should.equal(toSet);
      // clean up
      await economy.setBal("193053876692189184", startingBalance + 4000)
    })
    it("should correctly set a balance to 0", async() => {
      var startingBalance = await economy.getBal("193053876692189184") // maybe mock this?
      var toSet = 0;
      await economy.setBal("193053876692189184", toSet)
      var afterSet = await economy.getBal("193053876692189184");
      afterSet.should.equal(toSet);
      // clean up
      await economy.setBal("193053876692189184", startingBalance + 4000)
    })
  })
  describe("award", () => {
    it("awards correctly", async() => {
      var oldBal = await economy.getBal("193053876692189184");
      await economy.award("193053876692189184", 5);
      var newBal = await economy.getBal("193053876692189184")
      newBal.should.equal(oldBal + 5);
    })
  })
  describe("take", () => {
    it("takes correctly", async() => {
      var oldBal = await economy.getBal("193053876692189184");
      await economy.take("193053876692189184", 5);
      var newBal = await economy.getBal("193053876692189184")
      newBal.should.equal(oldBal - 5);
    })
  })
})
