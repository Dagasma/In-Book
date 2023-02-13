#!/usr/bin/env bash
cd /server/
npm install -g npm
npm install --quiet 
/wait-for-it.sh keycloak:8080 -t 0
/wait-for-it.sh vault:8200 -t 0
sleep 15
node ./backend/config/script_vault.js
sleep 5
npm run start
