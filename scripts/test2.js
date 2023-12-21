
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


async function getRowList(){

    
    const gasLimit = 22000;  
    const gasPrice = web3.utils.toWei('1.5', 'gwei');
    const nonce = await web3.eth.getTransactionCount(wallet.address,'pending')
    console.log(nonce);

    const list =[]
    for(let i=0;i<=10;i++){
        const transaction = {
        from: wallet.address,
        to: wallet.address,
        value: web3.utils.toWei(0, 'ether'),
        gas: gasLimit,
        gasPrice: gasPrice,
        nonce: BigInt(Number(nonce.toString())+i),
        data:""
        };
        // console.log(transaction);
        const {rawTransaction}=await wallet.signTransaction(transaction);
        list.push(rawTransaction);
    }
        // 构造交易对象
    
    return list;
}
// getRowList()
async function run(){
    try{
        for(let i=0;i<=100;i++){
            
            const list = await getRowList();
            console.log(list);
            const tx = list.map(async(rawTransaction)=>{
                return web3.eth.sendSignedTransaction(rawTransaction)
            })
            const transactions = await Promise.all(tx);

            transactions.forEach((res,index)=>{
                console.log(res,index);
            })
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
    }catch(err){
        console.log(err);
    }
}
run()



// key()
// async function key(){

//     for(let i=0;i<12;i++){
//         const wallet = new ethers.Wallet.createRandom();
//         console.log(wallet.address);
//         setTimeout(function(){
//             console.log(wallet.privateKey)
//         },2000)
//     }
// }
