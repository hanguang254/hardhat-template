require('dotenv').config();
const { ethers } = require('ethers'); 


// 连接以太坊测试网
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_KEY);
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
				"internalType": "address",
				"name": "_serAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "OperationException",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "ParameterException",
		"type": "error"
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
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"name": "acceptTaskEv",
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
				"internalType": "address",
				"name": "_taskerIndex",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_fileIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_deductNumer",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isTrans",
				"type": "bool"
			}
		],
		"name": "deductBounty",
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
				"internalType": "address",
				"name": "_taskerIndex",
				"type": "address"
			}
		],
		"name": "overTimeTrans",
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
				"internalType": "address",
				"name": "_taskerIndex",
				"type": "address"
			}
		],
		"name": "overTimeVf",
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
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "pay",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
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
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "payEv",
		"type": "event"
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
						"internalType": "uint256",
						"name": "sourceLanguage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "goalLanguage",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "preferList",
						"type": "uint256[]"
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
				"name": "_index",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
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
						"internalType": "uint256",
						"name": "sourceLanguage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "goalLanguage",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "preferList",
						"type": "uint256[]"
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
		"name": "postProjectEv",
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
				"internalType": "address",
				"name": "_taskerIndex",
				"type": "address"
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
		"inputs": [],
		"name": "transderToContract",
		"outputs": [],
		"stateMutability": "payable",
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
						"internalType": "uint256",
						"name": "sourceLanguage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "goalLanguage",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "preferList",
						"type": "uint256[]"
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
		"stateMutability": "payable",
		"type": "function"
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
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_transIndex",
				"type": "address"
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
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "getBalanceOfContract",
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
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getTaskInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
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
						"internalType": "uint256",
						"name": "sourceLanguage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "goalLanguage",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "preferList",
						"type": "uint256[]"
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
								"internalType": "uint256",
								"name": "taskIndex",
								"type": "uint256"
							},
							{
								"internalType": "enum LibProject.TaskerState",
								"name": "state",
								"type": "uint8"
							},
							{
								"internalType": "string",
								"name": "file",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "bounty",
								"type": "uint256"
							}
						],
						"internalType": "struct LibProject.ReturnFileInfo[]",
						"name": "fileInfo",
						"type": "tuple[]"
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
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "taskerAddress",
								"type": "address"
							},
							{
								"components": [
									{
										"internalType": "uint256",
										"name": "taskIndex",
										"type": "uint256"
									},
									{
										"internalType": "enum LibProject.TaskerState",
										"name": "state",
										"type": "uint8"
									},
									{
										"internalType": "string",
										"name": "file",
										"type": "string"
									},
									{
										"internalType": "uint256",
										"name": "bounty",
										"type": "uint256"
									}
								],
								"internalType": "struct LibProject.ReturnFileInfo[]",
								"name": "taskerinfo",
								"type": "tuple[]"
							}
						],
						"internalType": "struct LibProject.ReturnTasker[]",
						"name": "translators",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "address",
								"name": "taskerAddress",
								"type": "address"
							},
							{
								"components": [
									{
										"internalType": "uint256",
										"name": "taskIndex",
										"type": "uint256"
									},
									{
										"internalType": "enum LibProject.TaskerState",
										"name": "state",
										"type": "uint8"
									},
									{
										"internalType": "string",
										"name": "file",
										"type": "string"
									},
									{
										"internalType": "uint256",
										"name": "bounty",
										"type": "uint256"
									}
								],
								"internalType": "struct LibProject.ReturnFileInfo[]",
								"name": "taskerinfo",
								"type": "tuple[]"
							}
						],
						"internalType": "struct LibProject.ReturnTasker[]",
						"name": "verifiers",
						"type": "tuple[]"
					},
					{
						"internalType": "uint256",
						"name": "maxT",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "maxV",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberT",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberV",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isTransActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isVerActive",
						"type": "bool"
					},
					{
						"internalType": "enum LibProject.ProjectState",
						"name": "state",
						"type": "uint8"
					}
				],
				"internalType": "struct LibProject.ReturnTask",
				"name": "",
				"type": "tuple"
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
	}
];
// 利用私钥和provider创建wallet对象
const wallet2 = new ethers.Wallet(privateKey, provider);
const Testcontract = '0x42E69D1995beA486409077E4671834C6DAd134E7';

// moombean = "0x84f0a2F69202A49682fB0f8e6A6B7bb163e37A13"
// goerli = "0x42E69D1995beA486409077E4671834C6DAd134E7"

const contractTest = new ethers.Contract(Testcontract, abiERC20, wallet2);

const main = async () => {
  // const enc = enc()
  const address = await wallet2.getAddress();
  const tx = await wallet2.getTransactionCount();
  console.log('地址：', address,'链上交易次数：',tx);
  
  const contratAddress =await contractTest.address;
  console.log('测试合约地址：',contratAddress);

  let overrides = {
	value: ethers.utils.parseEther("1"),
    gasLimit:3000000,
    gasPrice:3000000,
  }
//   发布任务
  const a = await contractTest.postProject(
	[12334,"introduce","need",123434,2,4,[1,2,3],0,100,true,false,1,[[["name",1,1,0,0,0,"path"],1,"info",1,1]]]
	,overrides);
//   console.log(`返回值：${ethers.utils.formatEther(a)}`);
	console.log(`返回值：${JSON.ifytostring(a)}`);

//   //acceptForTranslator
//   const acceptForTranslator = await contractTest.acceptForTranslator(1,[0],overrides);
//   console.log(`返回值：${acceptForTranslator}`);

};
main();
