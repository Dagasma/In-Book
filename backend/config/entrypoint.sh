#!/usr/bin/env bash
cd /server/
npm install --quiet 
/wait-for-it.sh keycloak:8080 -t 0
node ./backend/config/script_vault.js
npm run start