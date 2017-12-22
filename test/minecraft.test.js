var should = require('should');
var rewire = require("rewire");
var minecraft = require("../helpers/minecraft")

describe("minecraft", ()=>{
  describe("colour escaper", ()=>{
    it("should correctly escape example strings", ()=>{
      minecraft.colorCode("&cTest").should.equal("§cTest")
      minecraft.colorCode("&c").should.equal("§c")
      minecraft.colorCode("abc&aabc").should.equal("abc§aabc")
    })
    it("should exist", ()=>{
      minecraft.colorCode.should.not.equal(undefined)
    })
  })
  describe("function caller", ()=>{
    it("should exist", ()=>{
      minecraft.easyCall.should.not.equal(undefined)
    })
    it("server should be online", async ()=>{
      var version = await minecraft.easyCall("server.version");
      version.success.should.equal("git-Spigot-596221b-b1b9ab0 (MC: 1.12)")
    })
  })
})