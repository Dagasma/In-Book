FROM vault
ENV VAULT_ADDR 'http://127.0.0.1:8200'
ENV VAULT_DEV_ROOT_TOKEN_ID: '00000000-0000-0000-0000-000000000000'
ENV VAULT_TOKEN: '00000000-0000-0000-0000-000000000000'
ADD ./entrypoint.sh /
COPY ./vault.hcl /vault/config/vault.hcl
CMD ["vault","server", "-config=/vault/config/vault.hcl"]