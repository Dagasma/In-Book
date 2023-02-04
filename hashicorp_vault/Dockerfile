FROM vault
ENV VAULT_ADDR 'http://127.0.0.1:8200'
ENV VAULT_DEV_ROOT_TOKEN_ID 'hvs.tJW754GzbSjdT3bxu8hWDBZL'
ENV VAULT_TOKEN 'iV9YYmFMexufg4fgmXFZlALSSD7DE++wznVcqaKqjLY='
ADD ./entrypoint.sh /
COPY ./vault.hcl /vault/config/vault.hcl
CMD ["vault","server", "-config=/vault/config/vault.hcl"]