#!/usr/bin/env bash
/wait-for-it.sh db_inbook:3306 -t 0 
sleep 5
/opt/keycloak/bin/kc.sh start --optimized --import-realm