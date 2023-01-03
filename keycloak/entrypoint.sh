#!/usr/bin/env bash
/wait-for-it.sh db_inbook:3306 -- /opt/keycloak/bin/kc.sh start --import-realm