#!/bin/bash

# I don't know what I typed. Anyway It's work.

output=`docker network inspect bridge`
flag=false
first=true
flagName=false
IP=$*
Name=""
flaginvalid=false

echo "Attack on IP address: $IP"
echo "================================"

if [[ $output != *$IP* ]]; then
	echo "Not Found IP: $IP in list"	
fi

for f in $output
do
  if [[ "$f" = *Name* ]]
  then	
	if [ $first = true ]; then
		first=false
		continue
	fi
	flag=true
	flagName=false
	continue
  fi
  
  if [ $flag = false ]; then
	continue
  fi

  if [ $flagName = false ]; then
  	Name="$f"
	flagName=true
  fi

  if [[ "$f" = *$IP* ]]
  then
	Name=${Name//[^[:alnum:]]/}
	docker container kill $Name
	echo "IP address $IP is down."
	flag=false
	flagName=false
	break
  fi
done

