pragma solidity >=0.5.2;



library MiMC {
  function sponge(uint256 a, uint256 b) public pure returns(uint256);
}



contract MiMC7hash {
  function test(uint a, uint b) public pure returns(uint) {
    return MiMC.sponge(a,b);
  }
}
