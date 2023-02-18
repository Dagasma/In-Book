#!/usr/bin/env bash
cd /server/
npm install --quiet 
/wait-for-it.sh keycloak:8080 -t 0
/wait-for-it.sh vault:8200 -t 0
sleep 1
node ./backend/config/script_vault.js
sleep 10
npm run start