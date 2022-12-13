require('dotenv').config();


// 连接以太坊测试网
const provider = new ethers.providers.JsonRpcProvider(`${process.env.ALCHEMY_API_KEY}`);
//私钥
privateKey = process.env.GOERLI_PRIVATE_KEY;


const abiERC20 = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_fileIndex',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: '_taskerIndex',
        type: 'uint256',
      },
    ],
    name: 'acceptForTranslator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
      {
        internalType: 'uint256[]',
        name: '_fileIndex',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256',
        name: '_taskerIndex',
        type: 'uint256',
      },
    ],
    name: 'acceptForVerifer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_taskerIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_fileIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_deduct',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_isTrans',
        type: 'bool',
      },
    ],
    name: 'deduct',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
    ],
    name: 'endTransAccept',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
    ],
    name: 'endTransVf',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'releaseTime',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'introduce',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'need',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'sourceLanguage',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'goalLanguage',
            type: 'string',
          },
          {
            internalType: 'string[]',
            name: 'preferList',
            type: 'string[]',
          },
          {
            internalType: 'uint256',
            name: 'translationType',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'workLoad',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isNonDisclosure',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isCustomize',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'bounty',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'name',
                    type: 'string',
                  },
                  {
                    internalType: 'uint256',
                    name: 'size',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'videoLength',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'Page',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'words',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'fileType',
                    type: 'uint256',
                  },
                  {
                    internalType: 'string',
                    name: 'path',
                    type: 'string',
                  },
                ],
                internalType: 'struct LibProject.FileInfo',
                name: 'file',
                type: 'tuple',
              },
              {
                internalType: 'uint256',
                name: 'bounty',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'info',
                type: 'string',
              },
              {
                internalType: 'enum LibProject.FileState',
                name: 'state',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'lastUpload',
                type: 'uint256',
              },
            ],
            internalType: 'struct LibProject.TaskInfo[]',
            name: 'tasks',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'maxT',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxV',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibProject.ProParm',
        name: '_t',
        type: 'tuple',
      },
    ],
    name: 'postProject',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_taskIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_fileIndex',
        type: 'uint256',
      },
    ],
    name: 'sumbitTask',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_serAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'releaseTime',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'introduce',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'need',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'sourceLanguage',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'goalLanguage',
            type: 'string',
          },
          {
            internalType: 'string[]',
            name: 'preferList',
            type: 'string[]',
          },
          {
            internalType: 'uint256',
            name: 'translationType',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'workLoad',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isNonDisclosure',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'isCustomize',
            type: 'bool',
          },
          {
            internalType: 'uint256',
            name: 'bounty',
            type: 'uint256',
          },
          {
            components: [
              {
                components: [
                  {
                    internalType: 'string',
                    name: 'name',
                    type: 'string',
                  },
                  {
                    internalType: 'uint256',
                    name: 'size',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'videoLength',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'Page',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'words',
                    type: 'uint256',
                  },
                  {
                    internalType: 'uint256',
                    name: 'fileType',
                    type: 'uint256',
                  },
                  {
                    internalType: 'string',
                    name: 'path',
                    type: 'string',
                  },
                ],
                internalType: 'struct LibProject.FileInfo',
                name: 'file',
                type: 'tuple',
              },
              {
                internalType: 'uint256',
                name: 'bounty',
                type: 'uint256',
              },
              {
                internalType: 'string',
                name: 'info',
                type: 'string',
              },
              {
                internalType: 'enum LibProject.FileState',
                name: 'state',
                type: 'uint8',
              },
              {
                internalType: 'uint256',
                name: 'lastUpload',
                type: 'uint256',
              },
            ],
            internalType: 'struct LibProject.TaskInfo[]',
            name: 'tasks',
            type: 'tuple[]',
          },
          {
            internalType: 'uint256',
            name: 'maxT',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxV',
            type: 'uint256',
          },
        ],
        internalType: 'struct LibProject.ProParm',
        name: '_t',
        type: 'tuple',
      },
    ],
    name: 'updateProject',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_index',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_taskerIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_fileIndex',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_isPass',
        type: 'bool',
      },
    ],
    name: 'validate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
// 利用私钥和provider创建wallet对象
const wallet2 = new ethers.Wallet(privateKey, provider);


const Testcontract = '0xCb0BaBD3a9371d976AF0322f89658e64141e5d87';
const contractTest = new ethers.Contract(Testcontract, abiERC20, wallet2);

const main = async () => {
  // const enc = enc()
  const address = await wallet2.getAddress();
  const tx = await wallet2.getTransactionCount();
  console.log('地址：', address,'链上交易次数：',tx);
  const contratAddress =await contractTest.address;
  console.log(contratAddress);
  
};
main();
