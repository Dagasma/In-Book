FROM nginx
ADD ./wait-for-it.sh /wait-for-it.sh
ENTRYPOINT ["./wait-for-it.sh", "backend:4000","--","nginx", "-g", "daemon off;"]