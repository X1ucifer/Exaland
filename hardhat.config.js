require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
   
    mumbai: {
       
      url: "https://polygon-mumbai.g.alchemy.com/v2/tjrz_qE9TxeZmA4Ns_mKDtbsi7JoENA1",
      accounts: [
        '176f3ac81288b08e9836e68875d4fda9ec82c1955ddfd63bd5a8690a6704796d',
      ]
    },
   
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};