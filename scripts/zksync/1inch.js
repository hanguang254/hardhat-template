const { ethers } = require('ethers'); 
const { Web3 }= require('web3');
const  axios  = require('axios');
const fs = require('fs');


// 获取 .env 文件的绝对路径
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '../.env');
// 配置 dotenv
dotenv.config({ path: envPath });

const USDCABI = JSON.parse(fs.readFileSync(path.join(__dirname, 'abi', 'USDC.abi')));

const web3 = new Web3('https://zksync2-mainnet.zksync.io');


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
    try{
        const url = "https://api.1inch.io/v5.0/324/approve/transaction";
        const params = {
            tokenAddress:USDC,
            amount:ethers.utils.parseUnits("100", 6),
        }
        const res =await axios.get(url,{params})
        // console.log(res.data)
        return res.data;
    }catch(e){
        console.log(e)
    }    
}

async function allowance(wallet){
    try{
        const url = "https://api.1inch.io/v5.0/324/approve/allowance";

        const params = {
            tokenAddress:USDC,
            walletAddress:wallet.address,
        }
        const headers ={ 
            'Cookie': '__cf_bm=OhilZ4L_3C7JMkGewXTba3j9gNE6_ABUkq87TBsq_Ns-1686371831-0-AUBgV+za5XWyabMM2ZIZ9ShfInjbPUBEF7h2vJtjvmKrIs665dECJ3+t8MkCZBmQmFjOrTDs3AeSLww1cew62bo='
          }
        const res =await axios.get(url,{params,headers})
        // console.log(res.data.allowance)
        return res.data.allowance;

    }catch(e){
        console.log(e)
    }    
}
async function test(){
    const key = ""
    const wallet = await getWallet(key)
    const a = await allowance(wallet)
    // const a = await swapTokensforTokens(USDC,ETH,ethers.utils.parseUnits("100", 6),wallet)
    console.log(a)
}
// test()



//余额查询
async function balanceOf(wallet){
    const USDCContract = new web3.eth.Contract(USDCABI,USDC);
    const USDCbalance = await USDCContract.methods.balanceOf(wallet.address).call();
    return USDCbalance; 
}



async function swapTokensforTokens(tokenIn,tokenOut,amountIn,wallet){
    try{
        const url = "https://api.1inch.io/v5.0/324/swap";

        const params = {
            fromTokenAddress:tokenIn,
            toTokenAddress:tokenOut,
            amount:amountIn,
            fromAddress:wallet.address,
            slippage:0.1,
        }
        // console.log(params)
        const res =await axios.get(url,{params,headers})
        // console.log(res.data.tx)
        return res.data.tx;
    }catch(e){
        console.log(e)
    }    
}
// swapTokensforTokens();

//广播交易
async function broadcastTransaction(rawTransaction){
    try{
        //广播交易 rawTransaction签名data
        const broadcastApiUrl = 'https://tx-gateway.1inch.io/v1.1/324/broadcast';
        const data = {
            rawTransaction:rawTransaction,
        }
        // console.log(data)
        const broadcastRes = await axios.post(broadcastApiUrl,data);
        const tx = broadcastRes.data;
        console.log("tx hash：",tx.transactionHash)
        return tx.transactionHash;
    }catch(e){
        console.log(e)
    }    
}



// ApproveTradeWithRouter()
async function ApprovebuildTransaction(key){
    const signTransaction = await ApproveTradeWithRouter();
    // console.log(signTransaction)
    // const gasLimit = await web3.eth.estimateGas({...signTransaction,from:wallet.address})
    const sendtx = {...signTransaction,gasLimit:1000000}
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


async function getTransactionReceipt(hash){
    let receipt = 0;
    await web3.eth.getTransactionReceipt(hash, function(error, result) {
        
        if(error) {
            console.error(error);
        } else {
            receipt = 1;
        }
        
    });
    return receipt;
}





async function main(){
    try{
        const KeyList = await readKeys();
        for(let i = 0;i<KeyList.length;i++){
            const wallet = await getWallet(KeyList[i]);
            const allowanceValue = await allowance(wallet);
            const balance = await balanceOf(wallet);
            
            console.log("wallet address:",wallet.address)
            console.log("allowanceValue:",allowanceValue.toString())
            console.log("USDT balance:",balance)
            
            //需要申请企业API权限

            // //USDC for ETH
            if(balance > 0){
                if (allowanceValue <= ethers.utils.parseUnits("100", 6)) {
                    const rawTransaction = await ApprovebuildTransaction(KeyList[i]);
                    const hash = await broadcastTransaction(rawTransaction);
                    const res = await getTransactionReceipt(hash)
                    console.log(res === 1 ?"approve success":"approve fail");
                }
                async function swap(){
                    const rawTransaction = await swapbuildTransaction(USDC,ETH,balance,KeyList[i],wallet);
                    const hash = await broadcastTransaction(rawTransaction);
                    const res =  await getTransactionReceipt(hash);
                    console.log(res === 1 ? "USDC for ETH swap success":"USDC for ETH swap fail")
                } 
                await swap();
            }else if(balance == 0){
                // ETH for USDC
                const amountIn  = ethers.utils.parseUnits("0.0005", 18);
                const rawTransaction = await swapbuildTransaction(ETH,USDC,amountIn,KeyList[i],wallet);
                const hash = await broadcastTransaction(rawTransaction);
                const res =  await getTransactionReceipt(hash);
                console.log(res === 1 ? "ETH for USDC swap success":"ETH for USDC swap fail")
            }
            
        }
    }catch(error){
        console.log(error)
    }
        
}
    
main()