const { ethers } = require('ethers'); 
const dotenv = require('dotenv');
const path = require('path');
const { parseCommandLine } = require('typescript');
// 获取 .env 文件的绝对路径
const envPath = path.resolve(__dirname, '../.env');
// 配置 dotenv
dotenv.config({ path: envPath });

// 读取abi文件
const fs = require('fs');
const { get } = require('http');
const abi = JSON.parse(fs.readFileSync(path.join(__dirname, 'abi', 'zkmute.abi')));
// console.log(abi)

const provider =new ethers.providers.JsonRpcProvider('https://zksync2-mainnet.zksync.io');
const wallet = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY2, provider);

const muterouter = "0x8B791913eB07C32779a16750e3868aA8495F5964";

console.log("address", wallet.address);


const contract = new ethers.Contract(muterouter, abi, wallet);
const USDC = "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4";
const WETH = "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91";

async function getAmountOut(amountIn,tokenIn,tokenOut){
    const getamount = await contract.getAmountOut(amountIn,tokenIn,tokenOut);
    const  amountOut = getamount[0].toString();
    //ethers.utils.formatUnits(数量,精度)
    console.log(ethers.utils.formatUnits(amountOut,6));
    return amountOut;
}
getAmountOut(ethers.utils.parseUnits("0.0005",18),WETH,USDC);



async function swapExactETHForUSDC(){
    const amountOutMin =await getAmountOut(ethers.utils.parseUnits("0.0005",18),WETH,USDC);
    // console.log("amountIn",amountIn.toString());
    const path = [WETH,USDC];
    const stable = [false,true];
    const deadline = Date.now() + 1000 * 60 * 3;
    const gas = {
        // gasLimit: 5000000,
        // gasPrice: ethers.utils.parseUnits("0.25", "gwei"),
        value: ethers.utils.parseUnits("0.0005",18)
    };
    
    const tx = await contract.swapExactETHForTokensSupportingFeeOnTransferTokens(
        amountOutMin,path,wallet.address,deadline,stable,gas
    );
    const receipt = await tx.wait();
    console.log("receipt",receipt);
}
swapExactETHForUSDC();