import React, { Component } from "react";
import Web3 from 'web3';
import {ABI, contractaddress, address} from './config'
import "./table.css"

let student = [];
var tmp= [];
const TokenABI = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialAmount","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_decimalUnits","type":"uint8"},{"name":"_tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
const TokenAddress = "0x625Dd4cfC925B122fc8116005D9a21E0A2e26Cbe"

class Tables extends Component {

  componentDidMount(){
    this.loadEthereum();
  
  }

  async loadEthereum(){
    const web3 = new Web3("http://127.0.01:8546")

    const mycontract = await new web3.eth.Contract(ABI, contractaddress)
    const Tokencontract = await new web3.eth.Contract(TokenABI, TokenAddress)
    let myevent;
    await mycontract.getPastEvents('added',{
        fromBlock: 0
    }, function(error, events){
        myevent = events
    })
    let meteraddress = new Array();
    let len = myevent.length;
    for(var i = 1; i < len; i++) {
        meteraddress.push((await web3.eth.getTransaction(myevent[i].transactionHash)).from)
    }
    meteraddress = [...new Set(meteraddress)];

    tmp = meteraddress;

    for (var i=0; i<meteraddress.length; i++){
      let token;
      await Tokencontract.methods.balanceOf(meteraddress[i]).call({from: address}, function(error, result){
        token = result
      });
      student.push({
        id:i+1,
        address: contractaddress,
        meterid: meteraddress[i],
        token: token
      })
    }
    this.setState({students: student});

    setInterval(async () => {
      this.updateTable(mycontract, web3)
    }, 10000);

  }

  async updateTable(mycontract, web3) {
    let myevent;
    await mycontract.getPastEvents('taskCreated',{
        fromBlock: 0
    }, function(error, events){
        myevent = events
    })
    let meteraddress = new Array();
    let len = myevent.length;
    for(var i = 1; i < len; i++) {
        meteraddress.push((await web3.eth.getTransaction(myevent[i].transactionHash)).from)
    }
    meteraddress = [...new Set(meteraddress)];
    if(meteraddress.toString() == tmp.toString())
      return
    student.length = 0;
    for (var i=0; i<meteraddress.length; i++){
      student.push({
        id:i+1,
        address: contractaddress,
        meterid: meteraddress[i],
        token: "0"
      })
    }
    this.setState({students: student});
  }

  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }

  renderTableData() {
    return this.state.students.map((student, index) => {
      const { id, address, meterid, token } = student;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{address}</td>
          <td>{meterid}</td>
          <td>{token}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table>
        <tbody>
          <tr className = "table">
            <td>#</td>
            <td>Contract Address</td>
            <td>Meter ID</td>
            <td>Tokens</td>
          </tr>
          {this.renderTableData()}
        </tbody>
      </table>
    );
  }
}

export default Tables;
