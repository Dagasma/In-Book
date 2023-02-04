docker stop vault
docker rm vault
docker rmi $(docker images 'in-book-vault' -a -q)