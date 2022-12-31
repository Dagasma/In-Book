#!/usr/bin/env bash
cd /app/
npm install --quiet 
/wait-for-it.sh db_inbook:3306 -- npm run start