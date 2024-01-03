FROM node:20.10-alpine

ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo
WORKDIR /app

RUN apk update
RUN apk add yarn

COPY ./backend/package.json ./
RUN yarn install
# RUN yarn add @nestjs/cli

COPY ./backend/* ./