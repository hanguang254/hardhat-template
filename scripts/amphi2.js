require('dotenv').config();
const { ethers } = require('ethers'); 
const fs = require('fs');
const { get } = require('http');
const path = require('path');
const abi = JSON.parse(fs.readFileSync(path.join(__dirname, 'abi', 'impl.abi')));

// console.log(abi);

// 连接以测试网
const provider = new ethers.providers.JsonRpcProvider(process.env.MOONBRAN_API);
//私钥
privateKey = process.env.GOERLI_PRIVATE_KEY;



// 利用私钥和provider创建wallet对象
const wallet2 = new ethers.Wallet(privateKey, provider);
const Testcontract = '0x470088B3daee098c40872EC5E9fd5b9f46084333';
const contractTest = new ethers.Contract(Testcontract, abi, wallet2);


//发布任务
const posttask = async () => {
  const address = await wallet2.getAddress();
  const tx = await wallet2.getTransactionCount();
  const balance = await wallet2.getBalance();
  console.log('地址：', address,'链上交易次数：',tx,'余额：',ethers.utils.formatEther(balance));
  
  const contratAddress =await contractTest.address;
  console.log('测试合约地址：',contratAddress);

  let gasverd = {
	value: ethers.utils.parseEther('0.3'), // 设置 value
	gasPrice: ethers.utils.parseUnits('60', 'gwei'), // 设置 gasPrice
	gasLimit: 3000000, // 设置 gasLimit
  }
  

  //只读函数合约拥有者 已校验
  const owner = await contractTest.owner();
  console.log(`owner权限拥有者：${JSON.stringify(owner)}`);


  //参数
  const releaseTime = Date.now(); // 发布时间
  console.log(releaseTime);
  const deadline = Date.now() + 10 * 60 * 1000; // 截止时间（当前时间的10分钟后）

const params2 =  [
	releaseTime,
	"introduce",
	"need",
	deadline,
	2,
	5,
	[7, 8, 9],
	6,
	1000,
	true,
	false,
	0,
	[[["file.txt", 1024, 0, 0, 500, 0, "path"], 1, "info", 0, 1]],
]


//使用contract.postTask函数发布任务，将返回一个Promise对象
contractTest.postTask(params2,gasverd)
  .then((tx) => {
    console.log("Transaction hash:", tx.hash);
    return tx.wait();
  })
  .then((receipt) => {
	if(receipt.status == 1){
		console.log("发布任务成功:", receipt);
	}
    
  })
  .catch((err) => {
    console.error("Error posting task:", err);
  });	
};
// posttask(); //以校验



//查询总任务数量
async function getCount() {
	const taskIndex =await  contractTest.getCount()
	const index = taskIndex.toNumber();
	return index;
	
  }
async function getindex(){
	const index = await getCount();
	console.log('总任务数',index);
}
getindex(); //以校验



 //翻译者接受任务
 async function acceptForTranslator() {
	const index = 14;  //任务索引   
  	console.log(index);
 	const fileindex= [0] //文件索引
	contractTest.acceptForTranslator(index,fileindex,{
		gasPrice: ethers.utils.parseUnits('30', 'gwei'), // 设置 gasPrice
		gasLimit: 3000000, // 设置 gasLimit
	  }).then((tx) =>{
		console.log("Transaction hash:", tx.hash);
		return tx.wait();
	  }).then((receipt) => {
		if(receipt.status == 1){
			console.log("翻译者接受任务成功:", receipt);
		}
	  })
	  .catch((err) => {
		console.error("Error:", err);
	  });

  }
  // acceptForTranslator();   //以校验


  //流标判断
function endTransAccept(index){
      
      contractTest.endTransAccept(index,{
        gasPrice: ethers.utils.parseUnits('10', 'gwei'), // 设置 gasPrice
        gasLimit: 3000000, // 设置 gasLimit
        }).then((tx) =>{
        console.log("Transaction hash:", tx.hash);
        return tx.wait();
      }).then((receipt) => {
        console.log("status:",receipt.status);
        if(receipt.status == 1){
            console.log("流标判断:", receipt);
            // overTimeTrans(index);
        }
        
      })
      .catch((err) => {
        console.error("Error :", err);
      })
  }
  // endTransAccept(14); //以校验


  //翻译超时
function overTimeTrans(index){
      const taskaddress = "0x80909d4FD0EeE126C7F1788DF2745B6a19977E30"
      contractTest.overTimeTrans(index,taskaddress,{
        gasPrice: ethers.utils.parseUnits('10', 'gwei'), // 设置 gasPrice
        gasLimit: 3000000, // 设置 gasLimit
        }).then((tx) =>{
          console.log("Transaction hash:", tx.hash);
          return tx.wait();
        }).then((receipt) => {
          console.log("status:",receipt.status);
          if(receipt.status == 1){
            console.log("翻译超时:", receipt);
          }
        })
        .catch((err) => {
        console.error("Error :", err);
        })
  }
overTimeTrans(17); //以校验



