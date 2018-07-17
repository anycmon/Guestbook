FROM ubuntu:latest
LABEL MAINTAINER="anycmon@gmail.com"
RUN apt-get update

COPY Guestbook /home
WORKDIR /home

EXPOSE 9090
ENTRYPOINT /home/Guestbook

