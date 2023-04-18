const { ethers } = require("ethers");
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const UniswapV3 = require("@uniswap/sdk");
const { Token, WETH, Fetcher, Route, Trade, TokenAmount, TradeType, Percent,ChainId} = require("@uniswap/sdk");


  
  async function executeUniswapTrade() {
    // Connect to the Ethereum network using your provider of choice
    const provider = new ethers.providers.getDefaultProvider(`${process.env.ARBitrum_API}`);
  
    // Create a new signer with your private key
    const signer = new ethers.Wallet(process.env.ZHU_PRIVATE_KEY, provider);
  
    // Set up the contract instances for Uniswap and the tokens you want to trade
    const UNISWAP_ROUTER_ADDRESS ="0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
    const  uniswapRouterABI = JSON.parse(fs.readFileSync(path.join(__dirname, 'abi', 'univ3.abi')));

    console.log(uniswapRouterABI); 

    const DAI_ADDRESS = "";
    const USDC_ADDRESS = "";

    const uniswapRouter = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, uniswapRouterABI, signer);
    const daiToken = new ethers.Contract(DAI_ADDRESS, 
        ["function approve(address spender, uint256 amount) public returns (bool)"], 
        signer);
    const usdcToken = new ethers.Contract(
        USDC_ADDRESS,
         ["function approve(address spender, uint256 amount) public returns (bool)"], 
         signer);
  
    // Approve the Uniswap router to spend our tokens
    await daiToken.approve(UNISWAP_ROUTER_ADDRESS, ethers.constants.MaxUint256);
    await usdcToken.approve(UNISWAP_ROUTER_ADDRESS, ethers.constants.MaxUint256);
  
    // Set up the trade parameters
    const path = [DAI_ADDRESS, USDC_ADDRESS];
    const amountIn = ethers.utils.parseUnits("1", 18);
    const amountOutMin = 1;
  
    // Execute the trade
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now
    const tx = await uniswapRouter.swapExactTokensForTokens(amountIn, amountOutMin, path, signer.address);
    console.log(`Transaction hash: ${tx.hash}`);
  }
  
  executeUniswapTrade();

 

