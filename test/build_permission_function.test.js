var should = require('should');
var rewire = require("rewire");
var bpf = require("../helpers/build_permission_function")

describe("build_permission_function", ()=>{
  it("exists", ()=>{
    bpf.should.not.equal(undefined);
  })
  it("returns a function")
  should.equal(
    typeof bpf([]),
    "function"
  )
})