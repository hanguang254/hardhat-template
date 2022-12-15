require('dotenv').config();
const { ethers } = require('ethers'); 


// 连接以太坊测试网
const provider = new ethers.providers.JsonRpcProvider(`${process.env.MOONBRAN_API}`);
//私钥
privateKey = process.env.GOERLI_PRIVATE_KEY;


const abiERC20 =[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "_fileIndex",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "_taskerIndex",
				"type": "uint256"
			}
		],
		"name": "acceptForTranslator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "_fileIndex",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "_taskerIndex",
				"type": "uint256"
			}
		],
		"name": "acceptForVerifer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_taskerIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_fileIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_deduct",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isTrans",
				"type": "bool"
			}
		],
		"name": "deduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_serAddress",
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
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "acceptTaskEv",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "acceptTaskEv",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "releaseTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "introduce",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "need",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "sourceLanguage",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "goalLanguage",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "preferList",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "translationType",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "workLoad",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isNonDisclosure",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isCustomize",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "bounty",
						"type": "uint256"
					},
					{
						"components": [
							{
								"components": [
									{
										"internalType": "string",
										"name": "name",
										"type": "string"
									},
									{
										"internalType": "uint256",
										"name": "size",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "videoLength",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "Page",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "words",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "fileType",
										"type": "uint256"
									},
									{
										"internalType": "string",
										"name": "path",
										"type": "string"
									}
								],
								"internalType": "struct LibProject.FileInfo",
								"name": "file",
								"type": "tuple"
							},
							{
								"internalType": "uint256",
								"name": "bounty",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "info",
								"type": "string"
							},
							{
								"internalType": "enum LibProject.FileState",
								"name": "state",
								"type": "uint8"
							},
							{
								"internalType": "uint256",
								"name": "lastUpload",
								"type": "uint256"
							}
						],
						"internalType": "struct LibProject.TaskInfo[]",
						"name": "tasks",
						"type": "tuple[]"
					}
				],
				"indexed": false,
				"internalType": "struct LibProject.ProParm",
				"name": "",
				"type": "tuple"
			}
		],
		"name": "addProjectEv",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "deductBountyEv",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "endTransAccept",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "endTransVf",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_taskerIndex",
				"type": "uint256"
			}
		],
		"name": "overTimeTrans",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_taskerIndex",
				"type": "uint256"
			}
		],
		"name": "overTimeVf",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "releaseTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "introduce",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "need",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "sourceLanguage",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "goalLanguage",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "preferList",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "translationType",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "workLoad",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isNonDisclosure",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isCustomize",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "bounty",
						"type": "uint256"
					},
					{
						"components": [
							{
								"components": [
									{
										"internalType": "string",
										"name": "name",
										"type": "string"
									},
									{
										"internalType": "uint256",
										"name": "size",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "videoLength",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "Page",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "words",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "fileType",
										"type": "uint256"
									},
									{
										"internalType": "string",
										"name": "path",
										"type": "string"
									}
								],
								"internalType": "struct LibProject.FileInfo",
								"name": "file",
								"type": "tuple"
							},
							{
								"internalType": "uint256",
								"name": "bounty",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "info",
								"type": "string"
							},
							{
								"internalType": "enum LibProject.FileState",
								"name": "state",
								"type": "uint8"
							},
							{
								"internalType": "uint256",
								"name": "lastUpload",
								"type": "uint256"
							}
						],
						"internalType": "struct LibProject.TaskInfo[]",
						"name": "tasks",
						"type": "tuple[]"
					}
				],
				"internalType": "struct LibProject.ProParm",
				"name": "_t",
				"type": "tuple"
			}
		],
		"name": "postProject",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_taskerIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_fileIndex",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isPass",
				"type": "bool"
			}
		],
		"name": "receiveProject",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_taskerIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_fileIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_file",
				"type": "string"
			}
		],
		"name": "sumbitTaskTrans",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"name": "updateFileInfoEv",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum LibProject.FileState",
				"name": "",
				"type": "uint8"
			}
		],
		"name": "updateFileStateAndTimeEv",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "releaseTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "introduce",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "need",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "sourceLanguage",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "goalLanguage",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "preferList",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "translationType",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "workLoad",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isNonDisclosure",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isCustomize",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "bounty",
						"type": "uint256"
					},
					{
						"components": [
							{
								"components": [
									{
										"internalType": "string",
										"name": "name",
										"type": "string"
									},
									{
										"internalType": "uint256",
										"name": "size",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "videoLength",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "Page",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "words",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "fileType",
										"type": "uint256"
									},
									{
										"internalType": "string",
										"name": "path",
										"type": "string"
									}
								],
								"internalType": "struct LibProject.FileInfo",
								"name": "file",
								"type": "tuple"
							},
							{
								"internalType": "uint256",
								"name": "bounty",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "info",
								"type": "string"
							},
							{
								"internalType": "enum LibProject.FileState",
								"name": "state",
								"type": "uint8"
							},
							{
								"internalType": "uint256",
								"name": "lastUpload",
								"type": "uint256"
							}
						],
						"internalType": "struct LibProject.TaskInfo[]",
						"name": "tasks",
						"type": "tuple[]"
					}
				],
				"internalType": "struct LibProject.ProParm",
				"name": "_t",
				"type": "tuple"
			}
		],
		"name": "updateProject",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum LibProject.ProjectState",
				"name": "",
				"type": "uint8"
			}
		],
		"name": "updateProSateEv",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "releaseTime",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "introduce",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "need",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "deadline",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "sourceLanguage",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "goalLanguage",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "preferList",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "translationType",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "workLoad",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isNonDisclosure",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isCustomize",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "bounty",
						"type": "uint256"
					},
					{
						"components": [
							{
								"components": [
									{
										"internalType": "string",
										"name": "name",
										"type": "string"
									},
									{
										"internalType": "uint256",
										"name": "size",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "videoLength",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "Page",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "words",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "fileType",
										"type": "uint256"
									},
									{
										"internalType": "string",
										"name": "path",
										"type": "string"
									}
								],
								"internalType": "struct LibProject.FileInfo",
								"name": "file",
								"type": "tuple"
							},
							{
								"internalType": "uint256",
								"name": "bounty",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "info",
								"type": "string"
							},
							{
								"internalType": "enum LibProject.FileState",
								"name": "state",
								"type": "uint8"
							},
							{
								"internalType": "uint256",
								"name": "lastUpload",
								"type": "uint256"
							}
						],
						"internalType": "struct LibProject.TaskInfo[]",
						"name": "tasks",
						"type": "tuple[]"
					}
				],
				"indexed": false,
				"internalType": "struct LibProject.ProParm",
				"name": "",
				"type": "tuple"
			}
		],
		"name": "updateProjectEv",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum LibProject.TaskerState",
				"name": "",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"name": "updateTaskerStateEv",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"name": "uploadAcceptStateEv",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_transIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_vfIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_fileIndex",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isPass",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "_file",
				"type": "string"
			}
		],
		"name": "validate",
		"outputs": [],
		"stateMutability": "nonpayable",
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
	}
];
// 利用私钥和provider创建wallet对象
const wallet2 = new ethers.Wallet(privateKey, provider);
const Testcontract = '0x344744a800aefc18022423e9BB6Da35BCD96a2BA';

// const WETHAddress = '0xD909178CC99d318e4D46e7E66a972955859670E1';

const contractTest = new ethers.Contract(Testcontract, abiERC20, wallet2);

const main = async () => {
  // const enc = enc()
  const address = await wallet2.getAddress();
  const tx = await wallet2.getTransactionCount();
  console.log('地址：', address,'链上交易次数：',tx);
  
  const contratAddress =await contractTest.address;
  console.log('测试合约地址：',contratAddress);

  let overrides = {
    gasLimit:5,
    gasPrice:3000000,
  }
  //发布任务
  const a = await contractTest.postProject([123123,"introduce","need",123123,"sourceLanguage","goalLanguage",["prefer1"],0,100,true,true,1,[[["name",1,1,0,0,0,"path"],1,"info",1,1]]],overrides);
  console.log(`返回值：${a}`);

  //acceptTrans
//   const acceptTrans = await contractTest.acceptTrans(1,1,1,1,overrides);
//   console.log(`总共：${acceptTrans}`);


  // // 扣除赏金
  // const b = await contractTest.deduct(1,2,3,4,true,overrides);
  // console.log('返回值',b)
};
main();
