const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const path = require('path');

const web3 = new Web3(new Web3.providers.HttpProvider("http://172.17.0.2:8545"));

ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"int256","name":"id","type":"int256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"},{"indexed":false,"internalType":"string","name":"data","type":"string"}],"name":"added","type":"event"},{"inputs":[],"name":"Fac_name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"add_acc","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"_id","type":"int256"},{"internalType":"uint256","name":"_time","type":"uint256"},{"internalType":"string","name":"_data","type":"string"}],"name":"new_Reco","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"print_trusted_acc","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reco","outputs":[{"internalType":"int256","name":"id","type":"int256"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"string","name":"data","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"remove_acc","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"total_account","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_of_reco","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"trusted_acc","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
bytecode = '60806040526000600155600060025534801561001a57600080fd5b5060405162000dd038038062000dd08339818101604052602081101561003f57600080fd5b810190808051604051939291908464010000000082111561005f57600080fd5b90830190602082018581111561007457600080fd5b825164010000000081118282018810171561008e57600080fd5b82525081516020918201929091019080838360005b838110156100bb5781810151838201526020016100a3565b50505050905090810190601f1680156100e85780820380516001836020036101000a031916815260200191505b506040525050506000815111610135576040805162461bcd60e51b815260206004820152600d60248201526c26b4b9b9b4b733903730b6b29760991b604482015290519081900360640190fd5b8051610148906000906020840190610178565b505060028054600090815260046020526040902080546001600160a01b0319163317905580546001019055610213565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101b957805160ff19168380011785556101e6565b828001600101855582156101e6579182015b828111156101e65782518255916020019190600101906101cb565b506101f29291506101f6565b5090565b61021091905b808211156101f257600081556001016101fc565b90565b610bad80620002236000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063a1aa026e11610066578063a1aa026e146101fa578063c8abe2be14610233578063d375d668146102e5578063f4719ad9146102ed578063f67c85cc1461031357610093565b806303a34b0d1461009857806306c06430146100c057806311d274551461016357806311db785a146101e0575b600080fd5b6100be600480360360208110156100ae57600080fd5b50356001600160a01b031661036b565b005b6100dd600480360360208110156100d657600080fd5b503561049f565b6040518084815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561012657818101518382015260200161010e565b50505050905090810190601f1680156101535780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b61016b610548565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101a557818101518382015260200161018d565b50505050905090810190601f1680156101d25780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101e86105df565b60408051918252519081900360200190f35b6102176004803603602081101561021057600080fd5b50356105e5565b604080516001600160a01b039092168252519081900360200190f35b6100be6004803603606081101561024957600080fd5b81359160208101359181019060608101604082013564010000000081111561027057600080fd5b82018360208201111561028257600080fd5b803590602001918460018302840111640100000000831117156102a457600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610600945050505050565b6101e8610785565b6100be6004803603602081101561030357600080fd5b50356001600160a01b031661078b565b61031b610978565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561035757818101518382015260200161033f565b505050509050019250505060405180910390f35b600080526004602052600080516020610b37833981519152546001600160a01b031633146103e0576040805162461bcd60e51b815260206004820181905260248201527f506c6573652075736520696e697420636f6e7472616374204163636f756e742e604482015290519081900360640190fd5b60005b600254811015610464576000818152600460205260409020546001600160a01b038381169116141561045c576040805162461bcd60e51b815260206004820152601960248201527f5468697320616464726573732077617320657869737465642e00000000000000604482015290519081900360640190fd5b6001016103e3565b5060028054600090815260046020526040902080546001600160a01b0319166001600160a01b03939093169290921790915580546001019055565b60036020908152600091825260409182902080546001808301546002808501805488519481161561010002600019011691909104601f81018790048702840187019097528683529295909491929183018282801561053e5780601f106105135761010080835404028352916020019161053e565b820191906000526020600020905b81548152906001019060200180831161052157829003601f168201915b5050505050905083565b60008054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105d45780601f106105a9576101008083540402835291602001916105d4565b820191906000526020600020905b8154815290600101906020018083116105b757829003601f168201915b505050505090505b90565b60025481565b6004602052600090815260409020546001600160a01b031681565b6000805b60025481101561063a576000818152600460205260409020546001600160a01b031633141561063257600191505b600101610604565b5060018115151461067c5760405162461bcd60e51b8152600401808060200182810382526021815260200180610b166021913960400191505060405180910390fd5b60018054810180825560408051606081018252878152602080820188815282840188815260009586526003835293909420825181559351948401949094559051805191936106d292600285019290910190610a7d565b509050507fc8f180bceb079957e1541bd0298db0493ae41c075cbc8b9da535f4d330e76e768484846040518084815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561074357818101518382015260200161072b565b50505050905090810190601f1680156107705780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a150505050565b60015481565b600080526004602052600080516020610b37833981519152546001600160a01b03163314610800576040805162461bcd60e51b815260206004820181905260248201527f506c6573652075736520696e697420636f6e7472616374204163636f756e742e604482015290519081900360640190fd5b600080526004602052600080516020610b37833981519152546001600160a01b0382811691161415610879576040805162461bcd60e51b815260206004820152601b60248201527f43616e6e6f742072656d6f766520696e6974204163636f756e742e0000000000604482015290519081900360640190fd5b6000805b600254811015610932576000818152600460205260409020546001600160a01b038481169116141561092a57805b6001600254038210156108f957600180820160009081526004602052604080822054848352912080546001600160a01b0319166001600160a01b0390921691909117905591909101906108ab565b5060028054600019908101600090815260046020526040902080546001600160a01b03191690558154019055600191505b60010161087d565b506001811515146109745760405162461bcd60e51b8152600401808060200182810382526021815260200180610b576021913960400191505060405180910390fd5b5050565b600080526004602052600080516020610b37833981519152546060906001600160a01b031633146109f0576040805162461bcd60e51b815260206004820181905260248201527f506c6573652075736520696e697420636f6e7472616374204163636f756e742e604482015290519081900360640190fd5b6060600254604051908082528060200260200182016040528015610a1e578160200160208202803883390190505b50905060005b600254811015610a775760008181526004602052604090205482516001600160a01b0390911690839083908110610a5757fe5b6001600160a01b0390921660209283029190910190910152600101610a24565b50905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610abe57805160ff1916838001178555610aeb565b82800160010185558215610aeb579182015b82811115610aeb578251825591602001919060010190610ad0565b50610af7929150610afb565b5090565b6105dc91905b80821115610af75760008155600101610b0156fe546869732061646472657373206e6f7420696e2074727573746564206c6973742e17ef568e3e12ab5b9c7254a8d58478811de00f9e6eb34345acd53bf8fd09d3ec546869732061646472657373206e6f74206578697374656420696e206c6973742ea26469706673582212204c006e4b4bfc72e240718fe680dcab2b77ef3861169f6c25ba4d21dae69abd6b64736f6c63430006010033';

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
	var gasEstimate = 4700000;
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