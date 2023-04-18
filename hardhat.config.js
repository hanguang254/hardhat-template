require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


//npm install dotenv 需要安装dotenv
//引用require('dotenv').config();

//炼金术节点私钥
// process.env.ALCHEMY_API_KEY;
// //钱包私钥
// process.env.GOERLI_PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    },
    moonbean:{
      url:`${process.env.MOONBRAN_API}`,
      accounts:[process.env.GOERLI_PRIVATE_KEY]
    },
    arbitrum:{
      url:`${process.env.ARBitrum_API}`,
      accounts:[process.env.GOERLI_PRIVATE_KEY]
    },
    zksync2:{
      url:`${process.env.ZKSYNC_API}`,
      accounts:[process.env.GOERLI_PRIVATE_KEY]
    }
  },
};
