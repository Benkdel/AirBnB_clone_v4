#!/bin/bash

fullpath=$1
newname=$2

if [ $# -lt 2 ]; then
    echo "Usage: cpd.sh <fullpath> <nameforcopy>"
    exit 1
fi

path=''

path=$( echo "$fullpath" | rev | cut -d "/" -f2- | rev)

path="$path""/"

cp "$fullpath" "$path$newname"

