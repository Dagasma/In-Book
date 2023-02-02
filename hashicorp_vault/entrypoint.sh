#!/bin/sh
vault operator init \
    -address-key-shares=1 \
    -key-threshold=1 \
vault server -config=vault.hcl


vault operator init \
    -key-shares=1 \
    -key-threshold=1 \

vault operator init -format=json -key-shares 1 -key-threshold 1 > vault_creds.json
