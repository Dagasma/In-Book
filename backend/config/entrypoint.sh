#!/usr/bin/env bash
cd /server/
npm install --quiet 
/wait-for-it.sh keycloak:8080 -- npm run start