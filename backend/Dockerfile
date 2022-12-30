FROM node:18-slim
LABEL MAINTEINER="Dagasma"
ENV NODE_ENV "production"
CMD mkdir /app/frontend ;\
    mkdir /app/backend
ADD ./backend /app/backend/
ADD ./frontend /app/frontend/
ADD ./package*.json /app/
ADD ./entrypoint.sh ./wait-for-it.sh /
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 8080