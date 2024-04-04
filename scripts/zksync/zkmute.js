const { ethers,BigNumber } = require('ethers'); 
const { Provider ,Wallet,Contract} = require('zksync-web3');
const path = require('path');

// const dotenv = require('dotenv');
// // 获取 .env 文件的绝对路径
// const envPath = path.resolve(__dirname, '../.env');
// // 配置 dotenv
// dotenv.config({ path: envPath });

// 读取abi文件
const fs = require('fs');
const { get } = require('http');
const abi = JSON.parse(fs.readFileSync(path.join(__dirname, 'abi', 'zkmute.abi')));
// console.log(abi)
const USDCABI = JSON.parse(fs.readFileSync(path.join(__dirname, 'abi', 'USDC.abi')));


const provider =new Provider('https://zksync2-mainnet.zksync.io');


const muterouter = "0x8B791913eB07C32779a16750e3868aA8495F5964";
const USDC = "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4";
const WETH = "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91";



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




//获取钱包
async function getWallet(key){
    const wallet = new Wallet(key).connect(provider);
    console.log("address:", wallet.address);
    return wallet;
}
//获取合约对象
async function getContract(Wallet){
    const contract = new Contract(muterouter, abi, Wallet);
    const USDCcontract = new Contract(USDC, USDCABI, Wallet);
    //解构赋值
    return [contract,USDCcontract];
}



//期望得到
async function getAmountsExpanded(amount,tokenIn,tokenOut,wallet=""){
    const [contract,USDCcontract] =await getContract(wallet);
    const amountIn = amount;
    const path = [tokenIn,tokenOut];
    const getamount = await contract.getAmountsOutExpanded(
        amountIn,path
    );
    console.log("Liquidity path：",getamount[0].toString())
    return getamount[0][1];
}



//交换USDC
async function swapExactETHForUSDC(Contract,Wallet){
    try{
        // ethers.utils.parseUnits("0.0005",18) 兑换的金额
        const tokenamount = await getAmountsExpanded(
            ethers.utils.parseUnits("0.0005",18),WETH,USDC,Wallet
        );
        //防止溢出
        const amountOutMin =BigNumber.from(tokenamount).sub(BigNumber.from(Math.floor(tokenamount * 0.05)));
        const path = [WETH,USDC];
        const stable = [false,false];
        const deadline = Date.now() + 1000 * 60 * 3;
        const gas = {
            gasLimit: 2500000,
            gasPrice: ethers.utils.parseUnits("0.25", "gwei"),
            // ethers.utils.parseUnits("0.0005",18) 兑换的金额
            value: ethers.utils.parseUnits("0.001",18)
        };
        
        const tx = await Contract.swapExactETHForTokensSupportingFeeOnTransferTokens(
            amountOutMin,path,Wallet.address,deadline,stable,gas
        );
        const receipt = await tx.wait();
        if (receipt.status == 1){
            console.log("ETH for USDC success");
        }
    }catch(err){
        console.log("交易失败",err);
    }
}
// swapExactETHForUSDC();

async function swapExactUSDCForETH(contract,wallet){
    try{
        if(await allowance(wallet) < ethers.utils.parseUnits("100",6)){
            await approveUSDC(wallet,muterouter,ethers.utils.parseUnits("100",6));
        }
        
        const amountIn =await balanceOf(wallet);
        const tokenamount = await getAmountsExpanded(
            amountIn,USDC,WETH,wallet
        );
        const amountOutMin =BigNumber.from(tokenamount).sub(BigNumber.from(Math.floor(tokenamount * 0.05)));
        const path = [USDC,WETH];
        const stable = [false,false];
        const deadline = Date.now() + 1000 * 60 * 3;
        const gas = {
            gasLimit: 3000000,
            gasPrice: ethers.utils.parseUnits("0.25", "gwei"),
        }
        const tx =await contract.swapExactTokensForETHSupportingFeeOnTransferTokens(
            amountIn,
            amountOutMin,
            path,
            wallet.address,
            deadline,
            stable,
            gas
        )
        const receipt = await tx.wait();
        if (receipt.status == 1){
            console.log("USDC for ETH success");
        }
    }catch(err){
        console.log("交易失败",err);
    }    
}
// swapExactUSDCForETH();

//USDC余额查询
async function balanceOf(wallet){
    const [contract,USDCcontract]= await getContract(wallet);
    const balance = await USDCcontract.balanceOf(wallet.address);
    console.log("balance:",balance.toNumber());
    return balance;
}
// balanceOf();

//USDC额度查询
async function allowance(wallet){
    const [contract,USDCcontract] = await getContract(wallet);
    const allowance = await USDCcontract.allowance(wallet.address,muterouter);
    console.log("allowance:",allowance.toString());
    return allowance;
}
// allowance();

//USDC授权
async function approveUSDC(wallet,spender,value){
    const [contract,USDCcontract] = await getContract(wallet);
    const approve = await USDCcontract.approve(spender,value);
    const receipt = await approve.wait();
    if (receipt.status == 1){
        console.log("授权成功");
    }
}
// approveUSDC(muterouter,ethers.utils.parseUnits("1",6));



async function main(){
    const Keylist = await readKeys();
    for(let i = 0;i < Keylist.length;i++){
        const wallet = await getWallet(Keylist[i]);
        const [contract,USDCcontract] =await getContract(wallet);
        await swapExactETHForUSDC(contract,wallet);
        setTimeout(async () => {
            await swapExactUSDCForETH(contract,wallet);
        },3000)
        
    }
    
}
main();
