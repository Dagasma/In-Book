#!/usr/bin/env bash
/wait-for-it.sh db_inbook:3306 -t 0 -- /opt/keycloak/bin/kc.sh start --optimized --import-realm --spi-x509cert-lookup-provider=nginx