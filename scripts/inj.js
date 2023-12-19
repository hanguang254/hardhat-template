const path = require('path');
const dotenv = require('dotenv');
// 构建 .env 文件的路径，相对于当前文件的根目录
const envPath = path.join(__dirname, '../.env');

// 加载 .env 文件
dotenv.config({ path: envPath });

const { PrivateKey,MsgSend } =require('@injectivelabs/sdk-ts')

const privateKeyFromHex = PrivateKey.fromPrivateKey(process.env.INJ_KEY)

const address = privateKeyFromHex.toAddress() 

console.log(address);








const { SigningStargateClient, GasPrice, coins } = require("@cosmjs/stargate");
const { DirectSecp256k1Wallet } = require('@cosmjs/proto-signing');
const { readFileSync } = require("fs");
const {base64FromBytes} = require("cosmjs-types/helpers");

async function performTransaction(privateKey, numberOfTimes) {
    const denom ="uinj";
    const chain ="inj";
    const rpcEndpoint ="https://sentry.tm.injective.network:443";
    const gasPrice = GasPrice.fromString(`0.025${denom}`);

    const wallet = await DirectSecp256k1Wallet.fromKey(Buffer.from(privateKey, 'hex'),chain);
    console.log(wallet.address);


    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet, { gasPrice: gasPrice });
    const fee = {
        amount: coins(1, denom),
        gas: "120000",
    };
    console.log(`init`);
    let successCount = 0;
    let attemptCount = 0;

    // // const tick = "INJS"
    // // const protocol = process.env.PROTOCOL
    // // const mintAmount = parseInt(process.env.MINT_AMOUNT)

    while (successCount < numberOfTimes) {
        try {
            const [account] = await wallet.getAccounts();
            const amount = coins(1, denom); // 自转1,按需修改
            const memo = `{ "p": "injrc-20","op": "mint","tick": "INJS","amt": "2000"}`; // 这里可能会变化
            console.log(`memo = ${memo}`);

            const result = await client.sendTokens(account.address, account.address, amount, fee, base64FromBytes(Buffer.from(memo, 'utf8')));
            console.log(`${account.address}, 第 ${successCount + 1} 次操作成功: ${`https://www.mintscan.io/${chain}/tx/` + result.transactionHash}`);
            successCount++;
        } catch (error) {
            console.error(`尝试次数 ${attemptCount + 1} 失败: `, error);
            attemptCount++;
            await new Promise(resolve => setTimeout(resolve, 1000)); // 失败后等待一秒
        }
    }

    console.log(`总共尝试次数: ${attemptCount}, 成功次数: ${successCount}`);
}

// performTransaction(process.env.INJ_KEY,2)