const { task } = require("hardhat/config")

task("block-number", "prints the current block number").setAction(
  // hardhat runtime environment
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current block number: ${blockNumber}`)
  }
)

// module.exports = {}
