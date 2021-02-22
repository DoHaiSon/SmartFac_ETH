var mining_threads = 8
var flag_pt = true
var count = 10
var tmp = 0
var new_tmp = 1
var time_tmp = 0


function checkWork() {
    var time_now = Date.now(); 
    if (txpool.status.pending > 0 && (time_now - time_tmp) > 5) {
	miner.start(mining_threads);
	while(txpool.status.pending > 0) {
		if(flag_pt == true) {
			console.log("== Pending transactions! Mining...");
			flag_pt=false;
		}
	 }
	flag_pt = true;
    }
		
    else
	{
	if (txpool.status.pending > 1) {
		if (eth.mining) return;
		miner.start(mining_threads);
		while(txpool.status.pending > 0) {
			if(flag_pt == true) {
				console.log("== Pending transactions! Mining...");
				flag_pt=false;
			}
	 	}
		flag_pt = true;

	} else {
		miner.stop();
		tmp = txpool.status.pending;
		if(tmp != new_tmp) {
			tmp = txpool.status.pending;
			console.log("== Not enough 300 transactions: ", tmp);
			new_tmp = tmp;
	    }
	}
    }
    time_tmp = time_now;

}
// eth.filter("latest", function(err, block) { checkWork(); });
// eth.filter("pending", function(err, block) { checkWork(); });

setInterval(function(){checkWork()}, 1);
