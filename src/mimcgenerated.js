const path = require("path");
const truffleArtifactor = require('truffle-artifactor')
const mimc7sponge = require("circomlib/src/mimc7sponge_gencontract.js");



const unlinked_binary = mimc7sponge.createCode();
const abi = mimc7sponge.abi;

const contractName = 'MiMC';

async function updateMimcArtifact() {
  const contractsDir = path.join(__dirname, "..", "build/contracts");
  const contractName = 'MiMC';
  await (new truffleArtifactor(contractsDir)).save({
    contractName,
    abi,
    unlinked_binary
  })
};

exports.updateMimcArtifact = updateMimcArtifact;
