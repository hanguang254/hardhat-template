
const {ethers, utils } = require('ethers'); 
const { Wallet, Provider} = require('zksync-web3');
require('dotenv').config();

// const provider2 =new ethers.providers.JsonRpcProvider('https://zksync2-mainnet.zksync.io');
const provider = new Provider('https://zksync2-mainnet.zksync.io');
  // Private key of the account to connect
const wallet = new Wallet(process.env.PROVIDER_KEY,provider);

console.log("钱包地址：",wallet.address);



async function transfer() {
  const tx = await wallet.transfer({
    to: wallet.address,
    token: '0x0000000000000000000000000000000000000000',
    amount: utils.parseEther('0'),
  });
  console.log("交易hash：", tx.hash);

  const receipt = await tx.wait();
  if (receipt.status == 1) {
    console.log("交易成功");
    console.log("交易gas：",utils.formatEther(receipt.gasUsed.toNumber()));
  }
}

async function doTransactions() {
  for (let i = 0; i < 1; i++) {
    await transfer();
  }
  console.log("余额",utils.formatEther(await provider.getBalance(wallet.address)))
  console.log("交易次数：",await provider.getTransactionCount(wallet.address));
}

doTransactions();


