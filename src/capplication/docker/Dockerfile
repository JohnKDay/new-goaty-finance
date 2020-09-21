FROM ubuntu:18.04 as target
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    software-properties-common build-essential g++ libulfius-dev \
    libmicrohttpd-dev libpq-dev
ADD main.c /app/
WORKDIR /app
EXPOSE 8080
RUN gcc -o capplication main.c -lulfius -I/usr/include/postgresql -lpq -std=c99
CMD ["/app/capplication"]
