require("@nomicfoundation/hardhat-toolbox")
require("dotenv/config")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

const RINKEBY_RPC_URL =
  process.env.RINKEBY_RPC_URL || "https://eth-rinkeby/example"
const PRIV_KEY = process.env.PRIV_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY || "key"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIV_KEY],
      chainId: 4,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: [],
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
    token: "MATIC",
  },
  solidity: "0.8.9",
}
