require('dotenv').config();
const { ethers} = require('ethers'); 
const axios = require('axios');


//Bebop交易脚本
//此脚本使用需自己前往区块链浏览器授权交易代币额度 
// bebop='0xbeb09beb09e95e6febf0d6eeb1d0d46d1013cc3c' 合约地址

//process.env.polygon_API 节点地址
const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_API);
const signer = new ethers.Wallet(process.env.ZHU_PRIVATE_KEY, provider);
const USDT = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const USDC ="0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const WMATIC = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
const ABI = [
    "function approve(address spender, uint256 amount) external returns (bool)"
]


function tokeninfo(){

    axios.get("https://api.bebop.xyz/polygon/v1/token-info")
    .then((res) => {
        console.log("查询价格成功",res.data);
    }).catch((err) => {
        console.error(err);
    })
}
// tokeninfo();

//获取报价 
async function TokenQuote(buyamount,buyToken,sellToken,sell_ratios=''){

    //获取地址
    let account = new ethers.Wallet(process.env.ZHU_PRIVATE_KEY)
    console.log(`==================>交易地址:${account.address}`)
    const data = axios.get('https://api.bebop.xyz/polygon/v1/quote',{
        params:{
        buy_amounts:buyamount.toString(),
        // sell_amounts:sellamount.toString(),    
        buy_tokens:buyToken.toString(),
        sell_tokens:sellToken.toString(),
        // bull_tokens_ratios:buy_ratios.toString(),   //买入比例总和为1  传入空数组 使用默认值
        sell_tokens_ratios:sell_ratios.toString(),
        taker_address:account.address, //需要修改为自己的地址
        }
    }).then((res) => {
        return res.data;
    })
    // console.log(Id);
    return data;
}
//报价 支持一对一 多对一
// TokenQuote(100,["USDT"],["WMATIC","USDC"],[0.5,0.5]).then((res) => {
//     console.log("获取报价",res);
// })

//一对多  可以使用卖出比例代替数量
// TokenQuote([0.5,0.5],["USDT","DAI"],["WMATIC"]).then((res) => {
//     console.log("获取报价",res);
// })


//变量保存
let signmes ={
    quoteId: "",
    expiry:"",
    maker_addresses:"",
    maker_nonces: "",
    taker_tokens: "",
    maker_tokens:"" ,
    taker_amounts:"",
    maker_amounts:"" ,
    receiver:""

}

// getsigner([0.5,0.5],["USDT","DAI"],["USDC"],[],[])

//获取签名
async function getsigner(amount,buyToken,sellToken,sellratios){
        
        // 获取一对一最新报价
        await TokenQuote(amount,buyToken,sellToken,sellratios).then((res) => {
            // console.log(res);
            console.log("==================>报价Id",res.quoteId);
            
            //保存报价Id
            signmes.quoteId = res.quoteId;  

            //复制签名结构数据
            signmes.expiry = res.toSign.expiry;
            signmes.maker_addresses = res.toSign.maker_addresses;
            signmes.maker_nonces = res.toSign.maker_nonces;
            signmes.maker_tokens = res.toSign.maker_tokens;
            signmes.taker_tokens = res.toSign.taker_tokens;
            signmes.taker_amounts = res.toSign.taker_amounts;
            signmes.maker_amounts = res.toSign.maker_amounts;
            signmes.receiver = res.toSign.receiver;

            // console.log("对象：",signmes);

        });


        //EIP-712签名

    const    domain ={
            name: "BebopAggregationContract",
            version: "1",
            chainId: 137,
            verifyingContract: "0xbeb09beb09e95e6febf0d6eeb1d0d46d1013cc3c" //Bebop合约地址
        }

    const   primaryType = 'AggregateOrder';

    const    types ={

        //_signTypedData 使用这个签名方式删除EIP712Domain即可
            // EIP712Domain: [
            //     { name: "name", type: "string" },
            //     { name: "version", type: "string" },
            //     { name: "chainId", type: "uint256" },
            //     { name: "verifyingContract", type: "address" },
            //   ],
            AggregateOrder: [
            { name: "expiry", type: "uint256" },
            { name: "taker_address", type: "address" },
            { name: "maker_addresses", type: "address[]" },
            { name: "maker_nonces", type: "uint256[]" },
            { name: "taker_tokens", type: "address[][]" },
            { name: "maker_tokens", type: "address[][]" },
            { name: "taker_amounts", type: "uint256[][]" },
            { name: "maker_amounts", type: "uint256[][]" },
            { name: "receiver", type: "address" },
            ],  
        }

    const    value={
            expiry:signmes.expiry,
            taker_address:signmes.receiver,
            maker_addresses:signmes.maker_addresses,
            maker_nonces:signmes.maker_nonces,
            taker_tokens:signmes.taker_tokens,
            maker_tokens:signmes.maker_tokens,
            taker_amounts:signmes.taker_amounts,
            maker_amounts:signmes.maker_amounts,
            receiver:signmes.receiver,
        }
        
    //    console.log("签名value",value);
    //process.env.polygon_API 节点地址
    const provider = new ethers.providers.JsonRpcProvider(process.env.polygon_API);
    // Create a signer object   //process.env.ZHU_PRIVATE_KEY 更换自己的私钥
    const signer = new ethers.Wallet(process.env.ZHU_PRIVATE_KEY, provider);
    

    //生成签名
    signature = await signer._signTypedData(domain, types, value, primaryType);
    // console.log("签名1",signature);
    console.log("==================>签名生成成功！");
    
    return signature;

}

//没有写完  需手动授权
//授权WMATIC USDT USDC 无线额度
function approveToken(){

    const BEBOP = '0xbeb09beb09e95e6febf0d6eeb1d0d46d1013cc3c';

    //授权合约USDT
    const Contract = new ethers.Contract(USDT, ABI, signer);
    Contract.approve(BEBOP,ethers.constants.MaxUint256,{
        gasPrice: ethers.utils.parseUnits('40', 'gwei'),
        gasLimit: 3000000,
    })
    .then((res) => {
        console.log("授权成功",res);
        return res.wait()
    }).catch((err) => {
        console.log("授权失败",err);
    });
    // const txres = await tx.wait(); 
    //授权合约USDC
    // const Contract2 = new ethers.Contract(USDC, ABI, signer);
    // const tx2 = Contract2.approve("0xbeb09beb09e95e6febf0d6eeb1d0d46d1013cc3c", ethers.constants.MaxUint256)
    // // const txres2 = await tx2.wait();
    // //授权合约WMATIC
    // const Contract3 = new ethers.Contract(WMATIC, ABI, signer);
    // const tx3 = Contract3.approve("0xbeb09beb09e95e6febf0d6eeb1d0d46d1013cc3c", ethers.constants.MaxUint256)
    // // const txres3 = await tx3.wait();

}
// approveToken();


// 请求交易 
async function  swap_Token(amount,buyToken,sellToken,sellratios){
        await getsigner(amount,buyToken,sellToken,sellratios).then((res) => {
            // console.log("签名2",res);
            console.log("==================>正在执行交易");
            axios.post("https://api.bebop.xyz/polygon/v1/order",{
                signature:res,
                quote_id:signmes.quoteId,
            }).then((res) => {
                if("txHash" in res.data){
                    console.log("==================>接口请求成功");
                    console.log("==================>哈希值",res.data.txHash);
                    provider.getTransaction(res.data.txHash)
                        .then((tx) => {
                            return tx.wait();
                        }).then(()=>{
                            if(res.data.status = 'Success'){
                                console.log('==================>交易完成')
                            }
                        })
                        .catch((err) => {
                            console.log('出现错误: ', err);
                        });
                }else{
                    console.log("==================>请求失败",res.data);
                }
            }).catch((err) => {
                console.error("请求失败",err);
            })
        });
    
}

// swap_Token(购买数量,买入币种,卖出币种,买入比例,卖出比例)
// swap_Token([10,10],["USDT","USDC"],["WMATIC"],[],[])

// swap_Token(80,['WMATIC'],['USDT','USDC'],[],[0.5,0.5])

for(let i =0 ;i<=4;i++){
    if (i < 4){
        setTimeout(async() => {
            console.log("==================>正在执行循环")
            await swap_Token([11,11],["USDT","USDC"],["WMATIC"],[])
        }, 5000);
        
    }else{
        console.log(i)
        setTimeout(async() => {
            await swap_Token(80,['WMATIC'],['USDT','USDC'],[0.5,0.5])
        },20000)
        
    }
}


    




