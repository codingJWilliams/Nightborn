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
      minecraft.colorCode.should.exist()
    })
  })
})