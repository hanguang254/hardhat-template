
const {ethers, utils } = require('ethers'); 
// const { Wallet, Provider} = require('zksync-web3');
require('dotenv').config();

const provider =new ethers.providers.JsonRpcProvider('https://zksync2-mainnet.zksync.io');
// const provider = new Provider('https://zksync2-mainnet.zksync.io');

//测试批量私钥   要换成读取文件的方式
const KeyList = [process.env.PROVIDER_KEY,process.env.PROVIDER_KEY2];
// console.log("KeyList:",KeyList);



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
    }
  }catch(err){
    console.log("转账交易失败：",err);
  }
  
}

async function main(){
  for (let i = 0; i < KeyList.length; i++) {
    const wallet = await getWallet(KeyList[i]);
    await transfer(wallet);
  }
    
}
main();


// async function transfer() {
//   const tx = await wallet.transfer({
//     to: wallet.address,
//     token: '0x0000000000000000000000000000000000000000',
//     amount: utils.parseEther('0'),
//   });
//   console.log("交易hash：", tx.hash);

//   const receipt = await tx.wait();
//   if (receipt.status == 1) {
//     console.log("交易成功");
//     console.log("交易gas：",utils.formatEther(receipt.gasUsed.toNumber()));
//   }
// }

// async function doTransactions() {
//   for (let i = 0; i < 2; i++) {
//     await transfer();
//   }
//   console.log("余额",utils.formatEther(await provider.getBalance(wallet.address)))
//   console.log("交易次数：",await provider.getTransactionCount(wallet.address));
// }

// doTransactions();


