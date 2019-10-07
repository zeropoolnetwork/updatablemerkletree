const MiMC7hash = artifacts.require('MiMC7hash');
const MiMC7Tree = artifacts.require('MiMC7hash');
const { updateMimcArtifact } = require("../src/mimcgenerated.js");


module.exports = async function (deployer) {
  await updateMimcArtifact();
  const MiMC = artifacts.require('MiMC');
  await deployer.deploy(MiMC);
  await deployer.link(MiMC, MiMC7hash);
  await deployer.deploy(MiMC7hash);
  await deployer.link(MiMC, MiMC7Tree);
  await deployer.deploy(MiMC7Tree);
};
