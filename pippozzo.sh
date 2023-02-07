docker stop vault
docker stop webserver
docker rm vault
docker rm webserver
docker rmi $(docker images 'in-book-vault' -a -q)
docker rmi $(docker images 'in-book-webserver' -a -q)