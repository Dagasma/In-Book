#!/usr/bin/env bash
cd /server/
npm install --quiet 
<<<<<<< HEAD
/wait-for-it.sh db_inbook:3306 -t 0 -- npm run start
=======
/wait-for-it.sh keycloak:8080 -t 0
node ./backend/config/script_vault.js
npm run start
>>>>>>> origin/main
