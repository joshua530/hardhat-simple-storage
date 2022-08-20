const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", () => {
  let SimpleStorageFactory, simpleStorage

  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await SimpleStorageFactory.deploy()
  }) // do this before each test

  it("Should start with a favorite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve()
    const expected = "0"
    assert.equal(currentValue.toString(), expected)
    // expect(expected).to.equal(currentValue.toString())
  }) // unit test

  it("Should update when we call store", async () => {
    const expected = "7"
    const trxResponse = await simpleStorage.store(expected)
    await trxResponse.wait(1)
    const actual = await simpleStorage.retrieve()
    assert.equal(expected, actual.toString())
  })

  it("Should return 2 when algo is called", async () => {
    const expected = 2
    const actual = await simpleStorage.algo()
    assert.equal(expected, actual)
  })

  it("Should add person when addPerson is called", async () => {
    const expected = { name: "bar", age: "12" }
    const res = await simpleStorage.addPerson("bar", "12")
    await res.wait(1)
    const person = await simpleStorage.people(0)
    assert.equal(expected.name, person.name)
    assert.equal(expected.age, person.age)
  })
})
