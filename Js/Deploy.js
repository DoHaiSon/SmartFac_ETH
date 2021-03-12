const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.2.114:8545"));

ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":false,"internalType":"string","name":"data","type":"string"}],"name":"added","type":"event"},{"inputs":[],"name":"Fac_name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"add_acc","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"uint256","name":"_time","type":"uint256"},{"internalType":"string","name":"_data","type":"string"}],"name":"new_Reco","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reco","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"string","name":"data","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_rm","type":"address"}],"name":"remove_acc","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"total_account","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_of_reco","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

bytecode = "60806040526000600255600060035534801561001a57600080fd5b5060405162000e3338038062000e338339818101604052602081101561003f57600080fd5b810190808051604051939291908464010000000082111561005f57600080fd5b8382019150602082018581111561007557600080fd5b825186600182028301116401000000008211171561009257600080fd5b8083526020830192505050908051906020019080838360005b838110156100c65780820151818401526020810190506100ab565b50505050905090810190601f1680156100f35780820380516001836020036101000a031916815260200191505b506040525050506000815111610171576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600d8152602001807f4d697373696e67206e616d652e0000000000000000000000000000000000000081525060200191505060405180910390fd5b8060009080519060200190610187929190610237565b506001600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060036000815460010191905081905550506102dc565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027857805160ff19168380011785556102a6565b828001600101855582156102a6579182015b828111156102a557825182559160200191906001019061028a565b5b5090506102b391906102b7565b5090565b6102d991905b808211156102d55760008160009055506001016102bd565b5090565b90565b610b4780620002ec6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806311db785a1161005b57806311db785a146101fe5780636a753ab21461021c578063d375d668146102eb578063f4719ad9146103095761007d565b806303a34b0d1461008257806306c06430146100c657806311d274551461017b575b600080fd5b6100c46004803603602081101561009857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061034d565b005b6100f2600480360360208110156100dc57600080fd5b810190808035906020019092919050505061053b565b6040518084815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561013e578082015181840152602081019050610123565b50505050905090810190601f16801561016b5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b6101836105fd565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101c35780820151818401526020810190506101a8565b50505050905090810190601f1680156101f05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61020661069f565b6040518082815260200191505060405180910390f35b6102e96004803603606081101561023257600080fd5b8101908080359060200190929190803590602001909291908035906020019064010000000081111561026357600080fd5b82018360208201111561027557600080fd5b8035906020019184600183028401116401000000008311171561029757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506106a5565b005b6102f361086c565b6040518082815260200191505060405180910390f35b61034b6004803603602081101561031f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610872565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610410576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f506c6573652075736520696e697420636f6e7472616374204163636f756e742e81525060200191505060405180910390fd5b600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16156104d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f5468697320616464726573732077617320657869737465642e0000000000000081525060200191505060405180910390fd5b6001600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506003600081546001019190508190555050565b6004602052806000526040600020600091509050806000015490806001015490806002018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105f35780601f106105c8576101008083540402835291602001916105f3565b820191906000526020600020905b8154815290600101906020018083116105d657829003601f168201915b5050505050905083565b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156106955780601f1061066a57610100808354040283529160200191610695565b820191906000526020600020905b81548152906001019060200180831161067857829003601f168201915b5050505050905090565b60035481565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610747576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180610af16021913960400191505060405180910390fd5b60026000815460010191905081905550604051806060016040528084815260200183815260200182815250600460006002548152602001908152602001600020600082015181600001556020820151816001015560408201518160020190805190602001906107b7929190610a4b565b509050507f863e218a2405538d4bab1c86f38d87b75a66dfddbadd340de5f5994b7dde25c68383836040518084815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561082b578082015181840152602081019050610810565b50505050905090810190601f1680156108585780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a1505050565b60025481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610935576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f506c6573652075736520696e697420636f6e7472616374204163636f756e742e81525060200191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156109f9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f43616e6e6f742072656d6f766520696e6974204163636f756e742e000000000081525060200191505060405180910390fd5b600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549060ff021916905550565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610a8c57805160ff1916838001178555610aba565b82800160010185558215610aba579182015b82811115610ab9578251825591602001919060010190610a9e565b5b509050610ac79190610acb565b5090565b610aed91905b80821115610ae9576000816000905550600101610ad1565b5090565b9056fe546869732061646472657373206e6f7420696e2074727573746564206c6973742ea2646970667358221220c3cb39fc829f6c6f9b1931f6b860823e6cdf652eb660247d584ffde87431160464736f6c63430006020033"
const account = '0x9c8e8c7847e2268482781ae3ed767d6984d63411'; 
const privKey = 'c2dd6b39ade1ed7abc1a57a6e6e3cb2e2d758f6e7a0f2d711573985f25dced98';

// Unlock the coinbase account to make transactions out of it
console.log("Unlocking coinbase account");
var password = "123456";
try {
  web3.eth.personal.unlockAccount(account, password);
} catch(e) {
  console.log(e);
  return;
}

async function deploy_contract() {
	const myContract = new web3.eth.Contract(ABI)
	let options = {
		arguments: ["SmartFac"],
		data: bytecode
	}
	var gasEstimate = 10e6;
	// var gasEstimate = await myContract.deploy(options).estimateGas();
	// console.log(gas)
	await myContract.deploy(options)
	.send({
		from: account,
		gas: web3.utils.toHex(gasEstimate),
		gasPrice: web3.utils.toHex(web3.utils.toWei('1','gwei'))
	}, function(error, transactionHash){ console.log("Transaction Hash: ",transactionHash) })
	.on('error', function(error){ console.log(error) })
	.on('receipt', function(receipt){
	   console.log(receipt.contractAddress) // contains the new contract address
	})
    process.exit()
}

deploy_contract()
