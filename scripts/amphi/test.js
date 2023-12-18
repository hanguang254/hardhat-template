
const { ethers} = require('ethers'); 
const path = require('path');
const dotenv = require('dotenv');
const { get } = require('http');

// 构建 .env 文件的路径，相对于当前文件的根目录
const envPath = path.join(__dirname, '../../.env');

// 加载 .env 文件
dotenv.config({ path: envPath });

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
// console.log(provider)

const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);
const Wallet = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY2, provider);



// ERC20Permit 合约地址
const tokenAddress = "0x9c208657D102fb35D95a80eDE406d06d21465F7E";

const tokenContract = new ethers.Contract(tokenAddress, [
  "function nonces(address owner) external view returns (uint256)"
],Wallet);

// 授权数量
const value = ethers.constants.MaxUint256; 
// console.log(value)
// 设置过期时间
const deadline = ethers.constants.MaxUint256;


async function signPermitMessage(wallet) {
  const nonce = await tokenContract.nonces(Wallet.address);
  const domain = {
    name: "TT",
    version: "1",
    chainId: 5, // goerli
    verifyingContract: tokenAddress,
  };

  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };

  const message = {
    owner: wallet.address,
    spender: "0x6364e175508d5E7e4170D73DdE296144a886B646",
    value: value.toString(),
    nonce: nonce.toNumber(),
    deadline: deadline,
  };
  console.log(message)

  const signature = await wallet._signTypedData(domain, types, message);

  return signature;
}

async function generatePermitSignatures() {
  const signature = await signPermitMessage(Wallet);

  const { v, r, s } = ethers.utils.splitSignature(signature);
  console.log(v)
  console.log(r)
  console.log(s)
}
generatePermitSignatures()