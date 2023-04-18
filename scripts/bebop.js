require('dotenv').config();
const { ethers} = require('ethers'); 
const axios = require('axios');
// const fs = require('fs');
// const { get } = require('http');
// const path = require('path');
// const WETHABI = JSON.parse(fs.readFileSync(path.join(__dirname, 'abi', 'ArbWETH.abi')));
// const USDTABI = JSON.parse(fs.readFileSync(path.join(__dirname, 'abi', 'ArbUSDT.abi')));


//Bebop交易脚本

function tokeninfo(){

    axios.get("https://api.bebop.xyz/arbitrum/v1/token-info")
    .then((res) => {
        console.log("查询价格成功",res.data);
    }).catch((err) => {
        console.error(err);
    })
}
// tokeninfo();

//获取报价 一对一
function TokenQuote(amount,buyToken,sellToken){
    const data = axios.get('https://api.bebop.xyz/polygon/v1/quote',{
        params:{
        buy_tokens:buyToken,
        sell_tokens:sellToken,
        buy_amounts:amount,
        taker_address:"0x6971b57a29764eD7af4A4a1ED7a512Dde9369Ef6", //需要修改为自己的地址
        }
    }).then((res) => {
        return res.data;
    })
    // console.log(Id);
    return data;
}
TokenQuote(100,"USDT","USDC").then((res) => {
    console.log(res);
})

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

//获取签名
async function getsigner(amount,buyToken,sellToken){

        // 获取最新报价
        await TokenQuote(amount,buyToken,sellToken).then((res) => {
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
            verifyingContract: "0xbeb09beb09e95e6febf0d6eeb1d0d46d1013cc3c"
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

    const provider = new ethers.providers.JsonRpcProvider(process.env.polygon_API);
    // Create a signer object 
    const signer = new ethers.Wallet(process.env.ZHU_PRIVATE_KEY, provider);
    
    // 为安全起见暂不写自动授权
    // const Bebop ="0xbeb09beb09e95e6febf0d6eeb1d0d46d1013cc3c";//交互合约地址
    // const WETH= "0x8b194bEae1d3e0788A1a35173978001ACDFba668"; //合约地址
    // const USDT = "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9";

    // const WETHContract = new ethers.Contract(WETH, WETHABI, signer);
    
    // //授权额度
    // const approve = await WETHContract.approve(Bebop,)


    //生成签名
    signature = await signer._signTypedData(domain, types, value, primaryType);

    console.log("==================>签名生成成功！");
    
    return signature;

}

// 请求交易
function  swap_Token(amount,buyToken,sellToken){
        getsigner(amount,buyToken,sellToken).then((res) => {
            // console.log("签名2",res);
            console.log("==================>正在执行交易");
            axios.post("https://api.bebop.xyz/polygon/v1/order",{
                signature:res,
                quote_id:signmes.quoteId,
            }).then((res) => {
                console.log("==================>请求成功",res.data);
                if(res.data.status == "Success"){
                    console.log("==================>等待交易完成，Hash：",res.data.txHash);
                }
            }).catch((err) => {
                console.error("请求失败",err);
            })
        });
    
}


// for (let i = 0; i < 5; i++) {
//     swap_Token(1, "USDT", "WETH");

//     swap_Token(0.00064, "WETH", "USDT");
// }
