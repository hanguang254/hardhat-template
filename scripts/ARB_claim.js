require('dotenv').config();
const { ethers } = require('ethers'); 


// 连接ARB网络
const provider = new ethers.providers.JsonRpcProvider(process.env.ARBitrum_API);

// 钱包私钥
const Keys = [process.env.ZHU_PRIVATE_KEY, process.env.PRIVATE_KEY_02, process.env.GOERLI_PRIVATE_KEY];
//私钥
privateKey01 = Keys[0];
privateKey02 = Keys[1];
privateKey03 = Keys[2];

// 领取接口参数
const abiERC20 = 

[
    {
        "inputs": [
            {
                "internalType": "contract IERC20VotesUpgradeable",
                "name": "_token",
                "type": "address"
            },
            {
                "internalType": "address payable",
                "name": "_sweepReceiver",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_claimPeriodStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_claimPeriodEnd",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "delegateTo",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "CanClaim",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "HasClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "newSweepReceiver",
                "type": "address"
            }
        ],
        "name": "SweepReceiverSet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Swept",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdrawal",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "delegatee",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "expiry",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "claimAndDelegate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimPeriodEnd",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimPeriodStart",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "claimableTokens",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_recipients",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_claimableAmount",
                "type": "uint256[]"
            }
        ],
        "name": "setRecipients",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_sweepReceiver",
                "type": "address"
            }
        ],
        "name": "setSweepReciever",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sweep",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sweepReceiver",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "internalType": "contract IERC20VotesUpgradeable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalClaimable",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];


// 利用私钥和provider创建wallet对象
const wallet01 = new ethers.Wallet(privateKey01, provider);
const wallet02 = new ethers.Wallet(privateKey02, provider);
const wallet03 = new ethers.Wallet(privateKey03, provider);

//ARB领取合约地址
const ARBcontract = '0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9';

//ARB合约地址


//钱包对象
const walletTest01 = new ethers.Contract(ARBcontract, abiERC20, wallet01);
const walletTest02 = new ethers.Contract(ARBcontract, abiERC20, wallet02);
const walletTest03 = new ethers.Contract(ARBcontract, abiERC20, wallet03);



//claim 方法
async function claim(wallet,b) {
    const address = await wallet.getAddress();
    const tx = await wallet.getTransactionCount();
    const balance = await wallet.getBalance();
    console.log('地址：', address,'链上交易次数：',tx,'余额：',ethers.utils.formatEther(balance));

    b.claim({
        gasPrice: ethers.utils.parseUnits('1', 'gwei'), // 设置 gasPrice
	    gasLimit: 3000000,}
        ).then((tx) => {
        console.log("交易哈希 hash:", tx.hash);
        return provider.waitForTransaction(tx.hash); //等待交易完成
      }).then((receipt) => {
        if (receipt.status == 1) {
          console.log("空投领取成功，查看余额！");
          //交易成功自动归集
          SendArb();
        } else {
          console.log("交易失败,查看区块链浏览器！");
        }
      })
      .catch((err) => {
        console.error("交易错误:", err);
      });
}

// 归集ARB
async function SendArb() {
    const ARBcontract = '0x912CE59144191C1204E64559FE8253a0e49E6548';
    ARBABI= [
        "function balanceOf(address account) public view returns (uint256)",
        "function transfer(address to, uint256 amount) public returns (bool)",
    ];
    const contratARB03= new ethers.Contract(ARBcontract, ARBABI, wallet03);

    const contratARB02 = new ethers.Contract(ARBcontract, ARBABI, wallet02);

    //归集地址
    const address01 = await wallet01.getAddress();
    const contractARB01 = new ethers.Contract(ARBcontract, ARBABI, wallet01);

    //发送者地址
    const address02 = await wallet02.getAddress();
    const address03 = await wallet03.getAddress();
    

    //获取余额
    const balance02 = await contratARB02.balanceOf(address02);
    const balance03 = await contratARB03.balanceOf(address03);
    

    const value1 = ethers.utils.parseEther(`${balance02}`);
    const value2 = ethers.utils.parseEther(`${balance03}`);

    const contratlist = [contratARB02,contratARB03];
    const list = [value1,value2];
    // console.log(list[i])
    
    if(value1+value2 > 0){
        console.log('归集地址：',address01,'归集总数量：',ethers.utils.formatEther(value1+value2));

    //归集
        for(let i=0;i<list.length;i++){

            let contratARB = contratlist[i];
            let value = list[i];
            console.log("发送数量：",value.toNumber());

            //归集逻辑代码
            contratARB.transfer(address01,value,{
                gasPrice: ethers.utils.parseUnits('0.1', 'gwei'), // 设置 gasPrice
                gasLimit: 3000000,}
            ).then((tx) => {
                
                console.log("交易哈希 hash:", tx.hash);
                return provider.waitForTransaction(tx.hash);  //等待交易完成
            }).then((res)=>{
                // console.log('交易详情',res)
                if(res.status == 1){  //判断交易状态
                    console.log('交易成功,gas费使用：', res.gasUsed.toString());

                    //归集后的余额
                    contractARB01.balanceOf(address01).then((res)=>{
                        console.log('归集后主钱包的ARB余额：',ethers.utils.formatEther(res));
                    })
                }
            })
            .catch((err) => {
                console.error("交易错误:", err);
            })

        }

    }else{
        console.log('无可归集的ARB');
    }
    
}





claim(wallet01,walletTest01);
claim(wallet02,walletTest02);
claim(wallet03,walletTest03);

