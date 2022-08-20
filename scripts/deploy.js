const { ethers, run, network } = require("hardhat")
require("@nomiclabs/hardhat-etherscan")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorageContract = await SimpleStorageFactory.deploy()
  await simpleStorageContract.deployed()
  console.log(`Deployed contract to ${simpleStorageContract.address}`)

  // were using rinkeby and etherscan api key exists
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    // ensure contract has been added to the blockchain
    console.log("Waiting for block entries...")
    await simpleStorageContract.deployTransaction.wait(6)
    console.log("Verifying contract...")
    await verify(simpleStorageContract.address)
  }

  const currentValue = await simpleStorageContract.retrieve()
  console.log(`Current value is: ${currentValue}`)

  const trxResponse = await simpleStorageContract.store(4)
  await trxResponse.wait(1)
  const updatedValue = await simpleStorageContract.retrieve()
  console.log(`Updated value is: ${updatedValue}`)
}

/**
 * verifies contract after deployment
 */
async function verify(contractAddress, args) {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified"))
      console.log("already verified")
    else console.log(e)
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
