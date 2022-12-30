#!/usr/bin/env bash
cd /app/backend
npm install --quiet 
/wait-for-it.sh MySQLServer:3306 -- npm run start