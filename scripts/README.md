ARB_claim
空投领取脚本

执行语句
npx hardhat run scripts/ARB_claim.js --network arbitrum

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js --network  name
```

需要安装dotenv
私钥管理 
npm install dotenv 
在根目录新建一个.env文件 输入以下数据
polygon_API = 节点地址
ZHU_PRIVATE_KEY = 私钥

引用require('dotenv').config();

安装ethersjs
npm install --save ethers

###执行 
npx hardhat run scripts/bebop.js

需要自己去给bebop的地址授权额度才可以使用
