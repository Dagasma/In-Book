#!/usr/bin/env bash
cd /server/
npm install --quiet 
/wait-for-it.sh db_inbook:3306 -t 0 -- npm run start