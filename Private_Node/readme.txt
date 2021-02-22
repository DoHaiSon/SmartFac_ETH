# Create docker container
docker run -it --name miner2 -p 8546:8545 -p 30304:30303 --mount source=data,destination=/data  miner1_snapshot:240720 /bin/bash
# Init a node
geth init --datadir=./node_pow_2 ./dev.json
# Run a geth client
geth --datadir ./ --rpc --rpcaddr 172.17.0.2 --rpcport "8545" --rpccorsdomain "*" --rpcapi="eth,net,web3,personal" --allow-insecure-unlock --nousb --networkid 1  console
# transfer file to local
scp ./output.csv haison98@192.168.0.101:/home/haison98
