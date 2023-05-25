const {ethers, utils } = require('ethers'); 
require('dotenv').config();
const fs = require('fs');



const provider =new ethers.providers.JsonRpcProvider('https://zksync2-mainnet.zksync.io');

const ABI = [
  {
    "inputs": [],
    "name": "_mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
const contractAddress = "0x92FcBEEddF2625333506837676b20bD5f99Ce9DB";
// 0x92FcBEEddF2625333506837676b20bD5f99Ce9DB
// 0x4b5e7E51CBeb32505983B69D96a401F31d8F0039

// 0x687b41aa31F0369Bd5d3d680d6b36ff420Ffe654
// abi= [
//   {
//     "inputs": [],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "name": "contracts",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "numContracts",
//         "type": "uint256"
//       }
//     ],
//     "name": "createZksync",
//     "outputs": [],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "_addr",
//         "type": "address"
//       }
//     ],
//     "name": "getContract",
//     "outputs": [
//       {
//         "internalType": "address[]",
//         "name": "sub",
//         "type": "address[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "_addr",
//         "type": "address"
//       }
//     ],
//     "name": "getCount",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ]

//批量读取私钥  
function readKeys() {
  return new Promise((resolve, reject) => {
    fs.readFile('./script/key.txt', 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        const array = data.split('\n').map((line) => line.trim()); // 去除每行数据的空格和换行符
        resolve(array);
      }
    });
  });
}

async function getContract(Wallet){
  const contract = new ethers.Contract(contractAddress,ABI,Wallet);
  return contract;
}


async function getWallet(key){
  const wallet = new ethers.Wallet(key,provider);
  const address = wallet.address;
  const shortenedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
  console.log("钱包地址：",shortenedAddress);
  return wallet;
}

async function transfer(Wallet){
  try{
      const tx = await Wallet.sendTransaction({
        to: Wallet.address,
        value: utils.parseEther('0'),
        gasLimit: 1500000,
        gasPrice: ethers.utils.parseUnits('0.25', 'gwei')
      })

      const receipt = await tx.wait();
      if (receipt.status == 1) {
            console.log("转账交易成功");
            console.log("余额",ethers.utils.formatEther(await provider.getBalance(Wallet.address)))
            console.log("交易次数：",await provider.getTransactionCount(Wallet.address));
      }
  }catch(err){
      console.log("转账交易失败：",err);
  }
  
}

async function main(){
  try{
    const KeyList = await readKeys();
    for (let i = 0; i < KeyList.length; i++) {
      const wallet = await getWallet(KeyList[i]);
      const contract = await getContract(wallet);
      const gas = {gasLimit: 1500000,gasPrice: ethers.utils.parseUnits('0.25', 'gwei')}
      const tx = await contract._mint(gas);
      const receipt = await tx.wait();
      if (receipt.status == 1) {
        console.log("合约调用成功");
      }
      await transfer(wallet);
    }
  }catch(err){
    console.log("main函数出错：",err);
  }
  
    
}
// main();


async function Domain(){

  for(let i = 0;i<2;i++){
    await main();
  }
}
Domain();

