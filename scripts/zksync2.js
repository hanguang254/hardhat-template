require('dotenv').config();
const { ethers } = require('ethers'); 


// 连接ARB网络
const provider = new ethers.providers.JsonRpcProvider(process.env.zksync2_API);

privateKey = process.env.ZHU_PRIVATE_KEY;


wallet = new ethers.Wallet(privateKey, provider);


async function main() {
    const tx = await wallet.getTransactionCount();
    console.log('交易次数：',tx);
}
main();