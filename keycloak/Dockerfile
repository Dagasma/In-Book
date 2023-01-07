FROM quay.io/keycloak/keycloak:latest as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_DB=mysql

# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=keycloak" -alias keycloak -ext "SAN:c=DNS:keycloak,IP:127.0.0.1" -keystore /opt/keycloak/conf/server.keystore
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

ENV KC_DB=mysql
ENV KC_DB_URL=jdbc:mysql://db_inbook:3306/KEYCLOAK
ENV KC_DB_USERNAME=administrator
ENV KC_DB_PASSWORD=prova
ENV KC_HOSTNAME_URL=http://keycloak.inbook.local:8080
ENV KC_HTTP_ENABLED=true
ENV KEYCLOAK_ADMIN_PASSWORD=dagasma10@
ENV KEYCLOAK_ADMIN=admin
ADD ./entrypoint.sh ./wait-for-it.sh /
CMD mkdir /opt/keycloak/data/import
ADD ./realm-export.json /opt/keycloak/data/import/
ADD customTheme /opt/keycloak/themes/customTheme
EXPOSE 8080
EXPOSE 8443
ENTRYPOINT ["/entrypoint.sh"]