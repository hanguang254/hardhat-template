
const {Web3, eth} = require('web3')

const path = require('path');
const dotenv = require('dotenv');
// 构建 .env 文件的路径，相对于当前文件的根目录
const envPath = path.join(__dirname, '../.env');

// 加载 .env 文件
dotenv.config({ path: envPath });


const web3 = new Web3('https://rpc-1.bevm.io/');


const key = `0x${process.env.ZHU_KEY}`
const wallet =web3.eth.accounts.privateKeyToAccount(key)


async function bevmMint(){
    const gasLimit = 22000;  
    const gasPrice = web3.utils.toWei('1.5', 'gwei');
    const nonce = await web3.eth.getTransactionCount(wallet.address,'pending')
    // console.log(nonce);
    const transaction = {
    from: wallet.address,
    to: wallet.address,
    value: web3.utils.toWei(0, 'ether'),
    gas: gasLimit,
    gasPrice: gasPrice,
    nonce: Number(nonce.toString()),
    data:"" //16进制数据
    };
    // console.log(transaction);
    const {rawTransaction}=await wallet.signTransaction(transaction);
    return rawTransaction;
}
async function run(){
    try{
        let count =0;
        //铸造次数
        const runCount= 1000
        console.log("-----------------------开始铸造-----------------------")
        while(count<runCount){
            const rawTransaction =await bevmMint();
            const receipt = await web3.eth.sendSignedTransaction(rawTransaction);
            count++
            console.log(`[第${count}次MINT]  交易hash:${receipt.blockHash}`);
            // await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }catch(err){
        console.log(err);
    }
}
run()

