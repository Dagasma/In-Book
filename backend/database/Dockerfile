FROM mysql
LABEL MAINTEINER="Dagasma"
ENV MYSQL_DATABASE "INBOOK"
ENV MYSQL_USER "administrator_inbook"
ENV MYSQL_PASSWORD "dagasma10@"
ENV MYSQL_ROOT_PASSWORD "hackme10@"
COPY ./keycloak.sql /docker-entrypoint-initdb.d/1.sql
EXPOSE 3306