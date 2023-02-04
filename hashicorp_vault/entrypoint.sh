#!/bin/sh
vault operator init \
    -address-key-shares=1 \
    -key-threshold=1 \
vault server -config=vault.hcl


vault operator init \
    -key-shares=1 \
    -key-threshold=1 \

#entrypoint da modificare
###################
#comando per inizializzare il vault -> 1 sola chiave, threshold 1, inserisco le credenziali in un JSON
vault operator init -format=json -key-shares 1 -key-threshold 1 > /vault/data/vault_creds.json

vault operator unseal $VAULT_TOKEN
vault login $VAULT_DEV_ROOT_TOKEN_ID
#creo engine di tipo key-value, e metto i segreti di tipo key-value con le put
vault secrets enable -path=kv_inbook  kv
vault kv put kv_inbook/user user=administrator password=prova
vault kv put kv_inbook/keycloak secret=ad5jmaHyrx8amCnPLfQ1VcFvXfZTWGIu

