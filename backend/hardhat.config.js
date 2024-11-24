require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */ 
// localhost added so that when the local netowrk is spun up using npm hardhat node, we can see the logs
module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/", 
      chainID: 31337,
    }
  }, 
  solidity: "0.8.27",
};
