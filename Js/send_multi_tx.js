const Web3 = require('../Web_client/node_modules/web3');
const Tran = require('../Web_client/node_modules/ethereumjs-tx').Transaction
const Common = require('../Web_client/node_modules/ethereumjs-common').default

const my_private = Common.forCustomChain('mainnet', {
		name: 'My_private',
		networkId: 1,
		chainId: 2020,
	},
	'petersburg',
);

function between(min, max) {
  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

// Get energy reading from smart meter
// Create an empty modbus client
var energyReadingkWh;
var timestamp;

// Send to Ethereum network

const web3 = new Web3(Web3.currentProvider || 'http://192.168.2.114:8545')

const ABI = [{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"add_acc","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_name","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"string","name":"id","type":"string"},{"indexed":false,"internalType":"string","name":"time","type":"string"},{"indexed":false,"internalType":"string","name":"data","type":"string"}],"name":"added","type":"event"},{"inputs":[{"internalType":"string","name":"_id","type":"string"},{"internalType":"string","name":"_time","type":"string"},{"internalType":"string","name":"_data","type":"string"}],"name":"new_Reco","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rm","type":"address"}],"name":"remove_acc","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"Fac_name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reco","outputs":[{"internalType":"string","name":"id","type":"string"},{"internalType":"string","name":"time","type":"string"},{"internalType":"string","name":"data","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total_of_reco","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const contractaddress = '0x950fc4922AF23f5bb81a7a926Fc06Fb059C01D90'

const myContract = new web3.eth.Contract(ABI, contractaddress)

let account = '0x9c8e8c7847e2268482781ae3ed767d6984d63411';

let dataTx = myContract.methods.new_Reco("123", "345", "567").encodeABI();
async Tx() {
await web3.eth.getTransactionCount('pending', (err, txCount) => {
    const rawTx = {
			to: contractaddress,
			from: account,
			nonce: web3.utils.toHex(txCount),
			data: dataTx,
			gasLimit: web3.utils.toHex(5e5),
			gasPrice: web3.utils.toHex(web3.utils.toWei('1','gwei'))
	};
	const tx1 = new Tran(rawTx, {common: my_private});
	const key = 'c2dd6b39ade1ed7abc1a57a6e6e3cb2e2d758f6e7a0f2d711573985f25dced98';			// Private Key
	tx1.sign(Buffer.from(key, 'hex'));
	const serial = tx1.serialize();
	const raw = '0x' + serial.toString('hex');
	web3.eth.sendSignedTransaction(raw, (err, txHash) => {
		if(err)	{
			node.warn(err);
		}
		node.warn(txHash);
	});
});
}
setInterval(async () => {
    this.Tx();
}, 2000);
