FROM mysql
LABEL MAINTEINER="Dagasma"

ENV MYSQL_DATABASE "INBOOK"
ENV MYSQL_USER "administrator"
ENV MYSQL_PASSWORD "prova"
ENV MYSQL_ROOT_PASSWORD "prova"
COPY ./keycloak.sql /docker-entrypoint-initdb.d/1.sql
EXPOSE 3306