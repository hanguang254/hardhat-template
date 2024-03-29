import dotenv from 'dotenv';
dotenv.config();
import { Provider ,Wallet} from "zksync-ethers";
import { ethers } from "ethers";
import axios from 'axios';
import fs from 'fs'

const tokenaddress = '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4' //代币地址
const mainaddress = '0x88a68278fe332846bacc78bb6c38310a357bee06' //归集地址


//批量读取私钥
function readKeys() {
    return new Promise((resolve, reject) => {
      fs.readFile('./scripts/zks_key.txt', 'utf8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          const array = data.split('\n').map((line) => line.trim()); // 去除每行数据的空格和换行符
          resolve(array);
        }
      });
    });
}

const walletKeys = [
    //私钥集合
    process.env.ZHU_KEY,
    process.env.KEY_02,
];

//创建钱包
function getWallet(key){
    try{
        const provider = new Provider("https://zksync2-mainnet.zksync.io");
        const wallet = new Wallet(key, provider);
        // console.log(wallet.address);
        return wallet
    }catch(err){
        console.log(err.message);
    }
}

// zks空投索赔方法
function claim_zks(){

}

//检查某代币余额
async function getBalance(contractaddress,address) {
    const url = `https://block-explorer-api.mainnet.zksync.io/api?module=account&action=tokenbalance&contractaddress=${contractaddress}&address=${address}`;
    try {
        const res = await axios.get(url);
        console.log(res.data);  // Assuming you want to log the response data
        const balance = res.data.result
        return balance
    } catch (error) {
        console.error('Error fetching balance:', error.message);
    }
}



async function transferToken(wallet, to_address, balance, intervalId) {
    try {
        const transferHandle = await wallet.transfer({
            to: to_address,
            amount: balance,
            token: tokenaddress,
        });
        console.log(`转账成功`);
        clearInterval(intervalId); // 停止循环
    } catch (err) {
        console.log("错误：", err.message);
    }
}

async function main() {
    try {
        const Keys = await readKeys();
        const wallets = Keys.map(key => {
            const wallet = getWallet(key);
            let intervalId; // 为每个钱包维护一个独立的 intervalId
            return { wallet, intervalId };
        });

        await Promise.all(wallets.map(async ({ wallet, intervalId }) => {
            intervalId = setInterval(async () => {
                const balance = await getBalance(tokenaddress, wallet.address);

                if (balance > 0) {
                    console.log(`检测余额为${balance}，地址: ${wallet.address}`);
                    await transferToken(wallet, mainaddress, balance, intervalId); // 转账到主钱包
                } else {
                    console.log(`代币余额为 ${balance}，地址: ${wallet.address}`);
                }
            }, 1000); // 间隔
        }));

    } catch (err) {
        console.error(err.message);
    }
}

main();