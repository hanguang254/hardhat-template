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
    local: {
      url: "http://127.0.0.1:8545", // 这里填写本地节点的 URL
    },
  },
};
