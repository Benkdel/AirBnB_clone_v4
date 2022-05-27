#!/bin/bash

service=$1
task=$2

port=5000

if [ "$service" == "api" ]; then
    port=5001
    echo "running the API in port $port"
    file="api.v1.app"
else
    if [ -z "$task" ]; then
        task="0"
        echo "Task was not selected"
        echo "Running script with 0-hbnb.py"
    else
        echo "Task $task selected "
    fi
    file="web_dynamic."$task"-hbnb"
    echo "running flask server in port 5000"
fi

HBNB_MYSQL_USER=hbnb_dev HBNB_MYSQL_PWD=hbnb_dev_pwd HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_dev_db HBNB_TYPE_STORAGE=db HBNB_API_PORT=$port python3 -m $file
