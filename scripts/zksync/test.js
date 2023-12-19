const {Web3} = require('web3')

// 获取 .env 文件的绝对路径
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '../../.env');
// 配置 dotenv
dotenv.config({ path: envPath });


const web3 = new Web3('https://bsc.blockpi.network/v1/rpc/96f22b245385c1bd2926286ea66b1b7421adf503')


const  key =`0x${process.env.ZHU_PRIVATE_KEY}`
// console.log(key);
const wallet = web3.eth.accounts.privateKeyToAccount(key)


async function getRowList(){

    const gasLimit = 24000;  
    const gasPrice = web3.utils.toWei('5', 'gwei');
    const nonce = await web3.eth.getTransactionCount(wallet.address,'pending')
    console.log(nonce);
    let list = []
    for(let i=0;i<=10;i++){

        // 构造交易对象
        const transaction = {
            from: wallet.address,
            to: wallet.address,
            value: web3.utils.toWei(0, 'ether'),
            gas: gasLimit,
            gasPrice: gasPrice,
            nonce:BigInt(Number(nonce.toString())+i),
            data:"0x646174613a2c7b2270223a226273632d3230222c226f70223a226d696e74222c227469636b223a22736f6669222c22616d74223a2234227d"
        };
        const {rawTransaction}=await wallet.signTransaction(transaction)
        list.push(rawTransaction)
    }
    return list;
}

async function run() {
    try {
        for(let i=0;i<=100;i++){
            const list = await getRowList();
            console.log(list);
            const txpromise=  list.map((rawTransaction)=>{
                return web3.eth.sendSignedTransaction(rawTransaction);
            })
            const transactions = await Promise.all(txpromise);
            transactions.forEach((res,index)=>{
                console.log(res,index)
            })
            new Promise((resolve, reject) => {setTimeout(() => {}, 2000)})
        }
    } catch (err) {
        console.log(err);
    }
}

run();