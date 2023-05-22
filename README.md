# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js --network  name
```

## 需要安装dotenv  
npm install dotenv 
引用require('dotenv').config();

## 安装ethersjs
npm install --save ethers


## 安装 axios

npm install axios


## .env 文件管理私钥 创建再根目录下

MOONBRAN_API=https://rpc.api.moonbase.moonbeam.network

MUMBAI=https://rpc-mumbai.maticvigil.com



# zksync 需新建框架  
## 安装依赖
yarn init -y
yarn add -D typescript ts-node ethers@^5.7.2 zksync-web3 hardhat @matterlabs/hardhat-zksync-solc @matterlabs/hardhat-zksync-deploy

## 验证依赖包
yarn add -D @matterlabs/hardhat-zksync-verify @nomiclabs/hardhat-etherscan

### hardhat 运行
[编译合约](yarn hardhat compile) 
[部署合约](yarn hardhat deploy-zksync)
[验证合约](yarn hardhat verify --network <network> <contract address> --contract <构造参数>)
[运行js文件](yarn hardhat run SCRIPT_FILE)
