#!/bin/bash

PORTS="4200 3001 3333 4005"

PROCESS=$(lsof -i -P | grep LISTEN | grep :${1} | awk '{print $2}')

echo ${PROCESS}

if [ ${PROCESS} ]; then
    ps -ax | grep '^\s${PROCESS}'

    echo -n "KILL [Y/n]?"
    read ANS
    echo ${ANS}
    if [ ${ANS} ] && [ ${ANS} == 'Y' ] || [ ! ${ANS} ]; then
        echo DIE PROCESS xsx
        kill -9 ${PROCESS}
    fi
fi
