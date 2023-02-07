#!/bin/bash
set -m
vault server -config=/vault/config/vault.hcl &
sleep 10 
/setup.bash
fg %1
/wait-for-it.sh db_inbook:3306 -t 0