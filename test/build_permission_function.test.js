var should = require('should');
var rewire = require("rewire");
var bpf = require("../helpers/build_permission_function")
describe("build_permission_function", () => {
  it("exists", () => {
    bpf.should.not.equal(undefined);
  })
  it("returns a function")
  should.equal(typeof bpf([]), "function")
  describe("permissions work as intended", () => {
    it("owners should have all permissions", () => {
      var pf = bpf([]) // Permission function that only owners should be able to access
      pf({
        member: {
          roles: [],
          id: "193053876692189184"
        },
        author: {
          id: "193053876692189184"
        }
      })
    })
    it("should correctly return true if member does have role", () => {
      var pf = bpf(["mods"]);
      var mockMember = {
        id: "this exists but does not necesarily matter",
        roles: [{
          name: "Irrelevant role"
        }, {
          name: "Staff"
        }, {
          name: "Mafia Capo"
        }]
      }
      pf({
          member: mockMember,
          author: {
            id: "this exists but does not necesarily matter"
          }
        })
        .should.equal(true)
    })
    it("should correctly return false if member does not have role", () => {
      var pf = bpf(["mods"]);
      var mockMember = {
        id: "this exists but does not necesarily matter",
        roles: [{
          name: "Irrelevant role"
        }]
      }
      pf({
          member: mockMember,
          author: {
            id: "this exists but does not necesarily matter"
          }
        })
        .should.equal(false)
    })
  })
})
