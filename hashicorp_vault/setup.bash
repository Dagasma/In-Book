sed -i '/_ID/d' .env
export VAULT_DEV_ROOT_TOKEN_ID="hvs.gSxZ0VYMqpkxbFLxqLqCGO7U"
export VAULT_TOKEN_CUSTOM="ZXub76kXmW/FId+Rxss+0iL54q8RyiuZ5xlk5hAbnu0="
vault operator unseal $VAULT_TOKEN_CUSTOM
vault login $VAULT_DEV_ROOT_TOKEN_ID
vault policy write inbook_policy - << EOF
path "kv_inbook/user" {
    capabilities = ["read"]
  }
  
path "kv_inbook/keycloak" {
capabilities = ["read"]
}
  
EOF
vault auth enable approle
vault write auth/approle/role/my-role \
    secret_id_ttl=10m \
    token_num_uses=10 \
    token_ttl=20m \
    token_max_ttl=30m \
    secret_id_num_uses=40 \
    token_policies=inbook_policy

echo "ROLE_ID =" $(vault read -field=role_id auth/approle/role/my-role/role-id) >> .env
echo "SECRET_ID =" $(vault write -field=secret_id -f  auth/approle/role/my-role/secret-id) >> .env