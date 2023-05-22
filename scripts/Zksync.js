const {ethers, utils } = require('ethers'); 
require('dotenv').config();
const fs = require('fs');


const provider =new ethers.providers.JsonRpcProvider('https://zksync2-mainnet.zksync.io');


//测试读取私钥  
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


async function getWallet(key){
  const wallet = new ethers.Wallet(key,provider);
  console.log("钱包地址：",wallet.address);
  return wallet;
}

async function transfer(Wallet){
  try{
    const tx = await Wallet.sendTransaction({
    to: Wallet.address,
    value: utils.parseEther('0'),
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
  const KeyList = await readKeys();
  for (let i = 0; i < KeyList.length; i++) {
    const wallet = await getWallet(KeyList[i]);
    await transfer(wallet);
  }
    
}
main();


