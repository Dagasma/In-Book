FROM vault
ENV VAULT_ADDR 'http://127.0.0.1:8200'
ADD ./entrypoint.sh /
ADD ./wait-for-it.sh /
ADD ./setup.bash /
COPY ./vault.hcl /vault/config/vault.hcl
RUN apk update && apk add --no-cache bash
ENTRYPOINT ["/entrypoint.sh"]