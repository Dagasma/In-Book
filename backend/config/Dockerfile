FROM node:18-slim
LABEL MAINTEINER="Dagasma"
RUN apt-get update && apt-get install curl -y
ADD ./entrypoint.sh ./wait-for-it.sh /
RUN chmod +x /entrypoint.sh
ADD ./keycloak.json /server/
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 4000