CREATE USER 'administrator_keycloak' IDENTIFIED BY 'dagasma11@';
CREATE DATABASE `KEYCLOAK`;
GRANT ALL PRIVILEGES ON `KEYCLOAK`.* TO 'administrator_keycloak'@'%';

