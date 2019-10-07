const MiMC7hash = artifacts.require('MiMC7hash');
const MiMC = artifacts.require('MiMC');

const { multiHash } = require("circomlib/src/mimc7");
const assert = require("assert");

contract('MiMC7hash test', (accounts) => {
  let mimc7hash;
  
  beforeEach(async () => {
    const mimc = await MiMC.new();
    await MiMC7hash.link(MiMC, mimc.address);
    mimc7hash = await MiMC7hash.new();
  });

  it("Should test hash(a,b)", async () => {
    assert((await mimc7hash.test('1', '2')).toString() == multiHash([1n, 2n]).toString());
  });





})
