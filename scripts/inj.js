const path = require('path');
const dotenv = require('dotenv');
// 构建 .env 文件的路径，相对于当前文件的根目录
const envPath = path.join(__dirname, '../.env');

// 加载 .env 文件
dotenv.config({ path: envPath });

const { getNetworkInfo, Network } =require('@injectivelabs/networks')
const {
  TxClient,
  PrivateKey,
  TxGrpcClient,
  ChainRestAuthApi,
  createTransaction,
  TxRestApi,
  ChainGrpcAuthApi
}=require('@injectivelabs/sdk-ts')
const { MsgSend }=require('@injectivelabs/sdk-ts')
const { BigNumberInBase, DEFAULT_STD_FEE }=require('@injectivelabs/utils');
const { log } = require('console');

const network = getNetworkInfo(Network.Mainnet)
// console.log(network);

const privateKeyHash =process.env.INJ_KEY  //私钥填写
const privateKey = PrivateKey.fromHex(privateKeyHash)
const injectiveAddress = privateKey.toBech32()
const publicKey = privateKey.toPublicKey().toBase64()

console.log("MINT地址",injectiveAddress);

/** MsgSend Example */
async function INJMint(accountDetails)  {

 try{
        /** Prepare the Message */
        const amount = {
            amount: new BigNumberInBase(0.03).toWei().toFixed(),
            denom: 'inj',
        }

        const msg = MsgSend.fromJSON({
            amount,
            srcInjectiveAddress: injectiveAddress,  // 转出地址
            // "inj15jy9vzmyy63ql9y6dvned2kdat2994x5f4ldu4"
            dstInjectiveAddress: injectiveAddress,  //接受地址
        })
        

        /** Prepare the Transaction **/
        const { signBytes, txRaw } = createTransaction({
            message: msg,
            memo: 'ZGF0YToseyJwIjoiaW5qcmMtMjAiLCJvcCI6Im1pbnQiLCJ0aWNrIjoiSU5KUyIsImFtdCI6IjIwMDAifQ==',
            fee: DEFAULT_STD_FEE,
            pubKey: publicKey,
            sequence: parseInt(accountDetails.account.base_account.sequence, 10),
            accountNumber: parseInt(accountDetails.account.base_account.account_number,10),
            chainId: "injective-1",
        })

        console.log(parseInt(accountDetails.account.base_account.sequence, 10),parseInt(accountDetails.account.base_account.account_number,10))

        /** Sign transaction */
        const signature = await privateKey.sign(Buffer.from(signBytes))

        /** Append Signatures */
        txRaw.signatures = [signature]

        /** Calculate hash of the transaction */
        console.log(`Transaction Hash: ${TxClient.hash(txRaw)}`)

        const txService = new TxRestApi("https://inj.nownodes.io/3deaa28b-c43e-4380-95b1-35748a79f8ce")

        /** Simulate transaction */
        const simulationResponse = await txService.simulate(txRaw)
        console.log(
            `Transaction simulation response: ${JSON.stringify(
            simulationResponse.gasInfo,
            )}`,
        )

        /** Broadcast transaction */
        const txResponse = await txService.broadcast(txRaw)

        if (txResponse.code !== 0) {
            console.log(`Transaction failed: ${txResponse.rawLog}`)
        } else {
            console.log(
            `交易哈希 hash: ${JSON.stringify(txResponse.txHash)}`,
            )
        }
    }catch(err){
        console.error("Error in INJMint:", err.message);
        throw err;
    }
}

async function main(){
    try{
        let currentSequence = 0;
        while(currentSequence<100){
            try{
                console.log("-----------------------分界线-----------------------");
                const accountDetails = await new ChainRestAuthApi("https://inj.nownodes.io/3deaa28b-c43e-4380-95b1-35748a79f8ce").fetchAccount(
                    injectiveAddress,
                )
                // console.log(accountDetails);
                await INJMint(accountDetails);
                await new Promise(resolve => setTimeout(resolve, 2000));
                currentSequence++;
                console.log("mint次数：",currentSequence);
            }catch(err){
                console.log(err.message);
                throw err
            }
        }

    }catch(err){
        console.log(err)
    }
}
main()







