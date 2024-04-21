FROM node:18-slim

WORKDIR /HimaApp

COPY . .

RUN apt update && apt install -y bash

COPY .env.example .env

CMD yarn install && yarn start
