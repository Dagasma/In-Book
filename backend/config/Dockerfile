FROM node:18-slim
LABEL MAINTEINER="Dagasma"
ENV NODE_TLS_REJECT_UNAUTHORIZED 0 
ADD ./entrypoint.sh ./wait-for-it.sh /
ADD ./keycloak.json /server/
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 4000