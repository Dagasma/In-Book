FROM node:18-slim
LABEL MAINTEINER="Dagasma"
ENV NODE_ENV "production"
ADD ./entrypoint.sh ./wait-for-it.sh /
ADD ./keycloak.json /server/
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 4000