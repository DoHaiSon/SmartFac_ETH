# Create docker container
docker run -it --name miner2 -p 8546:8545 -p 30304:30303 --mount source=data,destination=/data  miner1_snapshot:240720 /bin/bash
# Init a node
geth init --datadir=./node_pow_1 ./dev.json
# Run a geth client
geth --datadir ./ --http --http.addr 192.168.2.100 --http.port 8545 --http.corsdomain "*" --port 30303 --http.api="eth,net,web3,personal" --nat=extip:192.168.2.100 --allow-insecure-unlock --networkid 1  console
# transfer file to local
scp ./output.csv haison98@192.168.0.101:/home/haison98
