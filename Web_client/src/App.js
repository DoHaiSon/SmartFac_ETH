import React, {Component} from 'react';
import './App.css';
import Web3 from 'web3';
import {ABI, contractaddress, address, pri_key_1, address_2, node1, node2, IV_LENGTH, algorithm} from './config'
// import Tables from "./table"
import crypto from 'crypto';

import CanvasJSReact from './canvasjs.react';
import { type } from 'os';
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// initial values
var dataPoints = []
var updateInterval = 5000;
var mycontract;
var latestblockNumber;
let countID = new Array();
let ID;

class App extends Component {

    componentDidMount() {
        this.loadEthereum();
        this.loadEthereum2()
    };


    async loadEthereum() {

        //const web3 = new Web3(Web3.givenProvider || "http://localhost:8545") // Use Meta Mask
        const web3 = new Web3(node1)
        // window.ethereum.enable()
        window.ethereum.autoRefreshOnNetworkChange = false
        //const network = await web3.eth.net.getNetworkType()
        mycontract = await new web3.eth.Contract(ABI, contractaddress)

        let myevent;
        await mycontract.getPastEvents('added',{
            fromBlock: 0
        }, function(error, events){
            myevent = events
        })
        let len = myevent.length;
        if (len <= 0)
            return;

        latestblockNumber = myevent[len-1].blockNumber;
        let value, time;
        for (var i = 50; i < len; i++) {
            ID = parseInt(this.decrypt(myevent[i].returnValues.id, pri_key_1))
            countID[ID] = true;
            time = parseInt(this.decrypt(myevent[i].returnValues.time, pri_key_1))
            value = parseFloat(this.decrypt(myevent[i].returnValues.data.slice(0, -1), pri_key_1))
            if (time >=0 && value >= 0){
                dataPoints.push({
                    x: new Date(time),
                    y: value
                })
            }
        }
        this.setState({countID: countID.length - 1});
        this.setState({latestblockNumber: latestblockNumber})

        // Update Para
        this.updatePara(web3)
        setInterval(async () => {
            this.updatePara(web3)
        }, 1000)

        // Update chart
        setInterval(async() => {
            this.updateChart(web3, this.state.latestblockNumber)
        }, updateInterval);
    }

    async loadEthereum2(){
        const web3 = new Web3(node2)
        // Update Para2
        // setInterval(async () => {
        //     this.updatePara2(web3)
        // }, 1000)

    }

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            balance: '',
            balance2: '',
            hashrate1: '',
            hashrate2: '',
            totalBlock: '',
            totalBlock2: '',
            countID: '',
            latestblockNumber: '',
        }
    }

    async updatePara(web3){
        var balance =  Math.ceil(await web3.eth.getBalance(address) / 1e6) 
        balance =  web3.utils.fromWei(balance.toString(), 'ether')
        var hashrate1 = await web3.eth.getHashrate()
        var totalBlock = await web3.eth.getBlockNumber()

        this.setState({account: address})
        this.setState({balance: Number(balance).toFixed(4)})
        this.setState({hashrate1: hashrate1})
        this.setState({totalBlock: totalBlock})

    }

    async updatePara2(web3){
        var balance2 =  Math.ceil(await web3.eth.getBalance(address_2) / 1e6) 
        balance2 =  web3.utils.fromWei(balance2.toString(), 'ether')
        var hashrate2 = await web3.eth.getHashrate()
        var totalBlock = await web3.eth.getBlockNumber()

        this.setState({totalBlock2: totalBlock})
        this.setState({balance2: Number(balance2).toFixed(4)})
        this.setState({hashrate2: hashrate2})
    }


    async updateChart(web3, latestblockNumber) {
        let myevent;
        await mycontract.getPastEvents('added',{
            fromBlock: latestblockNumber
        }, function(error, events){
            myevent = events
        });
        let len = myevent.length;
        if(len === 0)
            return;
        this.setState({latestblockNumber: myevent[len-1].blockNumber})
        let value, time;
        for (var i = 0; i < len; i++) {
            ID = parseInt(this.decrypt(myevent[i].returnValues.id, pri_key_1))
            countID[ID] = true;
            time = parseInt(this.decrypt(myevent[i].returnValues.time, pri_key_1))
            value = parseFloat(this.decrypt(myevent[i].returnValues.data.slice(0, -1), pri_key_1))
            if (time >=0 && value >= 0){
                dataPoints.push({
                    x: new Date(time),
                    y: value
                })
            }
        }
        this.setState({countID: countID.length - 1});
        // console.log("Done!")
        this.chart.render();
    }

    decrypt(text, pri_key) {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(pri_key, 'hex'), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    

    render() {
        var options = {
            animationEnabled: true,
            zoomEnabled: true,
            exportEnabled: true,
            theme: "light2",
            title: {
                text: "Power Meter"
            },
            axisX: {
                title: "Chart updates every 5 secs"
            },
            axisY: {
                title: "Total Power (kWh)",
                logarithmic: false,
                includeZero: true
            },
            data: [
                {
                    type: "spline",
                    showInLegend: true,
                    legendText: "kWh = Kilowatt-hour",
                    dataPoints: dataPoints
                }
            ]
        };

        return (
            <div className="container-fluid">
                <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="https://github.com/DoHaiSon/SmartMeterEthereum" target="_blank" rel="noopener noreferrer">Power Meter Ethereum Admin</a>
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                            <small>
                                <a className="nav-link" href="https://rinkeby.etherscan.io/address/0x0fbf463b22a1900cef301e9e22f1f1f34104905b">
                                    <span>Your Acconut: {
                                        this.state.account
                                    }</span>
                                </a>
                            </small>
                        </li>
                    </ul>
                </nav>

                <div className="panel-option">
                    <div className="header-box">
                        <span className="icon icon-menu"></span>
                        <span className="header-title">Ethereum Network</span>
                    </div>
                    <div className="content">
                        <div className="box box-1">
                            <span className="icon icon-box1"></span>
                            <span className="box1 para">{this.state.totalBlock}</span>
                            <span className="box1 unit">Total Blocks</span>
                        </div>
                        <div className="box box-2">
                            <span className="icon icon-box2"></span>
                            <span className="box2 para">{this.state.countID}</span>
                            <span className="box2 unit">Total Meters</span>
                        </div>
                        <div className="box box-3">
                            <span className="icon icon-box3"></span>
                            <span className="box3 para">{this.state.hashrate1}</span>
                            <span className="box3 unit">H/s</span>
                            <span className="box3 Balance">Balance: {this.state.balance} METH</span>
                            <span className="box3 Block">Block No. : {this.state.totalBlock}</span>
                        </div>
                        <div className="box box-4">
                            <span className="icon icon-box4"></span>
                                <span className="box4 para">{this.state.hashrate2}</span>
                            <span className="box4 unit">H/s</span>
                            <span className="box4 Balance">Balance: {this.state.balance2} METH</span>
                            <span className="box4 Block">Block No. : {this.state.totalBlock2}</span>
                        </div>
                    </div> 
                </div>

                {/* <div className="panel-list">
                    <div className="header-box">
                        <span className="icon icon-menu"></span>
                        <span className="header-title">Power Meter Lists</span>
                    </div>
                    <div>
                        <Tables />
                    </div>
                </div> */}

                <div className="panel-power">
                    <div className="header-box">
                        <span className="icon icon-menu"></span>
                        <span className="header-title">Power Meter Information</span>
                    </div>

                    <div className="enterkey">
                        <span>Enter Meter ID Key: </span>
                        <input></input>
                    </div>

                    <div className="Chart">
                        <CanvasJSChart options={options}
                            onRef=
                            {ref => this.chart = ref}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
