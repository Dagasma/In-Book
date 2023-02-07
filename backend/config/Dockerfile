FROM node:18-slim
LABEL MAINTEINER="Dagasma"
RUN apt-get update && apt-get install curl -y
ENV NODE_TLS_REJECT_UNAUTHORIZED 0 
ADD ./entrypoint.sh ./wait-for-it.sh /
RUN chmod +x /entrypoint.sh
ADD ./keycloak.json /server/
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 4000