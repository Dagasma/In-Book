FROM node:18-slim
LABEL MAINTEINER="Dagasma"
ENV NODE_ENV "production"
ADD ./entrypoint.sh ./wait-for-it.sh /
ADD ./keycloak.json /app/
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 8080