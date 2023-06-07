const { ethers } = require('ethers'); 
const Web3 = require('web3'); 
const  axios  = require('axios');
const fs = require('fs');

//此脚本留了运行逻辑漏洞需要
//请加关注推特：wbgz888

// 获取 .env 文件的绝对路径
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '../.env');
// 配置 dotenv
dotenv.config({ path: envPath });


const web3 =new Web3('https://zksync2-mainnet.zksync.io');


const ETH = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const USDC = "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4";


//批量读取私钥
function readKeys() {
    return new Promise((resolve, reject) => {
      fs.readFile('private-key.txt', 'utf8', (error, data) => {
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
    const wallet = web3.eth.accounts.privateKeyToAccount(key);
    return wallet;
}


async function ApproveTradeWithRouter(){
    const url = "https://api.1inch.io/v5.0/324/approve/transaction";
    const params = {
        tokenAddress:USDC,
        amount:ethers.utils.parseUnits("100", 6),
    }
    const res =await axios.get(url,{params})
    // console.log(res.data)
    return res.data;
}

async function allowance(wallet){
    const url = "https://api.1inch.io/v5.0/324/approve/allowance";
    const params = {
        tokenAddress:USDC,
        walletAddress:wallet.address,
    }
    const res =await axios.get(url,{params})
    // console.log(res.data.allowance)
    return res.data.allowance;
}
// allowance()

//余额查询
async function balanceOf(wallet){
    const url = "https://zksync2-mainnet-explorer.zksync.io/address/"+wallet.address;
    const res =await axios.get(url)
    const balances = res.data.info.balances;
    const value = Object.entries(balances)
    let USDCbalance = 0;    
    // console.log(value)
    for(let i=0;i<value.length;i++){
        if(value[i][0] == "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4"){
            const c =  value[i][1];
            const balance = c["balance"];
            // console.log(parseInt(balance,16))
            return parseInt(balance,16);
        } else if(value[i][0] == "0x0000000000000000000000000000000000000000"){
            const c =  value[i][1];
            const balance = c["balance"];
            // console.log("ETH:",parseInt(balance,16))
        }else{
            console.log("没有该币种")
        }    
    }
    return USDCbalance; 
}
// balanceOf()

async function swapTokensforTokens(tokenIn,tokenOut,amountIn,wallet){
    const url = "https://api.1inch.io/v5.0/324/swap";
    const params = {
        fromTokenAddress:tokenIn,
        toTokenAddress:tokenOut,
        amount:amountIn,
        fromAddress:wallet.address,
        slippage:0.1,
    }
    // console.log(params)
    const res =await axios.get(url,{params})
    // console.log(res.data.tx)
    return res.data.tx;
}
// swapTokensforTokens();

//广播交易
async function broadcastTransaction(rawTransaction){
    //广播交易 rawTransaction签名data
    const broadcastApiUrl = 'https://tx-gateway.1inch.io/v1.1/324/broadcast';
    const data = {
        rawTransaction:rawTransaction,
    }
    // console.log(data)
    const broadcastRes = await axios.post(broadcastApiUrl,data);
    const tx = broadcastRes.data;
    console.log("tx hash：",tx.transactionHash)
}



// ApproveTradeWithRouter()
async function ApprovebuildTransaction(wallet,key){
    const signTransaction = await ApproveTradeWithRouter();
    // console.log(signTransaction)
    const gasLimit = await web3.eth.estimateGas({...signTransaction,from:wallet.address})
    const sendtx = {...signTransaction,gasLimit}
    // console.log(sendtx)
    const{ rawTransaction } = await web3.eth.accounts.signTransaction(sendtx,key);
    // console.log(rawTransaction)
    return rawTransaction;
}


async function swapbuildTransaction(tokenIn,tokenOut,amountIn,key,wallet){
    
    const signTransaction = await swapTokensforTokens(tokenIn,tokenOut,amountIn,wallet);
    const { rawTransaction } = await web3.eth.accounts.signTransaction(signTransaction,key);
    // console.log(rawTransaction)
    return rawTransaction;
}



async function main(){
    const KeyList = await readKeys();
    for(let i = 0;i<KeyList.length;i++){
        const wallet = await getWallet(KeyList[i]);
        const allowanceValue = await allowance(wallet);
        const balance = await balanceOf(wallet);
        
        console.log("wallet address:",wallet.address)
        console.log("USDC balance:",balance)
        console.log("allowanceValue:",allowanceValue.toString())

        if (allowanceValue <= ethers.utils.parseUnits("100", 6)) {
            const rawTransaction = await ApprovebuildTransaction(wallet,KeyList[i]);
            await broadcastTransaction(rawTransaction);
            console.log("USDC approve success")
        }
        //ETH for USDC
        const amountIn  = ethers.utils.parseUnits("0.0005", 18);
        const rawTransaction = await swapbuildTransaction(ETH,USDC,amountIn,KeyList[i],wallet);
        await broadcastTransaction(rawTransaction);
        console.log("ETH for USDC swap success")
        
        //USDC for ETH
        const newbalance = await balanceOf(wallet);
        console.log("newbalance:",newbalance)
        if(newbalance >= 0){
            const rawTransaction = await swapbuildTransaction(USDC,ETH,newbalance,KeyList[i],wallet);
            await broadcastTransaction(rawTransaction);
            console.log("USDC for ETH swap success")
        }
    }
}    
main()