FROM phpmyadmin
LABEL MAINTEINER="Dagasma"
ENV APACHE_PORT 9000
ENV PMA_ABSOLUTE_URI="https://inbook.azurewebsites.net/phpmyadmin/"
ENV PMA_HOST "db_inbook"
ENV PMA_PORT 3306
ENV MYSQL_ROOT_PASSWORD prova
RUN echo "ServerName www.inbook.azurewebsites.net" >> /etc/apache2/apache2.conf
EXPOSE 9000