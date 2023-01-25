FROM nginx
LABEL MAINTEINER="Dagasma"
ADD ./wait-for-it.sh /wait-for-it.sh
EXPOSE 80 443
ENTRYPOINT ["./wait-for-it.sh", "backend:4000","-t","0","--","nginx", "-g", "daemon off;"]