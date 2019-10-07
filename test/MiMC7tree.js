const MiMC7tree = artifacts.require('MiMC7tree');
const MiMC = artifacts.require('MiMC');


const { MerkleTree } = require("txcircuit/src/merkletree.js");
const { randrange } = require("txcircuit/src/utils.js");
const assert = require("assert");

contract('MiMC7tree test', (accounts) => {
  let mimc7tree;
  
  beforeEach(async () => {
    const mimc = await MiMC.new();
    await MiMC7tree.link(MiMC, mimc.address);
    mimc7tree = await MiMC7tree.new();
  });



  function toStrRepr(n) {
    if (typeof n === "string") 
      return n;
    
    if ((typeof n === "bigint") || (typeof n === "number"))
      return `0x${n.toString(16)}`;
    
    if (n instanceof Array)
      return n.map(toStrRepr);
    
    assert(false, `Cannot convert to hexstring value:${n.toString()}`);
  }


  it("Should compute updateRoot", async() => {

    const proofLength = 16;
    const test_pre_elements = Array(randrange(10, 100)).fill(0n).map(()=>randrange(0n, 0x4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn));
    const test_elements = Array(randrange(10, 100)).fill(0n).map(()=>randrange(0n, 0x4fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn));

    const tree1 = new MerkleTree(proofLength + 1);
    let index = 0;
    let pi = tree1.proof(index);
    let root = 11208300819560171976854369439142163132601103910445974060238362602696769827980n;
    
    tree1.pushMany(test_pre_elements);
    let newroot = BigInt(await mimc7tree.updateRoot(toStrRepr(pi), toStrRepr(index), toStrRepr(test_pre_elements)));


    assert(newroot === tree1.root, "Updated root at the contract must be the same as local");
    
    index = test_pre_elements.length;
    pi = tree1.proof(index);
    root = newroot;
    
    tree1.pushMany(test_elements);

    newroot = BigInt(await mimc7tree.updateRoot(toStrRepr(pi), toStrRepr(index), toStrRepr(test_elements)));
    assert(newroot === tree1.root, "Updated root at the contract must be the same as local (2)");


  });

})
